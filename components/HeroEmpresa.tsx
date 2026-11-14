import { casaAtual as casa } from "@/content/casas";
import { empresa } from "@/content/empresa";
import HeroMidia from "./HeroMidia";

/** Hero da home: apresenta a Idear (a casa à venda tem seção e página próprias). */
export default function HeroEmpresa() {
  // Números da empresa: anos, casas entregues e obras no prazo
  const numeros = [empresa.numeros[0], empresa.numeros[1], empresa.numeros[3]].filter(Boolean);

  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-navy-deep text-ivory"
    >
      {/* Vídeo de uma casa construída pela Idear */}
      <div data-hero-media className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" data-hero-zoom>
          <HeroMidia hero={casa.hero} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-navy-deep/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-navy-deep/10" />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-navy-deep/60 to-transparent lg:block" />
      </div>

      {/* no celular, folga embaixo para a barra fixa de ações */}
      <div className="container-idear relative flex h-full flex-col justify-end pb-28 pt-28 md:pb-12" data-hero-sair>
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-4 md:col-span-12 lg:col-span-8">
            <p
              className="text-[12px] font-semibold uppercase tracking-[0.2em] text-bronze-light md:text-[13px]"
              data-hero-fade
            >
              {empresa.hero.chamada}
            </p>
            <h1 id="hero-titulo" className="mt-5">
              <span
                data-split="hero"
                className="display block max-w-[11ch] text-[48px] text-ivory sm:text-[84px] lg:text-[clamp(88px,8.6vw,140px)]"
              >
                {empresa.hero.titulo}
              </span>
            </h1>
            <p className="mt-5 max-w-[44ch] text-[16px] text-ivory/80 md:mt-6 md:text-[19px]" data-hero-fade>
              {empresa.hero.texto}
            </p>
            <div className="mt-7 flex gap-3 md:mt-8" data-hero-fade>
              <a href="#a-idear" className="btn-claro flex-1 px-3 text-[14px] sm:flex-none sm:px-7 sm:text-[15px]">
                Conheça a Idear
              </a>
              <a href="#contato" className="btn-outline-claro flex-1 px-3 text-[14px] sm:flex-none sm:px-7 sm:text-[15px]">
                Fale conosco
              </a>
            </div>
          </div>

          {/* Números da empresa: em linha no celular, em painel de vidro no desktop */}
          <dl
            className="col-span-4 grid grid-cols-3 border-t border-ivory/25 md:col-span-12 lg:col-span-3 lg:col-start-10 lg:grid-cols-1 lg:border-t-0 lg:bg-navy-deep/35 lg:backdrop-blur-md"
            aria-label="A Idear em números"
            data-hero-fade
          >
            {numeros.map((n, i) => (
              <div
                key={n.rotulo}
                className={`flex flex-col-reverse justify-end py-4 lg:px-6 lg:py-5 ${
                  i ? "border-l border-ivory/20 pl-3 lg:border-l-0 lg:border-t lg:pl-6" : ""
                }`}
              >
                <dt className="mt-1 text-[12px] leading-snug text-ivory/70 md:text-[13px]">{n.rotulo}</dt>
                <dd className="flex items-baseline">
                  <span className="font-serif text-[34px] leading-none lg:text-[48px]" data-count={n.valor}>
                    {n.valor.toLocaleString("pt-BR")}
                  </span>
                  {n.sufixo ? <span className="font-serif text-[20px] text-bronze-light lg:text-[26px]">{n.sufixo}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
