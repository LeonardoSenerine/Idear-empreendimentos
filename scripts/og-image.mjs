// Gera as capas de compartilhamento (Open Graph) a partir das páginas /og-cover.
//
// Uso: com `npm run dev` rodando, execute `npm run og`.
// Saída (1200x630, JPEG):
//   app/opengraph-image.jpg e app/twitter-image.jpg                  ← /og-cover (home)
//   app/casa-a-venda/opengraph-image.jpg e twitter-image.jpg         ← /og-cover/casa
//   app/guia-da-marca/opengraph-image.jpg e twitter-image.jpg        ← /og-cover/guia
//   app/orcamento/opengraph-image.jpg e twitter-image.jpg            ← /og-cover/orcamento
//
// Abre o Microsoft Edge em modo headless via Chrome DevTools Protocol, captura o
// quadro #og em 2x e reduz para 1200x630 com o sharp.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const BASE = process.env.OG_URL ?? "http://localhost:3000";
const CAPAS = [
  { url: `${BASE}/og-cover`, saidas: ["app/opengraph-image.jpg", "app/twitter-image.jpg"] },
  {
    url: `${BASE}/og-cover/casa`,
    saidas: ["app/casa-a-venda/opengraph-image.jpg", "app/casa-a-venda/twitter-image.jpg"],
  },
  {
    url: `${BASE}/og-cover/guia`,
    saidas: ["app/guia-da-marca/opengraph-image.jpg", "app/guia-da-marca/twitter-image.jpg"],
  },
  {
    url: `${BASE}/og-cover/orcamento`,
    saidas: ["app/orcamento/opengraph-image.jpg", "app/orcamento/twitter-image.jpg"],
  },
];
const BROWSERS = [
  process.env.BROWSER_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
].filter(Boolean);

const browserPath = BROWSERS.find((p) => existsSync(p));
if (!browserPath) throw new Error("Edge/Chrome não encontrado. Defina BROWSER_PATH.");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9400 + Math.floor(Math.random() * 400);
const profile = mkdtempSync(join(tmpdir(), "og-"));
const browser = spawn(
  browserPath,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

try {
  let targets = [];
  for (let i = 0; i < 50 && !targets.length; i++) {
    try {
      targets = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).filter((t) => t.type === "page");
    } catch {}
    if (!targets.length) await sleep(200);
  }
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (e) => {
    const msg = JSON.parse(e.data);
    pending.get(msg.id)?.(msg);
  });
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      pending.set(++id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 2, mobile: false });
  // Sem animações de entrada na captura
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await send("Page.enable");

  for (const capa of CAPAS) {
    // Não fotografa página de erro: a arte precisa responder 200. Enquanto o `npm run dev` compila
    // outra rota (ex.: o ícone), ele pode responder 404 por alguns segundos; tenta de novo antes de desistir.
    let status = 0;
    for (let t = 0; t < 8 && status !== 200; t++) {
      status = (await fetch(capa.url)).status;
      if (status !== 200) await sleep(3000);
    }
    if (status !== 200) throw new Error(`${capa.url} respondeu ${status}. Veja o terminal do npm run dev.`);
    await send("Page.navigate", { url: capa.url });
    await sleep(3000);
    // Garante fontes e imagens carregadas e esconde o indicador de dev do Next antes da captura
    await send("Runtime.evaluate", {
      expression: `(async () => {
        document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
        // o indicador pode voltar a ser montado depois de removido: esconde também por CSS
        const s = document.createElement("style");
        s.textContent = "nextjs-portal{display:none!important}";
        document.head.appendChild(s);
        await document.fonts.ready;
        await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
      })()`,
      awaitPromise: true,
    });
    await sleep(600);

    const shot = await send("Page.captureScreenshot", {
      format: "png",
      clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 },
      captureBeyondViewport: false,
    });
    if (!shot.result?.data) throw new Error(`Falha na captura de ${capa.url}: ${JSON.stringify(shot.error ?? shot)}`);

    // Captura em 2x e reduz para 1200x630: texto e bordas mais nítidos
    const png = Buffer.from(shot.result.data, "base64");
    for (const out of capa.saidas) {
      const info = await sharp(png).resize(1200, 630).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
      console.log(`ok: ${out} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
    }
  }
  ws.close();
} finally {
  browser.kill();
  await sleep(1000);
  // O Edge pode demorar a soltar os arquivos do perfil temporário no Windows; a limpeza é opcional
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
  } catch {}
}
