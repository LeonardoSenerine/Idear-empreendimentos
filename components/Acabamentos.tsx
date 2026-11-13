"use client";

import Image from "next/image";
import { useState } from "react";
import { casaAtual as casa } from "@/content/casas";

export default function Acabamentos() {
  const itens = casa.acabamentos;
  const [ativo, setAtivo] = useState(0);
  const algumaIlustrativa = itens.some((a) => a.imagem.ilustrativa);

  return (
    <section id="acabamentos" aria-labelledby="acabamentos-titulo" className="section">
      <div className="container-idear">
        <h2 id="acabamentos-titulo" data-split className="h2 max-w-[18ch]">
          Materiais escolhidos para durar.
        </h2>

        <div className="grid-12 mt-14 gap-y-10 lg:mt-20">
          {/* Foto grande que acompanha o item ativo (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-sand" data-reveal-image>
              {itens.map((a, i) =>
                a.imagem.src ? (
                  <div
                    key={a.item}
                    aria-hidden={i !== ativo}
                    className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-idear ${
                      i === ativo ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                    }`}
                  >
                    <Image quality={90} src={a.imagem.src} alt={a.imagem.alt} fill sizes="40vw" className="object-cover" />
                  </div>
                ) : null,
              )}
              <span className="legenda-ilustrativa">Imagem ilustrativa</span>
            </div>
          </div>

          <ul className="col-span-4 md:col-span-12 lg:col-span-6 lg:col-start-7">
            {itens.map((a, i) => (
              <li key={a.item} className="relative">
                <span data-line className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden />
                <button
                  type="button"
                  onMouseEnter={() => setAtivo(i)}
                  onFocus={() => setAtivo(i)}
                  onClick={() => setAtivo(i)}
                  aria-pressed={i === ativo}
                  className="group grid w-full grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-6 text-left md:py-8"
                >
                  <span className="text-[14px] tabular-nums text-stone">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span
                      className={`block text-[14px] font-semibold transition-colors duration-500 ${
                        i === ativo ? "text-bronze-dark" : "text-stone"
                      }`}
                    >
                      {a.item}
                    </span>
                    <span
                      className={`mt-2 block font-serif text-[24px] leading-snug transition-[color,transform] duration-700 ease-idear md:text-[32px] ${
                        i === ativo ? "translate-x-0 text-navy" : "text-navy/55 lg:group-hover:translate-x-1"
                      }`}
                    >
                      {a.material}
                    </span>
                  </span>
                </button>
                {/* No celular, cada item mostra a própria foto */}
                {a.imagem.src ? (
                  <div className="relative mb-8 aspect-[16/10] overflow-hidden bg-sand lg:hidden" data-reveal-image>
                    <div className="absolute inset-0" data-reveal-zoom>
                      <Image quality={90} src={a.imagem.src} alt={a.imagem.alt} fill sizes="100vw" className="object-cover" />
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        {algumaIlustrativa ? (
          <p className="mt-8 text-[13px] text-stone">
            Imagens ilustrativas. A lista completa de marcas e especificações é entregue na visita.
          </p>
        ) : null}
      </div>
    </section>
  );
}
