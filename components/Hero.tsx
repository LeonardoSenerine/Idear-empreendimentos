import { casaAtual as casa } from "@/content/casas";
import { linkWhatsApp } from "@/lib/site";
import HeroMidia from "./HeroMidia";

export default function Hero() {
  const { resumo } = casa;
  const dados = [
    { v: resumo.area, u: "m²", r: "de área construída" },
    { v: resumo.suites, u: "", r: "suítes" },
    { v: resumo.vagas, u: "", r: "vagas na garagem" },
  ];

  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-navy-deep text-ivory"
    >
      {/* Vídeo/foto em tela cheia: abre de dentro para fora e afunda devagar na rolagem */}
      <div data-hero-media className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" data-hero-zoom>
          <HeroMidia hero={casa.hero} />
        </div>
        {/* Degradês para leitura: topo (cabeçalho) e base (título) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-navy-deep/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/45 to-transparent [background-size:100%_100%] lg:via-navy-deep/30" />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-navy-deep/55 to-transparent lg:block" />
      </div>

      <div className="container-idear relative flex h-full flex-col justify-end pb-8 pt-28 lg:pb-12">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-4 md:col-span-12 lg:col-span-8">
            <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-bronze-light" data-hero-fade>
              <span className="h-px w-10 bg-bronze-light" aria-hidden />
              Casa à venda · {casa.bairro}, {casa.cidade}
            </p>
            <h1 id="hero-titulo" className="mt-5">
              <span data-split="hero" className="display block text-[64px] text-ivory sm:text-[96px] lg:text-[clamp(110px,11vw,176px)]">
                Casa {casa.nome}
              </span>
              <span className="mt-4 block max-w-[30ch] font-serif text-[22px] leading-snug text-ivory/85 md:text-[28px]" data-hero-fade>
                {casa.titulo}
              </span>
            </h1>
            <div className="mt-8 flex flex-wrap gap-3" data-hero-fade>
              <a href="#agendar" className="btn-claro">
                Agendar visita
              </a>
              <a
                href={linkWhatsApp()}
                target="_blank"
                rel="noopener"
                className="btn-outline-claro"
                data-evento="whatsapp-hero"
              >
                Falar com a Idear
              </a>
            </div>
          </div>

          {/* Números da casa, em vidro escuro */}
          <dl
            className="col-span-4 grid grid-cols-3 border-t border-ivory/25 md:col-span-12 lg:col-span-3 lg:col-start-10 lg:grid-cols-1 lg:border-t-0 lg:bg-navy-deep/35 lg:backdrop-blur-md"
            aria-label="Resumo da casa"
            data-hero-fade
          >
            {dados.map((d, i) => (
              <div
                key={d.r}
                className={`flex flex-col-reverse py-4 lg:px-6 lg:py-5 ${
                  i ? "border-l border-ivory/20 pl-4 lg:border-l-0 lg:border-t lg:pl-6" : ""
                }`}
              >
                <dt className="mt-1 text-[13px] text-ivory/70">{d.r}</dt>
                <dd className="flex items-baseline gap-1.5">
                  <span className="font-serif text-[36px] leading-none lg:text-[48px]">{d.v}</span>
                  {d.u ? <span className="text-[15px] text-ivory/80">{d.u}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Indicador de rolagem */}
        <a
          href="#o-projeto"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory/70 lg:flex"
          aria-label="Rolar para conhecer o projeto"
        >
          Role
          <span className="relative block h-12 w-px overflow-hidden bg-ivory/25">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[descer_2.2s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-ivory" />
          </span>
        </a>
      </div>

      {casa.hero.poster.ilustrativa ? (
        <span className="pointer-events-none absolute right-4 top-24 z-10 text-[11px] font-medium tracking-[0.04em] text-ivory/70 md:right-6">
          Imagem ilustrativa
        </span>
      ) : null}
    </section>
  );
}
