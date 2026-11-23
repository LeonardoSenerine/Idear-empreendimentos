import Image from "next/image";
import { empresa } from "@/content/empresa";
import Simbolo from "./Simbolo";

export default function Idear() {
  return (
    <section id="a-idear" aria-labelledby="idear-titulo" className="relative bg-ivory" data-draw-trigger>
      <div className="container-idear pt-20 lg:pt-36">
        <div className="grid-12 gap-y-8">
          <div className="col-span-4 md:col-span-12 lg:col-span-5">
            <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-bronze-dark md:text-[13px]">
              A Idear
            </p>
            <h2 id="idear-titulo" data-split className="h2 mt-6 max-w-[12ch]">
              Uma casa por vez, do começo ao fim.
            </h2>
            <Simbolo draw className="mt-10 hidden h-40 w-auto text-bronze lg:block" strokeWidth={1.25} />
          </div>
          <div className="col-span-4 md:col-span-12 lg:col-span-7 lg:pt-14">
            <p data-words-scrub className="font-serif text-[26px] leading-[1.3] md:text-[36px] lg:text-[42px]">
              {empresa.manifesto}
            </p>
          </div>
        </div>
      </div>

      {/* Foto larga com os números por cima no desktop */}
      <div className="container-idear mt-14 lg:mt-24">
        <div className="relative aspect-[4/3] overflow-hidden bg-sand md:aspect-[21/9]" data-reveal-image>
          <div className="absolute inset-0" data-reveal-zoom>
            <div className="absolute inset-x-0 -top-[7%] h-[114%]" data-img-parallax>
              <Image quality={90}
                src="/images/casa/fachada-perspectiva.webp"
                alt="Fachada da casa da Idear à venda no Ecologie Residencial, com volumes brancos e revestimento metálico"
                fill
                sizes="(min-width: 1328px) 1280px, 100vw"
                className="object-cover object-[50%_40%]"
              />
            </div>
          </div>
          <span className="legenda-ilustrativa">Imagem ilustrativa</span>
        </div>

        {empresa.numeros.length ? (
        <dl className="grid grid-cols-2 gap-y-8 pt-10 lg:grid-cols-4 lg:pt-14">
          {empresa.numeros.map((n, i) => (
            <div key={n.rotulo} className={`relative flex flex-col-reverse justify-end pt-5 ${i % 2 ? "pl-5" : "pr-5"} lg:px-8 lg:first:pl-0`}>
              <span data-line className="absolute inset-x-0 top-0 h-px bg-navy/25" aria-hidden />
              <dt className="mt-2 text-[14px] text-stone">{n.rotulo}</dt>
              <dd className="flex items-baseline font-serif leading-none text-navy">
                <span className="text-[52px] md:text-[80px]" data-count={n.valor}>
                  {n.valor.toLocaleString("pt-BR")}
                </span>
                <span className="text-[22px] text-bronze-dark md:text-[32px]">{n.sufixo}</span>
              </dd>
            </div>
          ))}
        </dl>
        ) : null}
      </div>

      {/* Valores em faixa azul-marinho */}
      <div className="mt-20 bg-navy py-20 text-ivory lg:mt-32 lg:py-28">
        <div className="container-idear">
          <h3 data-split className="h2 max-w-[16ch]">
            No que a Idear acredita.
          </h3>
          <ol
            className="sem-scrollbar -mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 md:overflow-visible md:px-0 lg:grid-cols-4"
            data-reveal-group
          >
            {empresa.valores.map((v, i) => (
              <li
                key={v.titulo}
                className="relative w-[78vw] shrink-0 snap-start border border-ivory/15 p-6 md:w-auto md:border-0 md:p-0 md:pt-8"
                data-reveal
              >
                <span data-line className="absolute inset-x-0 top-0 hidden h-px bg-ivory/25 md:block" aria-hidden />
                <span className="font-serif text-[20px] italic text-bronze-light">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="mt-4 font-serif text-[28px] leading-tight md:text-[30px]">{v.titulo}</h4>
                <p className="mt-4 text-[15px] text-ivory/70">{v.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
