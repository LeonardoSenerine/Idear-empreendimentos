"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { guia } from "@/content/guia";

/* ---------- Cores: toque no código para copiar ---------- */
export function PaletaCores() {
  const [copiado, setCopiado] = useState<string | null>(null);
  const copiar = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiado(hex);
    } catch {
      setCopiado(`${hex}-erro`);
    }
    window.setTimeout(() => setCopiado(null), 1400);
  };
  return (
    <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-x-8" data-reveal-group>
      {guia.cores.map((c) => (
        <li key={c.hex} className="group" data-reveal>
          <div
            className="h-24 border border-line transition-transform duration-500 ease-idear group-hover:-translate-y-1 md:h-32"
            style={{ background: c.hex }}
          />
          <p className="mt-4 font-semibold">{c.nome}</p>
          <p className="text-[14px] text-stone">{c.uso}</p>
          <button
            type="button"
            onClick={() => copiar(c.hex)}
            className="mt-3 min-h-[40px] border border-line px-3 text-[14px] font-semibold tracking-[0.04em] text-bronze-dark transition-colors duration-300 hover:border-bronze"
            aria-label={`Copiar o código ${c.hex}`}
          >
            {copiado === c.hex ? "Copiado" : copiado === `${c.hex}-erro` ? `${c.hex}: selecione` : c.hex}
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Tipografia: teste com um título ---------- */
export function TesteFonte() {
  const [texto, setTexto] = useState("Casa à venda em Itatiba");
  return (
    <div className="mt-8 grid border border-line bg-white md:grid-cols-[1fr_1.4fr]">
      <label className="grid content-start gap-2 border-b border-line p-6 text-[14px] text-stone md:border-b-0 md:border-r md:p-8">
        Teste com um título
        <input
          type="text"
          value={texto}
          maxLength={60}
          autoComplete="off"
          onChange={(e) => setTexto(e.target.value)}
          className="min-h-[46px] border border-line bg-ivory px-3 text-[16px] text-navy focus:border-navy focus:outline-none"
        />
        <span>Digite outro título para ver as duas fontes juntas.</span>
      </label>
      <div className="grid content-center gap-2 p-6 md:p-8" aria-live="polite">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-bronze-dark">Casa à venda</p>
        <p className="break-words font-serif text-[36px] font-medium leading-[1.05] md:text-[52px]">
          {texto.trim() || "Casa à venda em Itatiba"}
        </p>
        <p className="text-stone">Área gourmet, piscina e suíte com closet.</p>
      </div>
    </div>
  );
}

/* ---------- Criativos: abas, galeria e ampliação ---------- */
type Aba = "feed" | "carrossel" | "stories" | "destaques";
const ABAS: { id: Aba; rotulo: string }[] = [
  { id: "feed", rotulo: "Feed" },
  { id: "carrossel", rotulo: "Carrossel" },
  { id: "stories", rotulo: "Stories" },
  { id: "destaques", rotulo: "Destaques" },
];

// Ícones das capas de destaque, em traço fino como as linhas do símbolo
const ICONES: Record<string, string> = {
  casa: '<path d="M18 58 L60 24 L102 58"/><path d="M30 50 V96 H90 V50"/><path d="M52 96 V74 H68 V96"/>',
  amb: '<path d="M28 60 V48 Q28 40 36 40 H84 Q92 40 92 48 V60"/><path d="M20 60 H100 V82 H20 Z"/><path d="M20 70 H100"/><path d="M28 82 V92"/><path d="M92 82 V92"/>',
  laz: '<circle cx="60" cy="42" r="13"/><path d="M60 18 V22"/><path d="M36 42 H40"/><path d="M80 42 H84"/><path d="M43 25 L46 28"/><path d="M77 25 L74 28"/><path d="M18 76 q10.5 -8 21 0 t21 0 t21 0 t21 0"/><path d="M18 92 q10.5 -8 21 0 t21 0 t21 0 t21 0"/>',
  sui: '<path d="M18 38 V94"/><path d="M18 70 H102 V86 H18"/><path d="M102 86 V94"/><rect x="26" y="56" width="22" height="14" rx="4"/><path d="M54 70 V61 Q54 56 59 56 H96 Q102 56 102 62 V70"/>',
  det: '<path d="M40 28 H80 L98 50 L60 98 L22 50 Z"/><path d="M22 50 H98"/><path d="M40 28 L50 50 L60 98 L70 50 L80 28"/>',
  loc: '<path d="M60 100 C60 100 32 72 32 50 A28 28 0 0 1 88 50 C88 72 60 100 60 100 Z"/><circle cx="60" cy="50" r="10"/>',
  vis: '<rect x="22" y="30" width="76" height="66" rx="6"/><path d="M22 48 H98"/><path d="M42 22 V36"/><path d="M78 22 V36"/><path d="M46 72 L56 82 L76 62"/>',
};
const DESTAQUES: [string, string][] = [
  ["casa", "A casa"],
  ["amb", "Ambientes"],
  ["laz", "Lazer"],
  ["sui", "Suíte"],
  ["det", "Detalhes"],
  ["loc", "Local"],
  ["vis", "Visitas"],
  ["idear", "A Idear"],
];

export function GaleriaCriativos() {
  const [aba, setAba] = useState<Aba>("feed");
  const [aberto, setAberto] = useState<number | null>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const lista =
    aba === "destaques" ? [] : guia.criativos[aba].map(([arq, rotulo]) => ({ src: `/guia/${aba}/${arq}.jpg`, rotulo }));
  const vertical = aba === "stories";

  const fechar = useCallback(() => setAberto(null), []);
  const mover = useCallback(
    (d: number) => setAberto((a) => (a === null ? a : (a + d + lista.length) % lista.length)),
    [lista.length],
  );

  useEffect(() => {
    if (aberto === null) return;
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
  }, [aberto, fechar, mover]);

  const atual = aberto !== null ? lista[aberto] : null;

  return (
    <>
      <div
        role="tablist"
        aria-label="Tipos de criativo"
        className="sem-scrollbar -mx-6 mt-10 flex gap-2 overflow-x-auto px-6 md:mx-0 md:px-0"
      >
        {ABAS.map((a) => (
          <button
            key={a.id}
            role="tab"
            type="button"
            aria-selected={aba === a.id}
            onClick={() => setAba(a.id)}
            className={`min-h-[44px] shrink-0 border px-5 text-[15px] font-semibold transition-colors duration-300 ${
              aba === a.id ? "border-navy bg-navy text-ivory" : "border-line text-navy hover:border-navy"
            }`}
          >
            {a.rotulo}
          </button>
        ))}
      </div>

      {aba === "destaques" ? (
        <div>
          <ul className="mt-8 grid grid-cols-4 gap-x-3 gap-y-6 md:grid-cols-8 md:gap-6">
            {DESTAQUES.map(([id, rotulo], i) => (
              <li
                key={id}
                className="grid animate-[aparecer_600ms_cubic-bezier(0.22,1,0.36,1)_both] justify-items-center gap-2.5 text-[14px] font-medium"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <span className="grid h-[72px] w-[72px] place-items-center rounded-full border border-line bg-sand md:h-24 md:w-24">
                  {id === "idear" ? (
                    <Image src="/guia/symbol-bronze.png" alt="" width={64} height={88} className="h-8 w-auto md:h-11" />
                  ) : (
                    <svg
                      viewBox="0 0 120 120"
                      fill="none"
                      stroke="#756B48"
                      strokeWidth={6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 md:h-11 md:w-11"
                      aria-hidden
                      dangerouslySetInnerHTML={{ __html: ICONES[id] }}
                    />
                  )}
                </span>
                {rotulo}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[14px] text-stone">Como aparecem no perfil: fundo areia e ícones de traço fino em bronze.</p>
        </div>
      ) : (
        <ul
          key={aba}
          className={`mt-8 grid gap-3.5 md:gap-5 ${
            vertical ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {lista.map((c, i) => (
            <li
              key={c.src}
              className="animate-[aparecer_600ms_cubic-bezier(0.22,1,0.36,1)_both]"
              style={{ animationDelay: `${Math.min(i, 12) * 45}ms` }}
            >
              <button
                type="button"
                onClick={() => setAberto(i)}
                data-cursor="Ampliar"
                aria-label={`Ampliar: ${c.rotulo}`}
                className="group grid w-full gap-2 text-left"
              >
                <span
                  className={`relative block overflow-hidden shadow-[0_10px_28px_rgba(7,50,79,0.14)] transition-[transform,box-shadow] duration-500 ease-idear group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_36px_rgba(7,50,79,0.2)] ${
                    vertical ? "aspect-[9/16]" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={c.src}
                    alt={c.rotulo}
                    fill
                    quality={90}
                    sizes={vertical ? "(min-width: 1024px) 16vw, 50vw" : "(min-width: 1024px) 24vw, 50vw"}
                    className="object-cover"
                  />
                </span>
                <span className="text-[13px] text-stone">{c.rotulo}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {atual ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Criativo ampliado: ${atual.rotulo}`}
          className="fixed inset-0 z-[70] grid place-items-center bg-[#04141e]/90 px-3 pb-20 pt-16 md:px-16 md:pb-10"
          data-lenis-prevent
          onClick={(e) => e.target === e.currentTarget && fechar()}
        >
          <figure key={atual.src} className="grid animate-[aparecer_400ms_cubic-bezier(0.22,1,0.36,1)_both] justify-items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={atual.src}
              alt={atual.rotulo}
              className="max-h-[calc(100svh-150px)] w-auto shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            />
            <figcaption className="text-[14px] text-ivory">
              {atual.rotulo} ({aberto! + 1} de {lista.length})
            </figcaption>
          </figure>
          <button
            ref={fecharRef}
            type="button"
            onClick={fechar}
            className="absolute right-3 top-3 min-h-[44px] border border-ivory/40 px-4 text-[14px] font-semibold text-ivory"
          >
            Fechar
          </button>
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3 md:inset-x-auto md:bottom-auto md:left-4 md:right-4 md:top-1/2 md:justify-between">
            <button
              type="button"
              onClick={() => mover(-1)}
              className="min-h-[44px] border border-ivory/40 bg-[#04141e]/60 px-4 text-[14px] font-semibold text-ivory"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => mover(1)}
              className="min-h-[44px] border border-ivory/40 bg-[#04141e]/60 px-4 text-[14px] font-semibold text-ivory"
            >
              Próximo
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
