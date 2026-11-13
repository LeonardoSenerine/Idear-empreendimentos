import { casasEntregues } from "@/content/casas";
import Foto from "./Foto";

export default function CasasEntregues() {
  return (
    <section id="casas-entregues" aria-labelledby="entregues-titulo" className="section bg-sand">
      <div className="container-idear">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="entregues-titulo" data-split className="h2">
            Casas entregues
          </h2>
          <p className="max-w-[36ch] text-stone md:text-right">Ano, bairro e metragem de cada casa que a Idear construiu.</p>
        </div>

        <ul className="mt-14 grid gap-y-14 md:grid-cols-2 md:gap-x-8">
          {casasEntregues.map((c, i) => (
            <li key={c.slug} className={i % 2 ? "md:mt-24" : ""}>
              <article className="group" data-reveal-group>
                <Foto
                  imagem={c.imagem}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  parallax
                  hover
                  className="aspect-[4/5] w-full"
                  rotuloEspera="Foto da casa entregue"
                />
                <div className="relative mt-6 flex items-start justify-between gap-6 pb-6" data-reveal>
                  <div>
                    <h3 className="h3">{c.nome}</h3>
                    <p className="mt-2 text-[15px] text-stone">
                      {c.bairro}, {c.cidade}
                    </p>
                  </div>
                  <p className="shrink-0 text-right text-[15px]">
                    <span className="block font-semibold">{c.ano}</span>
                    <span className="block text-stone">{c.area}</span>
                  </p>
                  <span data-line className="absolute inset-x-0 bottom-0 h-px bg-navy/30" aria-hidden />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
