"use client";

import { useEffect, useRef, useState } from "react";
import { LogoHorizontal } from "./Logo";
import { linkWhatsApp, site } from "@/lib/site";
import { casaAtual } from "@/content/casas";

const NAV = [
  { href: "#a-casa", rotulo: "A casa" },
  { href: "#casas-entregues", rotulo: "Casas entregues" },
  { href: "#a-idear", rotulo: "A Idear" },
];

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolado, setRolado] = useState(false);
  const [oculto, setOculto] = useState(false);
  const ultimoY = useRef(0);

  // Some ao rolar para baixo, volta ao rolar para cima
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setRolado(y > 24);
      const delta = y - ultimoY.current;
      if (Math.abs(delta) > 6) {
        setOculto(delta > 0 && y > 320);
        ultimoY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = window.__idearLenis;
    document.body.style.overflow = aberto ? "hidden" : "";
    if (aberto) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aberto]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-ivory/95 backdrop-blur-sm transition-[transform,border-color] duration-700 ease-idear ${
        rolado ? "border-b border-line" : "border-b border-transparent"
      } ${oculto && !aberto ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="container-idear flex h-[72px] items-center justify-between md:h-20">
        <a href="#inicio" aria-label="Idear Empreendimentos, início" className="relative z-10">
          <LogoHorizontal />
        </a>
        {casaAtual.provisorio ? (
          <span className="ml-6 mr-auto hidden border border-line px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-stone sm:inline-block">
            Prévia · dados provisórios
          </span>
        ) : null}

        <nav aria-label="Principal" className="hidden items-center gap-10 lg:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="link-line text-[15px] font-semibold text-navy">
              {item.rotulo}
            </a>
          ))}
          <a href="#agendar" className="btn-primary min-h-[46px] px-6">
            Agendar visita
          </a>
        </nav>

        <button
          type="button"
          className="relative z-10 -mr-2 flex h-11 items-center gap-3 px-2 text-[13px] font-semibold uppercase tracking-[0.16em] lg:hidden"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? "Fechar" : "Menu"}
          <span aria-hidden className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-navy transition-transform duration-500 ease-idear ${
                aberto ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-navy transition-transform duration-500 ease-idear ${
                aberto ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

    </header>
      {/* Menu em tela cheia sobre fundo marfim: cortina que desce e itens que sobem em sequência */}
      <div
        id="menu-mobile"
        className={`fixed inset-0 z-40 h-[100svh] bg-ivory transition-[clip-path] duration-700 ease-idear lg:hidden ${
          aberto ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="container-idear flex h-full flex-col pb-10 pt-28">
          <nav aria-label="Principal (celular)" className="flex flex-col">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setAberto(false)}
                style={{ transitionDelay: aberto ? `${180 + i * 70}ms` : "0ms" }}
                className={`border-b border-line py-5 font-serif text-[40px] leading-none transition-[opacity,transform] duration-700 ease-idear ${
                  aberto ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                {item.rotulo}
              </a>
            ))}
          </nav>
          <div
            className={`mt-auto flex flex-col gap-3 transition-[opacity,transform] delay-300 duration-700 ease-idear ${
              aberto ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <a href="#agendar" onClick={() => setAberto(false)} className="btn-primary w-full">
              Agendar visita
            </a>
            <a href={linkWhatsApp()} target="_blank" rel="noopener" className="btn-outline w-full">
              Falar com a Idear
            </a>
            <p className="mt-4 text-[14px] text-stone">
              {site.telefoneExibicao} · {site.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
