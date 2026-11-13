import Image from "next/image";
import { empresa } from "@/content/empresa";
import { casaAtual } from "@/content/casas";

export default function CasasEntregues() {
  const entregas = [...empresa.entregas].sort((a, b) => Number(a.ano) - Number(b.ano));
  return (
    <section id="casas-entregues" aria-labelledby="entregues-titulo" className="section bg-ivory">
      <div className="container-idear">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="entregues-titulo" data-split className="h2">
            Casas entregues
          </h2>
          <p className="max-w-[36ch] text-stone md:text-right">
            Cada casa da Idear tem nome, endereço e data de entrega. Esta é a próxima.
          </p>
        </div>

        {/* Linha do tempo */}
        <ol className="relative mt-16 grid grid-cols-2 gap-y-8 md:grid-cols-4" aria-label="Linha do tempo das entregas">
          <span data-line className="absolute inset-x-0 top-[7px] h-px bg-navy/25" aria-hidden />
          {entregas.map((c) => (
            <li key={c.slug} className="relative pt-8">
              <span className="absolute left-0 top-0 h-[15px] w-[15px] rounded-full border border-navy bg-ivory" aria-hidden />
              <p className="font-serif text-[40px] leading-none md:text-[56px]">{c.ano}</p>
              <p className="mt-2 text-[15px] font-semibold">{c.nome}</p>
              <p className="text-[14px] text-stone">{c.area} m² · entregue</p>
            </li>
          ))}
          <li className="relative pt-8">
            <span className="absolute left-0 top-0 h-[15px] w-[15px] rounded-full bg-bronze ring-4 ring-bronze/25" aria-hidden />
            <p className="font-serif text-[40px] leading-none text-bronze-dark md:text-[56px]">Agora</p>
            <p className="mt-2 text-[15px] font-semibold">Casa {casaAtual.nome}</p>
            <p className="text-[14px] text-stone">{casaAtual.resumo.area} m² · à venda</p>
          </li>
        </ol>

        {/* Cada casa em destaque */}
        <ul className="mt-24 space-y-24 lg:mt-32 lg:space-y-40">
          {[...entregas].reverse().map((c, i) => (
            <li key={c.slug} className="grid-12 items-center gap-y-8">
              <div className={`col-span-4 md:col-span-12 lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}>
                <div className="group relative aspect-[4/3] overflow-hidden bg-sand" data-reveal-image>
                  <div className="absolute inset-0" data-reveal-zoom>
                    <div className="absolute inset-x-0 -top-[7%] h-[114%]" data-img-parallax>
                      <Image
                        src={c.imagem}
                        alt={c.alt}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover transition-transform duration-[1600ms] ease-idear group-hover:scale-[1.05]"
                      />
                    </div>
                  </div>
                  <span className="legenda-ilustrativa">Imagem ilustrativa</span>
                </div>
              </div>
              <div
                className={`col-span-4 md:col-span-12 lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}
                data-reveal-group
              >
                <p className="font-serif text-[20px] italic text-bronze-dark" data-reveal>
                  Entregue em {c.ano}
                </p>
                <h3 className="mt-3 font-serif text-[40px] leading-tight md:text-[52px]" data-reveal>
                  {c.nome}
                </h3>
                <p className="mt-2 text-stone" data-reveal>
                  {c.bairro}, {c.cidade}
                </p>
                <p className="mt-6 max-w-[38ch]" data-reveal>
                  {c.descricao}
                </p>
                <dl className="mt-8 flex gap-10" data-reveal>
                  <div className="flex flex-col-reverse">
                    <dt className="text-[13px] text-stone">área construída</dt>
                    <dd className="font-serif text-[36px] leading-none">
                      {c.area}
                      <span className="ml-1 text-[18px] text-stone">m²</span>
                    </dd>
                  </div>
                  <div className="flex flex-col-reverse">
                    <dt className="text-[13px] text-stone">suítes</dt>
                    <dd className="font-serif text-[36px] leading-none">{c.suites}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
        {empresa.provisorio ? (
          <p className="mt-16 text-[13px] text-stone">
            Casas, anos e metragens de exemplo para a prévia. Serão substituídos pelas casas entregues pela Idear, com
            fotos reais.
          </p>
        ) : null}
      </div>
    </section>
  );
}
