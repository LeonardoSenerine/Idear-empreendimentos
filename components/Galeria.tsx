"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { casaAtual as casa } from "@/content/casas";

// Alturas alternadas para dar ritmo à faixa
const RITMO = ["self-end h-[44svh] lg:h-[56svh]", "self-start h-[38svh] lg:h-[46svh]", "self-center h-[42svh] lg:h-[52svh]"];

type Modo = { tipo: "foto"; indice: number } | { tipo: "todas" } | null;

export default function Galeria() {
  const todas = casa.galeria;
  const faixa = todas.map((f, i) => ({ ...f, i })).filter((f) => f.faixa);
  const [modo, setModo] = useState<Modo>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const origemRef = useRef<HTMLElement | null>(null);

  const abrir = (m: Modo, origem: HTMLElement) => {
    origemRef.current = origem;
    setModo(m);
  };
  const fechar = useCallback(() => {
    setModo(null);
    origemRef.current?.focus();
  }, []);
  const mover = useCallback(
    (d: number) =>
      setModo((m) => (m?.tipo === "foto" ? { tipo: "foto", indice: (m.indice + d + todas.length) % todas.length } : m)),
    [todas.length],
  );

  useEffect(() => {
    if (!modo) return;
    fecharRef.current?.focus();
    window.__idearLenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__idearLenis?.start();
      document.body.style.overflow = "";
    };
  }, [modo, fechar, mover]);

  const atual = modo?.tipo === "foto" ? todas[modo.indice] : null;

  return (
    <section id="galeria" aria-labelledby="galeria-titulo" className="relative overflow-x-clip bg-ivory" data-hscroll>
      <div className="flex flex-col justify-center py-24 lg:h-[100svh] lg:py-0">
        <div className="container-idear flex items-end justify-between gap-6">
          <h2 id="galeria-titulo" data-split className="h2">
            Por dentro da casa
          </h2>
          <p className="hidden pb-2 text-[14px] text-stone sm:block">
            <span className="lg:hidden">Deslize para o lado</span>
            <span className="hidden lg:inline">Role para percorrer os ambientes</span>
          </p>
        </div>
        <div className="container-idear mt-5">
          <div className="relative h-px bg-line">
            <span data-hscroll-progress className="absolute inset-0 origin-left bg-navy" aria-hidden />
          </div>
        </div>

        <ul
          data-hscroll-track
          className="sem-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 md:gap-8 md:px-16 lg:mt-12 lg:h-[58svh] lg:snap-none lg:overflow-visible lg:pl-[max(64px,calc((100vw-1280px)/2))] lg:pr-[max(64px,calc((100vw-1280px)/2))]"
        >
          {faixa.map((foto, n) => (
            <li key={foto.src} className={`flex shrink-0 snap-start flex-col ${RITMO[n % RITMO.length]}`}>
              <button
                type="button"
                className="group relative block w-auto overflow-hidden bg-sand"
                // altura explícita (descontada a legenda) para o aspect-ratio definir a largura
                style={{ height: "calc(100% - 2.25rem)", aspectRatio: `${foto.largura} / ${foto.altura}` }}
                aria-label={`Ampliar imagem: ${foto.legenda}`}
                onClick={(e) => abrir({ tipo: "foto", indice: foto.i }, e.currentTarget)}
              >
                <span className="absolute inset-y-0 -left-[6%] -right-[6%]" data-hscroll-img>
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 80vw"
                    className="object-cover transition-transform duration-[1400ms] ease-idear group-hover:scale-[1.04]"
                  />
                </span>
                {foto.ilustrativa ? <span className="legenda-ilustrativa">Imagem ilustrativa</span> : null}
              </button>
              <p className="mt-3 flex justify-between gap-6 text-[14px]">
                <span className="font-semibold">{foto.legenda}</span>
                <span className="tabular-nums text-stone">{String(n + 1).padStart(2, "0")}</span>
              </p>
            </li>
          ))}

          {/* Fecho da faixa: todas as imagens e o convite para a visita */}
          <li className="flex w-[70vw] shrink-0 snap-start flex-col justify-end gap-6 pb-9 sm:w-[320px] lg:w-[360px]">
            <p className="font-serif text-[28px] leading-snug md:text-[34px]">
              Fachada, piscina, salas, cozinha, suítes e banhos.
            </p>
            <div className="flex flex-col items-start gap-4">
              <button
                type="button"
                onClick={(e) => abrir({ tipo: "todas" }, e.currentTarget)}
                className="btn-primary"
              >
                Ver as {todas.length} imagens
              </button>
              <a href="#agendar" className="link-line text-[15px] font-semibold">
                Ver pessoalmente
              </a>
            </div>
          </li>
        </ul>
      </div>

      {/* Grade com todas as imagens */}
      {modo?.tipo === "todas" ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Todas as imagens da casa"
          className="fixed inset-0 z-[60] overflow-y-auto bg-ivory"
          data-lenis-prevent
        >
          <div className="container-idear sticky top-0 z-10 flex h-20 items-center justify-between bg-ivory/95 backdrop-blur-sm">
            <p className="text-[14px] font-semibold">
              Todas as imagens <span className="font-normal text-stone">· {todas.length}</span>
            </p>
            <button ref={fecharRef} type="button" onClick={fechar} className="link-line text-[15px] font-semibold">
              Fechar
            </button>
          </div>
          <ul className="container-idear grid grid-cols-2 gap-4 pb-16 md:grid-cols-3 md:gap-6">
            {todas.map((foto, i) => (
              <li key={foto.src} className="animate-[aparecer_700ms_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: `${i * 40}ms` }}>
                <button
                  type="button"
                  className="group block w-full text-left"
                  onClick={() => setModo({ tipo: "foto", indice: i })}
                  aria-label={`Ampliar imagem: ${foto.legenda}`}
                >
                  <span className="relative block aspect-[4/3] overflow-hidden bg-sand">
                    <Image
                      src={foto.src}
                      alt={foto.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 50vw"
                      className="object-cover transition-transform duration-[1400ms] ease-idear group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="mt-2 block text-[14px] font-semibold">{foto.legenda}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="container-idear pb-10 text-[12px] text-stone">Imagens ilustrativas.</p>
        </div>
      ) : null}

      {/* Imagem ampliada */}
      {atual && modo?.tipo === "foto" ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem ampliada: ${atual.legenda}`}
          className="fixed inset-0 z-[61] flex flex-col bg-ivory"
          data-lenis-prevent
          onClick={(e) => e.target === e.currentTarget && fechar()}
        >
          <div className="container-idear flex h-20 shrink-0 items-center justify-between">
            <p className="text-[14px] font-semibold">
              {atual.legenda}{" "}
              <span className="font-normal text-stone">
                · {modo.indice + 1} de {todas.length}
              </span>
            </p>
            <button ref={fecharRef} type="button" onClick={fechar} className="link-line text-[15px] font-semibold">
              Fechar
            </button>
          </div>
          <div
            key={atual.src}
            className="relative mx-6 mb-6 min-h-0 flex-1 animate-[aparecer_700ms_cubic-bezier(0.22,1,0.36,1)_both] md:mx-16"
            onClick={(e) => e.target === e.currentTarget && fechar()}
          >
            <Image src={atual.src} alt={atual.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="container-idear flex h-20 shrink-0 items-center justify-between border-t border-line">
            <button type="button" onClick={() => mover(-1)} className="link-line text-[15px] font-semibold">
              Anterior
            </button>
            {atual.ilustrativa ? <span className="text-[12px] text-stone">Imagem ilustrativa</span> : null}
            <button type="button" onClick={() => mover(1)} className="link-line text-[15px] font-semibold">
              Próxima
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
