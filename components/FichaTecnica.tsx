import { casaAtual as casa } from "@/content/casas";
import { linkWhatsApp } from "@/lib/site";
import Foto from "./Foto";

export default function FichaTecnica() {
  return (
    <section id="ficha-tecnica" aria-labelledby="ficha-titulo" className="section bg-sand">
      <div className="container-idear grid-12 gap-y-14">
        {/* Coluna fixa: título e imagem da entrada */}
        <div className="col-span-4 md:col-span-5 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="ficha-titulo" data-split className="h2">
              Ficha técnica
            </h2>
            {casa.provisorio ? (
              <p className="mt-4 text-[14px] text-stone">Valores provisórios, a confirmar com o projeto final.</p>
            ) : null}
            <Foto
              imagem={casa.imagemVertical}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 100vw"
              parallax
              className="mt-10 hidden aspect-[3/4] w-full md:block"
            />
          </div>
        </div>

        {/* Linhas da ficha, como num memorial: rótulo à esquerda, número grande à direita */}
        <div className="col-span-4 md:col-span-7 lg:col-span-7 lg:col-start-6">
          <dl>
            {casa.ficha.map((dado) => (
              <div key={dado.rotulo} className="relative flex items-baseline justify-between gap-6 py-6 md:py-8">
                <span data-line className="absolute inset-x-0 top-0 h-px bg-bronze/35" aria-hidden />
                <dt className="text-[15px] text-stone">{dado.rotulo}</dt>
                <dd className="flex items-baseline gap-2 text-right font-serif text-bronze-dark">
                  {typeof dado.valor === "number" ? (
                    <>
                      <span
                        className="text-[56px] leading-[0.9] tabular-nums md:text-[84px]"
                        data-count={Number.isInteger(dado.valor) ? dado.valor : dado.valor.toFixed(2)}
                      >
                        {dado.valor.toLocaleString("pt-BR", Number.isInteger(dado.valor) ? undefined : { minimumFractionDigits: 2 })}
                      </span>
                      {dado.unidade ? <span className="text-[22px] md:text-[30px]">{dado.unidade}</span> : null}
                    </>
                  ) : (
                    <span className="text-[30px] leading-none md:text-[44px]">{dado.valor}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="relative py-8 md:py-10">
              <span data-line className="absolute inset-x-0 top-0 h-px bg-navy" aria-hidden />
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[15px] text-stone">Valor</p>
                  <p className="mt-2 font-serif text-[44px] leading-none md:text-[60px]">{casa.preco}</p>
                </div>
                <div className="flex gap-3" data-reveal-group>
                  <a href="#agendar" className="btn-primary flex-1 md:flex-none" data-reveal>
                    Agendar visita
                  </a>
                  <a
                    href={linkWhatsApp("Olá, gostaria de receber valores e condições da casa à venda.")}
                    target="_blank"
                    rel="noopener"
                    className="btn-outline flex-1 md:flex-none"
                    data-reveal
                  >
                    Solicitar valores
                  </a>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
