"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Cursor que segue o mouse com inércia (só desktop, com movimento ligado).
 * Sobre elementos com [data-cursor="Texto"] ele cresce e mostra o texto.
 * O cursor do sistema continua visível; este é um acompanhamento.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [rotulo, setRotulo] = useState("");
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const pode =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!pode) return;
    setAtivo(true);

    const x = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });
    let visivel = false;

    const mover = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      if (!visivel) {
        visivel = true;
        gsap.to(el, { opacity: 1, duration: 0.3 });
      }
      const alvo = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const campo = (e.target as HTMLElement | null)?.closest("input, select, textarea");
      setRotulo(alvo && !campo ? alvo.dataset.cursor ?? "" : "");
    };
    const sair = () => {
      visivel = false;
      gsap.to(el, { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", mover, { passive: true });
    document.documentElement.addEventListener("pointerleave", sair);
    return () => {
      window.removeEventListener("pointermove", mover);
      document.documentElement.removeEventListener("pointerleave", sair);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[80] opacity-0 mix-blend-difference ${ativo ? "" : "hidden"}`}
    >
      <div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[12px] font-semibold uppercase tracking-[0.14em] text-black transition-[width,height] duration-500 ease-idear ${
          rotulo ? "h-[92px] w-[92px]" : "h-3 w-3"
        }`}
      >
        <span className={`transition-opacity duration-300 ${rotulo ? "opacity-100" : "opacity-0"}`}>{rotulo}</span>
      </div>
    </div>
  );
}
