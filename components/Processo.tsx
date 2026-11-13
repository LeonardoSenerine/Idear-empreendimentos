import Image from "next/image";
import { empresa } from "@/content/empresa";

const GARANTIAS = [
  { titulo: "Solidez", texto: "Garantia de solidez e segurança da construção por 5 anos, conforme o Código Civil." },
  { titulo: "Manual", texto: "Manual de uso, operação e manutenção do imóvel, conforme a NBR 14037." },
  { titulo: "Documentação", texto: "Habite-se e documentação do imóvel regularizada na entrega." },
  { titulo: "Responsável técnico", texto: "ART ou RRT registrada para projeto e obra." },
];

export default function Processo() {
  const etapas = empresa.processo;
  return (
    <section id="processo" aria-labelledby="processo-titulo" className="relative bg-sand">
      <div className="container-idear pt-20 lg:pt-40">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="processo-titulo" data-split className="h2 max-w-[16ch]">
            Do terreno à entrega das chaves.
          </h2>
          <p className="max-w-[36ch] text-stone md:text-right">
            Projeto, obra e entrega sob uma única responsabilidade. Quatro etapas, uma equipe só.
          </p>
        </div>
      </div>

      <div className="container-idear grid-12 pb-10" data-steps>
        {/* Foto fixa que troca conforme a etapa ativa (desktop) */}
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-0 flex h-[100svh] items-center">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy">
              {etapas.map((e, i) => (
                <div key={e.titulo} data-step-img={i} className={`absolute inset-0 ${i === 0 ? "is-active" : ""}`}>
                  <Image quality={90} src={e.imagem} alt="" fill sizes="45vw" className="object-cover" />
                </div>
              ))}
              <span className="legenda-ilustrativa">Imagem ilustrativa</span>
            </div>
          </div>
        </div>

        <ol className="relative col-span-4 mt-14 md:col-span-12 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:py-[20svh]">
          <span className="absolute bottom-0 left-0 top-0 w-px bg-navy/15 lg:bottom-[20svh] lg:top-[20svh]" aria-hidden>
            <span data-progress-y className="absolute inset-0 origin-top bg-navy" />
          </span>
          {etapas.map((e, i) => (
            <li
              key={e.titulo}
              data-step
              data-step-index={i}
              className="flex flex-col justify-center py-8 pl-6 md:pl-12 lg:min-h-[60svh] lg:py-10"
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-bronze-dark">
                Etapa {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="display mt-3 text-[44px] md:text-[80px] lg:mt-4">{e.titulo}</h3>
              <p className="mt-3 text-[15px] font-semibold text-bronze-dark">{e.prazo}</p>
              <p className="mt-5 max-w-[40ch] text-stone">{e.texto}</p>
              {/* No celular, cada etapa mostra a própria foto */}
              <div className="relative mt-6 aspect-[16/9] overflow-hidden lg:hidden" data-reveal-image>
                <div className="absolute inset-0" data-reveal-zoom>
                  <Image quality={90} src={e.imagem} alt="" fill sizes="100vw" className="object-cover" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Garantias */}
      <div className="container-idear pb-20 lg:pb-40">
        <p className="font-serif text-[28px] md:text-[34px]">O que acompanha cada casa.</p>
        <ul className="mt-10 grid gap-x-8 md:grid-cols-2 lg:grid-cols-4" data-reveal-group>
          {GARANTIAS.map((g) => (
            <li key={g.titulo} className="relative pb-8 pt-6" data-reveal>
              <span data-line className="absolute inset-x-0 top-0 h-px bg-navy/40" aria-hidden />
              <p className="text-[15px] font-semibold">{g.titulo}</p>
              <p className="mt-2 text-[15px] text-stone">{g.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
