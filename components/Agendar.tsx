"use client";

import Image from "next/image";
import { useState } from "react";
import { casaAtual as casa } from "@/content/casas";
import { linkWhatsApp, site } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

/*
 * Os pedidos de visita vão direto para o WhatsApp da Idear: o formulário só monta a mensagem.
 * Nada é guardado no site, então não há e-mail nem banco de dados envolvido.
 */

type Props = {
  /** âncora da seção */
  id?: string;
  titulo?: string;
  texto?: string;
  /** o que a pessoa quer, completando "gostaria de ..." na mensagem do WhatsApp */
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
  // link do WhatsApp com o pedido montado; fica disponível caso o navegador bloqueie a nova aba
  const [pedido, setPedido] = useState<string | null>(null);

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    const nome = String(dados.get("nome") ?? "").trim();
    const quando = String(dados.get("quando") ?? "");
    const recado = String(dados.get("recado") ?? "").trim();
    const mensagem = [
      `Olá, sou ${nome} e gostaria de ${assunto ?? `agendar uma visita à casa à venda da Idear em ${casa.cidade}`}.`,
      `Melhor dia: ${quando.toLowerCase()}.`,
      recado ? recado : "",
    ]
      .filter(Boolean)
      .join("\n");
    const link = linkWhatsApp(mensagem);
    setPedido(link);
    window.dispatchEvent(new CustomEvent("idear:formulario-enviado"));
    window.open(link, "_blank", "noopener");
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
          <p className="mt-6 text-[14px] text-ivory/60">{site.horarioVisitas}.</p>
        </div>

        {/* Pedido de visita: monta a mensagem e abre o WhatsApp */}
        <div className="col-span-4 bg-ivory p-6 text-navy md:col-span-12 md:p-10 lg:col-span-6 lg:col-start-7 lg:self-end lg:p-12">
          {pedido ? (
            <div role="status" className="py-8">
              <p className="font-serif text-[30px] leading-snug md:text-[38px]">
                Sua mensagem abriu no WhatsApp. É só enviar, e a equipe da Idear confirma o horário.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <a href={pedido} target="_blank" rel="noopener" className="btn-primary">
                  <WhatsAppIcon className="h-5 w-5" />
                  Abrir o WhatsApp de novo
                </a>
                <button type="button" onClick={() => setPedido(null)} className="link-line text-[15px] font-semibold">
                  Fazer outro pedido
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={enviar} className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
              <p className="font-serif text-[28px] leading-tight sm:col-span-2 md:text-[34px]">Ou monte seu pedido de visita</p>
              <div>
                <label htmlFor={`${id}-nome`} className="block text-[14px] font-semibold">
                  Nome
                </label>
                <input id={`${id}-nome`} name="nome" required autoComplete="name" className="field" />
              </div>
              <div>
                <label htmlFor={`${id}-quando`} className="block text-[14px] font-semibold">
                  Melhor dia para você
                </label>
                <select id={`${id}-quando`} name="quando" required defaultValue="" className="field">
                  <option value="" disabled>
                    Selecione
                  </option>
                  <option>Dias úteis, manhã</option>
                  <option>Dias úteis, tarde</option>
                  <option>Sábado</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-recado`} className="block text-[14px] font-semibold">
                  Quer perguntar algo? <span className="font-normal text-stone">(opcional)</span>
                </label>
                <input id={`${id}-recado`} name="recado" className="field" placeholder="Ex.: aceita financiamento?" />
              </div>
              <button type="submit" className="btn-primary w-full sm:col-span-2">
                <WhatsAppIcon className="h-5 w-5" />
                Enviar pelo WhatsApp
              </button>
              <p className="text-[13px] text-stone sm:col-span-2">
                A mensagem abre pronta no WhatsApp da Idear, {site.telefoneExibicao}. Nenhum dado fica guardado no site.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
