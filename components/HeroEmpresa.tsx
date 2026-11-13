import Image from "next/image";
import Link from "next/link";
import { casaAtual as casa } from "@/content/casas";
import { empresa } from "@/content/empresa";
import HeroMidia from "./HeroMidia";

function Seta({ className = "" }: { className?: string }) {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" aria-hidden className={className}>
      <path d="M0 5h20M16 1l4 4-4 4" />
    </svg>
  );
}

export default function HeroEmpresa() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-navy-deep text-ivory"
    >
      <div data-hero-media className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" data-hero-zoom>
          <HeroMidia hero={casa.hero} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-navy-deep/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-navy-deep/10" />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-navy-deep/60 to-transparent lg:block" />
      </div>

      {/* Celular: etiqueta compacta da casa à venda logo abaixo do cabeçalho */}
      <Link
        href="/casa-a-venda"
        className="absolute inset-x-4 top-[84px] z-10 flex items-center justify-between gap-3 border border-ivory/25 bg-navy-deep/45 px-4 py-3 text-[14px] backdrop-blur-md lg:hidden"
        data-hero-fade
      >
        <span className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bronze-light opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-bronze-light" />
          </span>
          <span>
            <span className="font-semibold">À venda:</span> Casa {casa.nome}
          </span>
        </span>
        <Seta />
      </Link>

      <div className="container-idear relative flex h-full flex-col justify-end pb-24 pt-32 md:pb-12" data-hero-sair>
        <div className="grid-12 items-end gap-y-10">
          <div className="col-span-4 md:col-span-12 lg:col-span-8">
            <p
              className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-bronze-light md:text-[13px]"
              data-hero-fade
            >
              {empresa.hero.chamada}
            </p>
            <h1 id="hero-titulo" className="mt-5">
              <span
                data-split="hero"
                className="display block max-w-[11ch] text-[52px] text-ivory sm:text-[84px] lg:text-[clamp(88px,8.6vw,140px)]"
              >
                {empresa.hero.titulo}
              </span>
            </h1>
            <p className="mt-6 max-w-[44ch] text-[17px] text-ivory/80 md:text-[19px]" data-hero-fade>
              {empresa.hero.texto}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-hero-fade>
              <Link href="/casa-a-venda" className="btn-claro">
                Conheça a casa à venda
              </Link>
              <a href="#contato" className="btn-outline-claro">
                Fale com a Idear
              </a>
            </div>
          </div>

          {/* Desktop: cartão da casa à venda */}
          <Link
            href="/casa-a-venda"
            data-cursor="Ver casa"
            className="group col-span-4 hidden border border-ivory/20 bg-navy-deep/40 backdrop-blur-md transition-colors duration-500 hover:bg-navy-deep/60 lg:col-span-4 lg:col-start-9 lg:block"
            data-hero-fade
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image quality={90}
                src={casa.imagemAmpla.src}
                alt=""
                fill
                sizes="30vw"
                className="object-cover transition-transform duration-[1400ms] ease-idear group-hover:scale-[1.05]"
              />
            </div>
            <div className="p-6">
              <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-bronze-light">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bronze-light opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-bronze-light" />
                </span>
                À venda agora
              </p>
              <p className="mt-3 font-serif text-[32px] leading-tight">Casa {casa.nome}</p>
              <p className="mt-1 text-[14px] text-ivory/70">
                {casa.bairro}, {casa.resumo.area} m², {casa.resumo.suites} suítes
              </p>
              <p className="mt-5 flex items-center gap-3 text-[14px] font-semibold">
                Ver a casa
                <Seta className="transition-transform duration-500 ease-idear group-hover:translate-x-1.5" />
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
