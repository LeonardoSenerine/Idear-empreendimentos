import Simbolo from "./Simbolo";

const ETAPAS = [
  {
    titulo: "Terreno",
    texto: "Escolhemos o terreno pela rua, pela orientação solar e pela vizinhança.",
  },
  {
    titulo: "Projeto",
    texto: "Desenvolvemos o projeto com arquiteto e engenheiros, com memorial descritivo de cada material.",
  },
  {
    titulo: "Obra",
    texto: "Conduzimos a obra sob responsabilidade técnica, com acompanhamento em todas as etapas.",
  },
  {
    titulo: "Entrega",
    texto: "Entregamos a casa pronta para morar, com habite-se e manual do proprietário.",
  },
];

const GARANTIAS = [
  { titulo: "Solidez", texto: "Garantia de solidez e segurança da construção por 5 anos, conforme o Código Civil." },
  { titulo: "Manual", texto: "Manual de uso, operação e manutenção do imóvel, conforme a NBR 14037." },
  { titulo: "Documentação", texto: "Habite-se e documentação do imóvel regularizada na entrega." },
  { titulo: "Responsável técnico", texto: "ART ou RRT registrada para projeto e obra." },
];

export default function Processo() {
  return (
    <section id="a-idear" aria-labelledby="processo-titulo" className="relative bg-ivory" data-draw-trigger>
      <div className="container-idear grid-12 pt-24 lg:pt-0">
        {/* Lado fixo: símbolo que se desenha com a rolagem e o título */}
        <div className="col-span-4 md:col-span-12 lg:col-span-5">
          <div className="flex flex-col justify-center gap-10 lg:sticky lg:top-0 lg:h-[100svh]">
            <Simbolo draw className="h-40 w-auto self-start text-bronze md:h-64 lg:h-72" strokeWidth={1.5} />
            <h2 id="processo-titulo" data-split className="h2 max-w-[14ch]">
              Projeto, obra e entrega sob uma única responsabilidade.
            </h2>
          </div>
        </div>

        {/* Etapas que acendem ao passar pelo centro da tela */}
        <ol className="relative col-span-4 mt-14 md:col-span-12 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:py-[22svh]">
          <span className="absolute bottom-0 left-0 top-0 w-px bg-line lg:bottom-[22svh] lg:top-[22svh]" aria-hidden>
            <span data-progress-y className="absolute inset-0 origin-top bg-navy" />
          </span>
          {ETAPAS.map((e, i) => (
            <li key={e.titulo} data-step className="flex min-h-[38svh] flex-col justify-center py-10 pl-8 md:pl-12 lg:min-h-[56svh]">
              <span className="text-[14px] tabular-nums text-bronze-dark">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-4 text-[48px] md:text-[72px]">{e.titulo}</h3>
              <p className="mt-5 max-w-[40ch] text-stone">{e.texto}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Garantias */}
      <div className="container-idear pb-24 pt-10 lg:pb-40">
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
