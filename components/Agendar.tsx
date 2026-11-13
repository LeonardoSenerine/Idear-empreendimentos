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

type Props = {
  /** âncora da seção */
  id?: string;
  titulo?: string;
  texto?: string;
  /** assunto enviado junto com o pedido */
  assunto?: string;
  imagem?: string;
};

export default function Agendar({
  id = "agendar",
  titulo = "Conheça a casa pessoalmente.",
  texto = "Agende uma visita com a equipe da Idear. Retornamos para confirmar o dia e o horário.",
  assunto,
  imagem = "/images/casa/gourmet-mesa.webp",
}: Props) {
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
        body: JSON.stringify({ ...dados, casa: assunto ?? "Casa à venda" }),
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
      id={id}
      aria-labelledby="agendar-titulo"
      className="relative overflow-hidden bg-navy-deep py-24 text-ivory lg:py-40"
    >
      {/* Foto da área gourmet ao fundo */}
      <div className="absolute inset-x-0 -top-[10%] h-[120%]" data-img-parallax aria-hidden>
        <Image quality={90} src={imagem} alt="" fill sizes="100vw" className="object-cover opacity-45" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/60 to-navy-deep" aria-hidden />

      <div className="container-idear relative grid-12 gap-y-12">
        {/* Chamada e atalhos */}
        <div className="col-span-4 md:col-span-12 lg:col-span-5">
          <h2 id="agendar-titulo" data-split className="display max-w-[12ch] text-[48px] text-ivory md:text-[80px] lg:text-[88px]">
            {titulo}
          </h2>
          <p className="mt-6 max-w-[40ch] text-ivory/80">{texto}</p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noopener"
              data-evento="whatsapp-agendar"
              className="group flex items-center gap-4 bg-bronze-dark p-5 transition-colors duration-500 hover:bg-bronze"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-ivory/10">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <span className="flex-1">
                <span className="block font-semibold">Falar pelo WhatsApp</span>
                <span className="block text-[14px] text-ivory/75">Resposta no mesmo dia útil</span>
              </span>
            </a>
            <a
              href={`tel:+${site.whatsapp}`}
              className="group flex items-center gap-4 border border-ivory/25 p-5 transition-colors duration-500 hover:bg-ivory/10"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-ivory/10" aria-hidden>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                </svg>
              </span>
              <span className="flex-1">
                <span className="block font-semibold">Ligar para a Idear</span>
                <span className="block text-[14px] text-ivory/75">{site.telefoneExibicao}</span>
              </span>
            </a>
          </div>
          <p className="mt-6 text-[14px] text-ivory/60">
            {site.horarioVisitas}.{" "}
            <a href={`mailto:${site.email}`} className="link-line text-ivory/80">
              {site.email}
            </a>
          </p>
        </div>

        {/* Formulário */}
        <div className="col-span-4 bg-ivory p-6 text-navy md:col-span-12 md:p-10 lg:col-span-6 lg:col-start-7 lg:self-end lg:p-12">
          {estado === "enviado" ? (
            <div role="status" className="py-8">
              <p className="font-serif text-[30px] leading-snug md:text-[38px]">
                Obrigado. A equipe da Idear vai entrar em contato para confirmar.
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
            <form onSubmit={enviar} className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
              <p className="font-serif text-[28px] leading-tight sm:col-span-2 md:text-[34px]">Ou deixe seus dados</p>
              <div>
                <label htmlFor={`${id}-nome`} className="block text-[14px] font-semibold">
                  Nome
                </label>
                <input id={`${id}-nome`} name="nome" required autoComplete="name" className="field" />
              </div>
              <div>
                <label htmlFor={`${id}-telefone`} className="block text-[14px] font-semibold">
                  Telefone
                </label>
                <input
                  id={`${id}-telefone`}
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
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-horario`} className="block text-[14px] font-semibold">
                  Melhor horário para retorno
                </label>
                <select id={`${id}-horario`} name="horario" required defaultValue="" className="field">
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

              <label className="flex items-start gap-3 text-[14px] leading-relaxed text-stone sm:col-span-2">
                <input type="checkbox" name="lgpd" required className="mt-1 h-5 w-5 shrink-0 accent-navy" />
                <span>
                  Autorizo a Idear Empreendimentos a usar meus dados para entrar em contato, conforme a política de
                  privacidade.
                </span>
              </label>
              <button type="submit" className="btn-primary w-full sm:col-span-2" disabled={estado === "enviando"}>
                {estado === "enviando" ? "Enviando" : "Quero ser contatado"}
              </button>
              {estado === "erro" ? (
                <p role="alert" className="text-[14px] text-navy sm:col-span-2">
                  Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
