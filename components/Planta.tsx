"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { casaAtual as casa } from "@/content/casas";
import PlantaIlustrativa from "./PlantaIlustrativa";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Planta() {
  const [ativo, setAtivo] = useState(0);
  const abasRef = useRef<(HTMLButtonElement | null)[]>([]);
  const indicadorRef = useRef<HTMLSpanElement>(null);
  const desenhoRef = useRef<HTMLDivElement>(null);
  const listaRef = useRef<HTMLOListElement>(null);
  const jaViu = useRef(false);
  const pav = casa.pavimentos[ativo];
  const total = pav.ambientes.reduce((s, a) => s + a.area, 0);

  // Indicador da aba desliza até a aba ativa
  useIsoLayoutEffect(() => {
    const aba = abasRef.current[ativo];
    const ind = indicadorRef.current;
    if (!aba || !ind) return;
    ind.style.width = `${aba.offsetWidth}px`;
    ind.style.transform = `translateX(${aba.offsetLeft}px)`;
  }, [ativo]);

  // A cada troca: paredes se desenham e a legenda entra em sequência
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const svg = desenhoRef.current?.querySelector("svg");
    const linhas = listaRef.current?.querySelectorAll("li");
    if (reduce || !svg) return;

    const tracos = svg.querySelectorAll<SVGGeometryElement>("rect, line");
    const rotulos = svg.querySelectorAll<SVGElement>("g, text");
    tracos.forEach((t) => {
      const len = t.getTotalLength();
      t.style.strokeDasharray = `${len}`;
      t.style.strokeDashoffset = `${len}`;
    });

    const tocar = () => {
      const tl = gsap.timeline();
      tl.to(tracos, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.025 })
        .fromTo(rotulos, { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.03 }, 0.6);
      if (linhas) tl.fromTo(linhas, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" }, 0.1);
      return tl;
    };

    // Primeira vez: espera a planta entrar na tela; depois, anima na troca de aba
    if (jaViu.current) {
      const tl = tocar();
      return () => {
        tl.kill();
      };
    }
    gsap.set(rotulos, { opacity: 0 });
    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          jaViu.current = true;
          tocar();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, [ativo]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (ativo + (e.key === "ArrowRight" ? 1 : -1) + casa.pavimentos.length) % casa.pavimentos.length;
    setAtivo(n);
    abasRef.current[n]?.focus();
  };

  return (
    <section id="planta" aria-labelledby="planta-titulo" className="section bg-white">
      <div className="container-idear grid-12 gap-y-12">
        <div className="col-span-4 md:col-span-12 lg:col-span-4">
          <h2 id="planta-titulo" data-split className="h2">
            Dois pavimentos, quatro suítes.
          </h2>

          <div role="tablist" aria-label="Pavimentos" className="relative mt-10 flex gap-8 border-b border-line">
            {casa.pavimentos.map((p, i) => (
              <button
                key={p.id}
                ref={(el) => {
                  abasRef.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`aba-${p.id}`}
                aria-selected={ativo === i}
                aria-controls={`painel-${p.id}`}
                tabIndex={ativo === i ? 0 : -1}
                onClick={() => setAtivo(i)}
                onKeyDown={onKey}
                className={`py-4 font-serif text-[26px] leading-none transition-colors duration-500 md:text-[30px] ${
                  ativo === i ? "text-navy" : "text-stone/70 hover:text-navy"
                }`}
              >
                {p.nome}
              </button>
            ))}
            <span
              ref={indicadorRef}
              aria-hidden
              className="absolute -bottom-px left-0 h-px bg-navy transition-[transform,width] duration-700 ease-idear"
            />
          </div>

          <ol ref={listaRef} className="mt-6" aria-label={`Ambientes do pavimento ${pav.nome.toLowerCase()}`}>
            {pav.ambientes.map((a, i) => (
              <li key={pav.id + a.nome} className="flex items-baseline gap-4 border-b border-line py-3.5 text-[15px]">
                <span className="w-5 shrink-0 tabular-nums text-stone">{i + 1}</span>
                <span className="flex-1">{a.nome}</span>
                <span className="tabular-nums text-stone">{a.area} m²</span>
              </li>
            ))}
            <li className="flex items-baseline justify-between py-4 text-[15px] font-semibold">
              <span>Área do pavimento</span>
              <span className="tabular-nums">{total} m²</span>
            </li>
          </ol>
        </div>

        <div
          role="tabpanel"
          id={`painel-${pav.id}`}
          aria-labelledby={`aba-${pav.id}`}
          className="col-span-4 md:col-span-12 lg:col-span-7 lg:col-start-6"
        >
          <div className="relative bg-ivory p-6 md:p-12">
            {pav.planta ? (
              <Image
                src={pav.planta}
                alt={`Planta do pavimento ${pav.nome.toLowerCase()}`}
                width={1200}
                height={1400}
                className="h-auto w-full"
              />
            ) : (
              <div ref={desenhoRef} key={pav.id} className="mx-auto max-w-[520px]">
                <PlantaIlustrativa pavimento={pav} />
              </div>
            )}
            <p className="mt-6 text-[13px] text-stone">
              {pav.planta
                ? "Planta sem escala. Medidas aproximadas."
                : "Planta ilustrativa, sem escala, para a prévia. Será substituída pela planta do arquiteto."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
