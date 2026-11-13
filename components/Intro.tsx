"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SIMBOLO_PATHS } from "./Simbolo";

/**
 * Abertura curta: o símbolo da Idear se desenha e a cortina marfim sobe, revelando o hero.
 * Só na primeira visita da sessão e só com movimento ligado (o CSS esconde nos outros casos).
 * Cerca de 1,8 s no total.
 */
export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    const terminar = () => {
      window.__idearIntroDone = true;
      window.dispatchEvent(new Event("idear:intro-done"));
    };
    if (!el || !root.classList.contains("js-motion") || root.classList.contains("sem-intro")) {
      terminar();
      return;
    }
    try {
      sessionStorage.setItem("idear-intro", "1");
    } catch {}

    window.__idearLenis?.stop();
    const paths = el.querySelectorAll<SVGPathElement>("path");
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        el.style.display = "none";
        window.__idearLenis?.start();
      },
    });
    tl.to(paths, { strokeDashoffset: 0, duration: 1.0, stagger: 0.1, ease: "power2.inOut" })
      .to(el.querySelector("[data-intro-marca]"), { opacity: 0, y: -16, duration: 0.45 }, "+=0.05")
      .to(el, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, "-=0.2")
      .add(terminar, "-=0.75");

    // Se a aba estiver em segundo plano (requestAnimationFrame parado), não prende a página atrás da cortina
    const failsafe = window.setTimeout(() => {
      if (tl.progress() < 1) tl.progress(1);
    }, 3500);

    return () => {
      window.clearTimeout(failsafe);
      tl.kill();
    };
  }, []);

  return (
    <div
      id="intro"
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-[90] items-center justify-center bg-navy-deep"
    >
      <div data-intro-marca>
        <svg viewBox="0 0 416 570" fill="none" stroke="#C4B992" strokeWidth={10} className="h-24 w-auto md:h-28">
          {SIMBOLO_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      </div>
    </div>
  );
}
