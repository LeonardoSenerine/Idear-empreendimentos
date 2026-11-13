"use client";

import { useState } from "react";
import { empresa } from "@/content/empresa";
import { linkWhatsApp } from "@/lib/site";

export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(0);
  const itens = empresa.faq;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: itens.map((f) => ({
      "@type": "Question",
      name: f.pergunta,
      acceptedAnswer: { "@type": "Answer", text: f.resposta },
    })),
  };

  return (
    <section id="perguntas" aria-labelledby="faq-titulo" className="bg-sand py-20 lg:py-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-idear grid-12 gap-y-10">
        <div className="col-span-4 md:col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-bronze-dark md:text-[13px]">
              Perguntas frequentes
            </p>
            <h2 id="faq-titulo" data-split className="h2 mt-5 max-w-[12ch]">
              O que costumam nos perguntar.
            </h2>
            <p className="mt-6 max-w-[34ch] text-stone">Não encontrou sua dúvida? Fale direto com a equipe da Idear.</p>
            <a
              href={linkWhatsApp("Olá, tenho uma dúvida sobre as casas da Idear.")}
              target="_blank"
              rel="noopener"
              className="btn-outline mt-6"
              data-evento="whatsapp-faq"
            >
              Perguntar pelo WhatsApp
            </a>
          </div>
        </div>

        <ul className="col-span-4 md:col-span-12 lg:col-span-7 lg:col-start-6">
          {itens.map((f, i) => {
            const aberto = aberta === i;
            return (
              <li key={f.pergunta} className="relative">
                <span data-line className="absolute inset-x-0 top-0 h-px bg-navy/20" aria-hidden />
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={aberto}
                    aria-controls={`faq-r-${i}`}
                    onClick={() => setAberta(aberto ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
                  >
                    <span className="font-serif text-[22px] leading-snug md:text-[28px]">{f.pergunta}</span>
                    <span
                      aria-hidden
                      className="relative mt-2 h-4 w-4 shrink-0 md:mt-3"
                    >
                      <span className="absolute left-0 top-1/2 h-px w-4 bg-navy" />
                      <span
                        className={`absolute left-0 top-1/2 h-px w-4 bg-navy transition-transform duration-500 ease-idear ${
                          aberto ? "rotate-0" : "rotate-90"
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-r-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-700 ease-idear ${
                    aberto ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[60ch] pb-7 pr-10 text-stone">{f.resposta}</p>
                  </div>
                </div>
              </li>
            );
          })}
          <li className="h-px bg-navy/20" aria-hidden />
        </ul>
      </div>
    </section>
  );
}
