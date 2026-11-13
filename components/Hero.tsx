import { casaAtual as casa } from "@/content/casas";
import { linkWhatsApp } from "@/lib/site";
import HeroMidia from "./HeroMidia";

export default function Hero() {
  const { resumo } = casa;
  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden bg-ivory pt-[72px] md:pt-20 lg:flex lg:h-[100svh] lg:min-h-[720px] lg:flex-col"
    >
      {/* Mídia: abre de dentro para fora na entrada e afunda devagar na rolagem; ocupa o que sobra da tela */}
      <div
        data-hero-media
        className="relative h-[44svh] min-h-[300px] overflow-hidden sm:h-[58svh] lg:h-auto lg:min-h-0 lg:flex-1"
      >
        <div className="absolute inset-0" data-hero-zoom>
          <HeroMidia hero={casa.hero} />
        </div>
        {casa.hero.poster.ilustrativa ? (
          <span className="legenda-ilustrativa bottom-auto top-3 lg:bottom-5 lg:right-5 lg:top-auto">Imagem ilustrativa</span>
        ) : null}
      </div>

      {/* Faixa com o essencial: casa à venda, onde fica, como falar */}
      <div className="container-idear" data-speed="-6">
        <div className="grid-12 items-end gap-y-7 pb-10 pt-7 lg:pb-9 lg:pt-5">
          <div className="col-span-4 md:col-span-12 lg:col-span-7">
            <p className="text-[15px] font-semibold" data-hero-fade>
              À venda em {casa.bairro}, {casa.cidade}
            </p>
            <h1 id="hero-titulo" className="mt-2 lg:mt-1">
              <span data-split="hero" className="display block text-[60px] sm:text-[84px] lg:text-[clamp(96px,10vw,152px)]">
                Casa {casa.nome}
              </span>
              <span className="sr-only">. {casa.titulo}</span>
            </h1>
          </div>

          <div className="col-span-4 md:col-span-12 lg:col-span-5 lg:pb-3">
            <p className="max-w-[34ch] text-stone" data-hero-fade>
              {casa.titulo}
            </p>
            <dl className="mt-5 flex border-y border-line text-navy" data-hero-fade aria-label="Resumo da casa">
              {[
                { v: `${resumo.area}`, u: "m²", r: "área" },
                { v: `${resumo.suites}`, u: "", r: "suítes" },
                { v: `${resumo.vagas}`, u: "", r: "vagas" },
              ].map((d, i) => (
                <div key={d.r} className={`flex-1 py-3 ${i ? "border-l border-line pl-4" : ""}`}>
                  <dt className="sr-only">{d.r}</dt>
                  <dd className="flex items-baseline gap-1.5">
                    <span className="font-serif text-[30px] leading-none">{d.v}</span>
                    <span className="text-[14px] text-stone">{d.u || d.r}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex gap-3" data-hero-fade>
              <a href="#agendar" className="btn-primary flex-1 px-4 sm:flex-none sm:px-7">
                Agendar visita
              </a>
              <a
                href={linkWhatsApp()}
                target="_blank"
                rel="noopener"
                className="btn-outline flex-1 px-4 sm:flex-none sm:px-7"
                data-evento="whatsapp-hero"
              >
                Falar com a Idear
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
