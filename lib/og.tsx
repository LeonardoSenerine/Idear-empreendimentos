import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";

/** Capas de link (Open Graph) em 1200 × 630, geradas no build a partir do conteúdo. */

export const TAMANHO_CAPA = { width: 1200, height: 630 };

const raiz = process.cwd();
const arquivo = (rel: string) => readFile(join(raiz, rel));
const dataUri = async (rel: string, tipo: string) => `data:${tipo};base64,${(await arquivo(rel)).toString("base64")}`;

type Capa = {
  fundo: "fundo-home.jpg" | "fundo-casa.jpg";
  chamada: string;
  titulo: string;
  tamanhoTitulo: number;
  linha?: string; // linha em serifa abaixo do título (ex.: números da casa)
  selo?: string; // selo em bronze no canto inferior direito
};

export async function renderCapa({ fundo, chamada, titulo, tamanhoTitulo, linha, selo }: Capa) {
  const [imgFundo, simbolo, lettering, serif, sansMedio, sansForte] = await Promise.all([
    dataUri(`assets/og/${fundo}`, "image/jpeg"),
    dataUri("public/brand/simbolo-clara.png", "image/png"),
    dataUri("public/brand/idear-clara.png", "image/png"),
    arquivo("assets/fonts/CormorantGaramond-Regular.ttf"),
    arquivo("assets/fonts/Manrope-Medium.ttf"),
    arquivo("assets/fonts/Manrope-SemiBold.ttf"),
  ]);

  const png = new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", backgroundColor: "#052640" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgFundo} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, width: 1200, height: 630,
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, rgba(5,38,64,0.97) 0%, rgba(5,38,64,0.9) 34%, rgba(5,38,64,0.45) 62%, rgba(5,38,64,0.08) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, width: 1200, height: 630,
            display: "flex",
            backgroundImage: "linear-gradient(0deg, rgba(5,38,64,0.9) 0%, rgba(5,38,64,0) 55%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "56px 64px",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={simbolo} alt="" width={41} height={56} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lettering} alt="" width={104} height={35} />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  fontFamily: "Manrope",
                  fontWeight: 600,
                  fontSize: 20,
                  letterSpacing: 4,
                  color: "#C4B992",
                  textTransform: "uppercase",
                }}
              >
                {chamada}
              </div>
            </div>
            <div
              style={{
                marginTop: 18,
                maxWidth: 760,
                fontFamily: "Cormorant",
                fontSize: tamanhoTitulo,
                lineHeight: 0.95,
                letterSpacing: -1.5,
                color: "#FAF8F4",
              }}
            >
              {titulo}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 26 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {linha ? (
                  <div style={{ fontFamily: "Cormorant", fontSize: 40, color: "#FAF8F4", marginBottom: 14 }}>{linha}</div>
                ) : null}
                <div style={{ fontFamily: "Manrope", fontWeight: 500, fontSize: 22, color: "rgba(250,248,244,0.72)" }}>
                  idearempreendimentos.com.br
                </div>
              </div>
              {selo ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    backgroundColor: "#635A3A",
                    color: "#FAF8F4",
                    padding: "16px 24px",
                    fontFamily: "Manrope",
                    fontWeight: 600,
                    fontSize: 22,
                  }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: "#C4B992" }} />
                  {selo}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...TAMANHO_CAPA,
      fonts: [
        { name: "Cormorant", data: serif, weight: 400, style: "normal" },
        { name: "Manrope", data: sansMedio, weight: 500, style: "normal" },
        { name: "Manrope", data: sansForte, weight: 600, style: "normal" },
      ],
    },
  );

  // PNG da foto passa de 1 MB; o WhatsApp só mostra a prévia com imagens leves, então entrega JPEG
  const jpeg = await sharp(Buffer.from(await png.arrayBuffer()))
    .jpeg({ quality: 84, progressive: true, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
