import { NextResponse } from "next/server";

type Pedido = { nome?: string; telefone?: string; horario?: string; lgpd?: string; empresa?: string; casa?: string };

const limpar = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let corpo: Pedido;
  try {
    corpo = await req.json();
  } catch {
    return NextResponse.json({ ok: false, erro: "corpo inválido" }, { status: 400 });
  }

  // Campo isca preenchido: provavelmente robô. Responde ok sem enviar.
  if (limpar(corpo.empresa)) return NextResponse.json({ ok: true });

  const nome = limpar(corpo.nome, 120);
  const telefone = limpar(corpo.telefone, 20);
  const horario = limpar(corpo.horario, 60);
  const casa = limpar(corpo.casa, 120);
  if (!nome || telefone.replace(/\D/g, "").length < 10 || !horario || corpo.lgpd !== "on") {
    return NextResponse.json({ ok: false, erro: "dados incompletos" }, { status: 422 });
  }

  const chave = process.env.RESEND_API_KEY;
  const destino = process.env.CONTATO_EMAIL;
  const remetente = process.env.CONTATO_REMETENTE ?? "Site Idear <site@idearempreendimentos.com.br>";

  if (!chave || !destino) {
    // Prévia: sem Resend configurado, só registra no log do servidor.
    console.info("[contato] pedido de visita (Resend não configurado)", { nome, telefone, horario, casa });
    return NextResponse.json({ ok: true, modo: "previa" });
  }

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: remetente,
      to: [destino],
      subject: `Pedido de visita: ${casa || "casa à venda"}`,
      text: `Nome: ${nome}\nTelefone: ${telefone}\nMelhor horário: ${horario}\nCasa: ${casa}\nConsentimento LGPD: sim`,
    }),
  });

  if (!r.ok) {
    console.error("[contato] falha no Resend", r.status, await r.text());
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
