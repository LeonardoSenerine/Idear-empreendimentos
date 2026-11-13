"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LogoHorizontal } from "./Logo";
import { linkWhatsApp, site } from "@/lib/site";
import { casaAtual } from "@/content/casas";

const NAV = [
  { href: "/#a-idear", rotulo: "A Idear" },
  { href: "/#processo", rotulo: "Como construímos" },
  { href: "/#casas-entregues", rotulo: "Casas entregues" },
];

type Props = {
  /** a página começa com uma foto escura: cabeçalho transparente e claro no topo */
  sobreFoto?: boolean;
  cta?: { href: string; rotulo: string };
};

export default function Header({ sobreFoto = true, cta = { href: "#contato", rotulo: "Fale conosco" } }: Props) {
  const [aberto, setAberto] = useState(false);
  const [rolado, setRolado] = useState(false);
  const [oculto, setOculto] = useState(false);
  const [sobreHero, setSobreHero] = useState(sobreFoto);
  const ultimoY = useRef(0);

  // Some ao rolar para baixo, volta ao rolar para cima
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setRolado(y > 24);
      // transparente e claro enquanto está sobre a foto do hero
      setSobreHero(sobreFoto && y < window.innerHeight - 120);
      const delta = y - ultimoY.current;
      if (Math.abs(delta) > 6) {
        setOculto(delta > 0 && y > 320);
        ultimoY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sobreFoto]);

  useEffect(() => {
    const lenis = window.__idearLenis;
    document.body.style.overflow = aberto ? "hidden" : "";
    if (aberto) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aberto]);

  const claro = sobreHero && !aberto;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,color] duration-700 ease-idear ${
        claro ? "border-b border-transparent bg-transparent text-ivory" : "bg-ivory/95 text-navy backdrop-blur-sm"
      } ${!claro && rolado ? "border-b border-line" : "border-b border-transparent"} ${
        oculto && !aberto ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container-idear flex h-[72px] items-center justify-between md:h-20">
        <Link href="/" aria-label="Idear Empreendimentos, página inicial" className="relative z-10">
          <LogoHorizontal variante={claro ? "clara" : "cor"} />
        </Link>
        {casaAtual.provisorio ? (
          <span
            className={`ml-6 mr-auto hidden border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] xl:inline-block ${
              claro ? "border-ivory/30 text-ivory/75" : "border-line text-stone"
            }`}
          >
            Prévia com dados provisórios
          </span>
        ) : null}

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex xl:gap-10">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="link-line text-[15px] font-semibold">
              {item.rotulo}
            </Link>
          ))}
          <Link href="/casa-a-venda" className="link-line flex items-center gap-2 text-[15px] font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bronze-light opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-bronze" />
            </span>
            À venda
          </Link>
          <a href={cta.href} className={`${claro ? "btn-claro" : "btn-primary"} min-h-[46px] px-6`}>
            {cta.rotulo}
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
              className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-500 ease-idear ${
                aberto ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-500 ease-idear ${
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
            {[...NAV, { href: "/casa-a-venda", rotulo: "Casa à venda" }].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setAberto(false)}
                style={{ transitionDelay: aberto ? `${180 + i * 70}ms` : "0ms" }}
                className={`border-b border-line py-5 font-serif text-[36px] leading-none transition-[opacity,transform] duration-700 ease-idear ${
                  aberto ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                } ${item.href === "/casa-a-venda" ? "text-bronze-dark" : ""}`}
              >
                {item.rotulo}
              </Link>
            ))}
          </nav>
          <div
            className={`mt-auto flex flex-col gap-3 transition-[opacity,transform] delay-300 duration-700 ease-idear ${
              aberto ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <a href={cta.href} onClick={() => setAberto(false)} className="btn-primary w-full">
              {cta.rotulo}
            </a>
            <a href={linkWhatsApp()} target="_blank" rel="noopener" className="btn-outline w-full">
              Falar com a Idear
            </a>
            <p className="mt-4 text-[14px] text-stone">
              {site.telefoneExibicao}
              <br />
              {site.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
