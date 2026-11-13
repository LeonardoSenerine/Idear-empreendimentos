import Image from "next/image";
import { empresa } from "@/content/empresa";
import Simbolo from "./Simbolo";

export default function Idear() {
  return (
    <section id="a-idear" aria-labelledby="idear-titulo" className="relative overflow-hidden bg-navy-deep text-ivory" data-draw-trigger>
      {/* Foto de fundo com parallax */}
      <div className="absolute inset-x-0 -top-[10%] h-[120%]" data-img-parallax aria-hidden>
        <Image src="/images/casa/fachada-perspectiva.webp" alt="" fill sizes="100vw" className="object-cover opacity-40" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/80 to-navy-deep" aria-hidden />

      <div className="container-idear relative py-24 lg:py-40">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-4 lg:col-span-3">
            <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-bronze-light">
              <span className="h-px w-10 bg-bronze-light" aria-hidden />
              <span id="idear-titulo">A Idear</span>
            </p>
            <Simbolo draw className="mt-12 hidden h-56 w-auto text-bronze-light md:block lg:h-72" strokeWidth={1.25} />
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-9">
            <p data-words-scrub className="statement">
              {empresa.manifesto}
            </p>
          </div>
        </div>

        {/* Números */}
        <dl className="mt-20 grid grid-cols-2 gap-y-10 lg:mt-28 lg:grid-cols-4">
          {empresa.numeros.map((n, i) => (
            <div key={n.rotulo} className={`relative flex flex-col-reverse pt-6 ${i % 2 ? "pl-6" : "pr-6"} lg:px-8 lg:first:pl-0`}>
              <span data-line className="absolute inset-x-0 top-0 h-px bg-bronze-light/40" aria-hidden />
              <dt className="mt-2 text-[14px] text-ivory/70">{n.rotulo}</dt>
              <dd className="flex items-baseline font-serif leading-none">
                <span className="text-[56px] md:text-[88px]" data-count={n.valor}>
                  {n.valor.toLocaleString("pt-BR")}
                </span>
                <span className="text-[24px] text-bronze-light md:text-[36px]">{n.sufixo}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Valores */}
        <div className="mt-28 lg:mt-40">
          <h2 data-split className="h2 max-w-[16ch]">
            No que a Idear acredita.
          </h2>
          <ol className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {empresa.valores.map((v, i) => (
              <li key={v.titulo} className="relative pt-8" data-reveal>
                <span data-line className="absolute inset-x-0 top-0 h-px bg-ivory/25" aria-hidden />
                <span className="font-serif text-[20px] italic text-bronze-light">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-serif text-[30px] leading-tight">{v.titulo}</h3>
                <p className="mt-4 text-[15px] text-ivory/70">{v.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
