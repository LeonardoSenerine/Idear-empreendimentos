import Image from "next/image";
import Link from "next/link";
import { casaAtual as casa } from "@/content/casas";

/** A casa à venda como seção especial da home (os detalhes completos ficam em /casa-a-venda). */
export default function CasaDestaque() {
  const miniaturas = casa.destaques.slice(0, 3);
  const entrega = casa.ficha.find((f) => f.rotulo.startsWith("Previsão"))?.valor;
  return (
    <section id="a-venda" aria-labelledby="a-venda-titulo" className="relative overflow-hidden bg-navy-deep text-ivory">
      <div className="lg:grid lg:min-h-[100svh] lg:grid-cols-2">
        {/* Foto grande */}
        <div className="relative h-[62svh] overflow-hidden lg:h-auto" data-reveal-image data-cursor="À venda">
          <div className="absolute inset-0" data-reveal-zoom>
            <div className="absolute inset-x-0 -top-[7%] h-[114%]" data-img-parallax>
              <Image quality={90}
                src={casa.hero.poster.src!}
                alt={casa.hero.poster.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[50%_40%]"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent lg:hidden" />
          <span className="absolute right-4 top-4 text-[11px] tracking-[0.04em] text-ivory/75">Imagem ilustrativa</span>
        </div>

        {/* Conteúdo */}
        <div className="relative -mt-24 px-6 pb-20 md:px-16 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:px-[max(64px,calc((100vw-1280px)/2))] lg:py-24 lg:pl-16">
          <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-bronze-light md:text-[13px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bronze-light opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-bronze-light" />
            </span>
            À venda agora
          </p>
          <h2 id="a-venda-titulo" data-split className="display mt-5 text-[56px] text-ivory md:text-[88px] lg:text-[104px]">
            Casa {casa.nome}
          </h2>
          <p className="mt-3 text-[15px] text-ivory/70">
            {casa.bairro}, {casa.cidade}
          </p>
          <p className="mt-6 max-w-[44ch] text-ivory/85" data-reveal-group>
            <span data-reveal className="block">
              {casa.apresentacao[0]}
            </span>
          </p>

          <dl className="mt-8 grid grid-cols-4 border-y border-ivory/20">
            {[
              { v: `${casa.resumo.area}`, r: "m²" },
              { v: `${casa.resumo.suites}`, r: "suítes" },
              { v: `${casa.resumo.vagas}`, r: "vagas" },
              { v: String(entrega ?? "a definir"), r: "entrega" },
            ].map((d, i) => (
              <div key={d.r} className={`flex flex-col-reverse py-4 ${i ? "border-l border-ivory/20 pl-3 md:pl-5" : ""}`}>
                <dt className="mt-1 text-[12px] text-ivory/60 md:text-[13px]">{d.r}</dt>
                <dd className="truncate font-serif text-[26px] leading-none md:text-[36px]">{d.v}</dd>
              </div>
            ))}
          </dl>

          {/* Três ambientes */}
          <ul className="mt-8 grid grid-cols-3 gap-2 md:gap-3">
            {miniaturas.map((m) => (
              <li key={m.titulo}>
                <Link href="/casa-a-venda#o-projeto" className="group block" data-cursor="Ver">
                  <span className="relative block aspect-[4/5] overflow-hidden">
                    <Image quality={90}
                      src={m.imagem}
                      alt={m.alt}
                      fill
                      sizes="(min-width: 1024px) 12vw, 30vw"
                      className="object-cover transition-transform duration-[1400ms] ease-idear group-hover:scale-[1.06]"
                    />
                  </span>
                  <span className="mt-2 block text-[12px] text-ivory/75 md:text-[13px]">{m.titulo}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/casa-a-venda" className="btn-claro">
              Ver a casa completa
            </Link>
            <a href="#contato" className="btn-outline-claro">
              Agendar visita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
