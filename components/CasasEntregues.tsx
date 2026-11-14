"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { empresa, type Entrega } from "@/content/empresa";
import { casaAtual } from "@/content/casas";

function Ficha({ c, claro = false }: { c: Entrega; claro?: boolean }) {
  const sub = claro ? "text-ivory/65" : "text-stone";
  return (
    <dl className={`grid grid-cols-3 border-y ${claro ? "border-ivory/20" : "border-navy/15"}`}>
      {[
        { v: `${c.area}`, u: "m²", r: "área" },
        { v: `${c.suites}`, u: "", r: "suítes" },
        { v: `${c.meses}`, u: "meses", r: "de obra" },
      ].map((d, i) => (
        <div key={d.r} className={`flex flex-col-reverse justify-end py-3 ${i ? `border-l pl-3 md:pl-5 ${claro ? "border-ivory/20" : "border-navy/15"}` : ""}`}>
          <dt className={`text-[12px] md:text-[13px] ${sub}`}>{d.r}</dt>
          <dd className="font-serif text-[28px] leading-none md:text-[36px]">
            {d.v}
            {d.u ? <span className={`ml-1 text-[13px] md:text-[15px] ${sub}`}>{d.u}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function SeloPrazo() {
  return (
    <span className="inline-flex items-center gap-2 bg-bronze-dark px-3 py-1.5 text-[12px] font-semibold text-ivory">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M3 8.5l3 3 7-7" />
      </svg>
      Entregue no prazo
    </span>
  );
}

export default function CasasEntregues() {
  const entregas = [...empresa.entregas].sort((a, b) => Number(b.ano) - Number(a.ano));
  const [ativa, setAtiva] = useState(0);
  const [slide, setSlide] = useState(0);
  const trilhoRef = useRef<HTMLUListElement>(null);
  const atual = entregas[ativa];
  const totalCasas = empresa.numeros.find((n) => n.rotulo.includes("casas entregues"))?.valor;

  // Celular: acompanha o cartão visível para os indicadores
  useEffect(() => {
    const el = trilhoRef.current;
    if (!el) return;
    const onScroll = () => {
      const largura = el.firstElementChild?.getBoundingClientRect().width ?? 1;
      setSlide(Math.round(el.scrollLeft / (largura + 16)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="casas-entregues" aria-labelledby="entregues-titulo" className="bg-ivory py-20 lg:py-36">
      <div className="container-idear">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-bronze-dark md:text-[13px]">
              Portfólio
            </p>
            <h2 id="entregues-titulo" data-split className="h2 mt-5">
              Casas entregues
            </h2>
          </div>
          <p className="max-w-[40ch] text-stone lg:text-right">
            {totalCasas ? `${totalCasas} casas entregues, ` : ""}todas no prazo. Cada uma com endereço, data de entrega e uma família morando.
          </p>
        </div>

        {/* Desktop: lista à esquerda, casa ativa à direita */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-12 lg:gap-x-8">
          <ul className="col-span-4 self-start">
            {entregas.map((c, i) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => setAtiva(i)}
                  onMouseEnter={() => setAtiva(i)}
                  aria-pressed={i === ativa}
                  className="group relative w-full py-7 text-left"
                >
                  <span className="absolute inset-x-0 top-0 h-px bg-navy/15" aria-hidden />
                  <span
                    className={`absolute left-0 top-0 h-px bg-navy transition-[width] duration-700 ease-idear ${
                      i === ativa ? "w-full" : "w-0"
                    }`}
                    aria-hidden
                  />
                  <span className="flex items-baseline justify-between gap-6">
                    <span
                      className={`font-serif text-[40px] leading-none transition-colors duration-500 ${
                        i === ativa ? "text-navy" : "text-navy/35 group-hover:text-navy/60"
                      }`}
                    >
                      Casa de {c.area} m²
                    </span>
                    <span className={`text-[15px] tabular-nums ${i === ativa ? "text-bronze-dark" : "text-stone"}`}>{c.ano}</span>
                  </span>
                  <span className="mt-2 block text-[14px] text-stone">
                    {c.bairro}, {c.area} m²
                  </span>
                </button>
              </li>
            ))}
            <li>
              <Link href="/casa-a-venda" className="group relative block w-full py-7">
                <span className="absolute inset-x-0 top-0 h-px bg-navy/15" aria-hidden />
                <span className="flex items-baseline justify-between gap-6">
                  <span className="font-serif text-[40px] leading-none text-bronze-dark">Casa de {casaAtual.resumo.area} m²</span>
                  <span className="text-[15px] text-bronze-dark">À venda</span>
                </span>
                <span className="mt-2 flex items-center gap-2 text-[14px] font-semibold">
                  A próxima casa da Idear
                  
                </span>
              </Link>
            </li>
          </ul>

          <div className="col-span-8">
            <div className="relative aspect-[16/10] overflow-hidden bg-sand" data-reveal-image>
              {entregas.map((c, i) => (
                <div
                  key={c.slug}
                  aria-hidden={i !== ativa}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[1000ms] ease-idear ${
                    i === ativa ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                  }`}
                >
                  <Image quality={90} src={c.imagem} alt={c.alt} fill sizes="60vw" className="object-cover" />
                </div>
              ))}
              <div className="absolute left-5 top-5">
                <SeloPrazo />
              </div>
              <span className="legenda-ilustrativa">Imagem ilustrativa</span>
            </div>
            <div key={atual.slug} className="mt-8 grid grid-cols-2 gap-8 animate-[aparecer_700ms_cubic-bezier(0.22,1,0.36,1)_both]">
              <div>
                <p className="font-serif text-[20px] italic text-bronze-dark">Entregue em {atual.ano}</p>
                <p className="mt-3 text-[17px]">{atual.descricao}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {atual.destaques.map((d) => (
                    <li key={d} className="border border-navy/20 px-3 py-1.5 text-[13px]">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <Ficha c={atual} />
            </div>
          </div>
        </div>
      </div>

      {/* Celular e tablet: cartões que deslizam */}
      <div className="mt-12 lg:hidden">
        <ul ref={trilhoRef} className="sem-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 md:px-16">
          {entregas.map((c) => (
            <li key={c.slug} className="w-[84vw] shrink-0 snap-start sm:w-[60vw]">
              <article>
                <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                  <Image quality={90} src={c.imagem} alt={c.alt} fill sizes="84vw" className="object-cover" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4">
                    <SeloPrazo />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                    <p className="font-serif text-[18px] italic text-bronze-light">Entregue em {c.ano}</p>
                    <h3 className="mt-1 font-serif text-[38px] leading-tight">Casa de {c.area} m²</h3>
                    <p className="text-[14px] text-ivory/75">
                      {c.bairro}, {c.cidade}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Ficha c={c} />
                  <p className="mt-4 text-[15px] text-stone">{c.descricao}</p>
                </div>
              </article>
            </li>
          ))}
          <li className="w-[84vw] shrink-0 snap-start sm:w-[60vw]">
            <Link href="/casa-a-venda" className="flex aspect-[4/5] flex-col justify-end bg-navy p-6 text-ivory">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-bronze-light">A próxima</p>
              <p className="mt-3 font-serif text-[40px] leading-tight">{casaAtual.resumoCurto}</p>
              <p className="mt-2 text-[15px] text-ivory/75">
                À venda, {casaAtual.resumo.area} m², {casaAtual.resumo.suites} suítes
              </p>
              <span className="btn-claro mt-6 self-start">Ver a casa</span>
            </Link>
          </li>
        </ul>
        <div className="mt-6 flex justify-center gap-2" aria-hidden>
          {[...entregas, null].map((_, i) => (
            <span
              key={i}
              className={`h-1 transition-[width,background-color] duration-500 ${i === slide ? "w-8 bg-navy" : "w-3 bg-navy/25"}`}
            />
          ))}
        </div>
      </div>

      {empresa.provisorio ? (
        <p className="container-idear mt-12 text-[13px] text-stone">
          Casas, anos e metragens de exemplo para a prévia. Serão substituídos pelas casas entregues pela Idear, com fotos reais.
        </p>
      ) : null}
    </section>
  );
}
