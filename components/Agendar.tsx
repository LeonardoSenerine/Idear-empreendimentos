"use client";

import Image from "next/image";
import { useState } from "react";
import { casaAtual as casa } from "@/content/casas";
import { linkWhatsApp, site } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

type Estado = "ocioso" | "enviando" | "enviado" | "erro";

function mascararTelefone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export default function Agendar() {
  const [estado, setEstado] = useState<Estado>("ocioso");
  const [telefone, setTelefone] = useState("");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const dados = Object.fromEntries(new FormData(form).entries());
    setEstado("enviando");
    try {
      const r = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, casa: `Casa ${casa.nome}` }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setEstado("enviado");
      window.dispatchEvent(new CustomEvent("idear:formulario-enviado"));
      form.reset();
      setTelefone("");
    } catch {
      setEstado("erro");
    }
  }

  return (
    <section
      id="agendar"
      aria-labelledby="agendar-titulo"
      className="relative overflow-hidden bg-navy-deep py-24 text-ivory lg:py-40"
    >
      {/* Foto da área gourmet ao fundo */}
      <div className="absolute inset-x-0 -top-[10%] h-[120%]" data-img-parallax aria-hidden>
        <Image src="/images/casa/gourmet-mesa.webp" alt="" fill sizes="100vw" className="object-cover opacity-45" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/60 to-navy-deep" aria-hidden />

      <div className="container-idear relative">
        <h2 id="agendar-titulo" data-split className="display max-w-[12ch] text-[52px] text-ivory md:text-[88px] lg:text-[120px]">
          Conheça a casa pessoalmente.
        </h2>
        <p className="mt-8 max-w-[44ch] text-ivory/80 lg:ml-[41.66%]">
          Agende uma visita com a equipe da Idear. Retornamos para confirmar o dia e o horário.
        </p>

        <div className="mt-16 bg-ivory p-6 text-navy md:p-12 lg:mt-24">
          {estado === "enviado" ? (
            <div role="status" className="relative py-10">
              <span data-line className="absolute inset-x-0 top-0 h-px bg-navy" aria-hidden />
              <p className="font-serif text-[30px] leading-snug md:text-[40px]">
                Obrigado. A equipe da Idear vai entrar em contato para confirmar a visita.
              </p>
              <button
                type="button"
                onClick={() => setEstado("ocioso")}
                className="link-line mt-8 text-[15px] font-semibold"
              >
                Enviar outro pedido
              </button>
            </div>
          ) : (
            <form onSubmit={enviar} className="grid gap-x-8 gap-y-8 md:grid-cols-3">
              <div>
                <label htmlFor="nome" className="block text-[14px] font-semibold">
                  Nome
                </label>
                <input id="nome" name="nome" required autoComplete="name" className="field" />
              </div>
              <div>
                <label htmlFor="telefone" className="block text-[14px] font-semibold">
                  Telefone
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  inputMode="tel"
                  required
                  autoComplete="tel-national"
                  placeholder="(11) 90000-0000"
                  minLength={14}
                  value={telefone}
                  onChange={(e) => setTelefone(mascararTelefone(e.target.value))}
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="horario" className="block text-[14px] font-semibold">
                  Melhor horário
                </label>
                <select id="horario" name="horario" required defaultValue="" className="field">
                  <option value="" disabled>
                    Selecione
                  </option>
                  <option>Dias úteis, manhã</option>
                  <option>Dias úteis, tarde</option>
                  <option>Sábado</option>
                </select>
              </div>
              {/* campo isca contra spam */}
              <input type="text" name="empresa" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <label className="flex items-start gap-3 text-[14px] leading-relaxed text-stone md:col-span-2">
                <input type="checkbox" name="lgpd" required className="mt-1 h-4 w-4 shrink-0 accent-navy" />
                <span>
                  Autorizo a Idear Empreendimentos a usar meus dados para entrar em contato sobre esta visita, conforme a
                  política de privacidade.
                </span>
              </label>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <button type="submit" className="btn-primary" disabled={estado === "enviando"}>
                  {estado === "enviando" ? "Enviando" : "Agendar visita"}
                </button>
              </div>
              {estado === "erro" ? (
                <p role="alert" className="text-[14px] text-navy md:col-span-3">
                  Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.
                </p>
              ) : null}
            </form>
          )}
        </div>

        {/* Outras formas de contato, em uma linha */}
        <div className="relative mt-12 flex flex-col gap-4 pt-8 text-[15px] md:flex-row md:items-center md:justify-between">
          <span data-line className="absolute inset-x-0 top-0 h-px bg-ivory/25" aria-hidden />
          <a
            href={linkWhatsApp()}
            target="_blank"
            rel="noopener"
            data-evento="whatsapp-agendar"
            className="link-seta"
          >
            <WhatsAppIcon /> Prefere conversar? Fale pelo WhatsApp
          </a>
          <p className="text-ivory/70">
            {site.horarioVisitas} ·{" "}
            <a href={`tel:+${site.whatsapp}`} className="link-line text-ivory">
              {site.telefoneExibicao}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${site.email}`} className="link-line text-ivory">
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
