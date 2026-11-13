import Image from "next/image";
import { casaAtual as casa } from "@/content/casas";

export default function Projeto() {
  const amplo = casa.imagemAmpla;
  return (
    <section id="o-projeto" aria-labelledby="projeto-titulo" className="relative bg-navy text-ivory">
      <div className="container-idear pt-24 lg:pt-40">
        <div className="grid-12 gap-y-10">
          <p className="col-span-4 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-bronze-light md:col-span-12 lg:col-span-3">
            <span id="projeto-titulo">O projeto</span>
          </p>
          <div className="col-span-4 md:col-span-12 lg:col-span-9">
            <p data-words-scrub className="statement text-ivory">
              {casa.apresentacao[0]}
            </p>
            <p className="mt-10 max-w-[52ch] text-ivory/70" data-reveal-group>
              <span data-reveal className="block">
                {casa.apresentacao[1]}
              </span>
            </p>
          </div>
        </div>

        {/* Destaques em fotos grandes, em duas colunas desencontradas */}
        <ul className="mt-20 grid gap-6 md:grid-cols-2 md:gap-8 lg:mt-28">
          {casa.destaques.map((d, i) => (
            <li key={d.titulo} className={i % 2 ? "md:mt-32" : ""}>
              <article className="group relative aspect-[4/5] overflow-hidden" data-reveal-image>
                <div className="absolute inset-0" data-reveal-zoom>
                  <div className="absolute inset-x-0 -top-[7%] h-[114%]" data-img-parallax>
                    <Image quality={90}
                      src={d.imagem}
                      alt={d.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1600ms] ease-idear group-hover:scale-[1.06]"
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                  <p className="font-serif text-[44px] leading-none text-bronze-light md:text-[64px]">{d.numero}</p>
                  <h3 className="mt-3 font-serif text-[28px] leading-tight md:text-[36px]">{d.titulo}</h3>
                  <p className="mt-3 max-w-[38ch] text-[15px] text-ivory/80 transition-[opacity,transform] duration-700 ease-idear lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    {d.texto}
                  </p>
                </div>
                <span className="absolute right-4 top-4 text-[11px] tracking-[0.04em] text-ivory/70">Imagem ilustrativa</span>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* Imagem que se abre até a largura total */}
      <div data-expand className="relative mt-24 h-[70svh] overflow-hidden md:h-[85svh] lg:mt-32 lg:h-[100svh]">
        <div className="absolute inset-0" data-expand-inner>
          <Image quality={90} src={amplo.src} alt={amplo.alt} fill sizes="100vw" className="object-cover object-[50%_62%]" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
        <div className="container-idear absolute inset-x-0 bottom-0 pb-10 lg:pb-16">
          <p data-split className="display max-w-[14ch] text-[44px] text-ivory md:text-[72px] lg:text-[96px]">
            Feita para receber.
          </p>
        </div>
        <span className="absolute right-4 top-4 text-[11px] tracking-[0.04em] text-ivory/70">Imagem ilustrativa</span>
      </div>
    </section>
  );
}
