import { casaAtual as casa } from "@/content/casas";

/** Faixa em bronze que corre devagar com os pontos altos da casa (pausa no hover). */
export default function FaixaDestaques() {
  const itens = [...casa.faixa, ...casa.faixa]; // duplicado para o loop não ter emenda
  return (
    <div className="faixa relative overflow-hidden bg-bronze-dark py-5 text-ivory md:py-6" aria-label="Destaques da casa">
      <ul className="faixa-corre flex w-max items-center" aria-hidden>
        {itens.map((t, i) => (
          <li key={i} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap px-6 font-serif text-[22px] italic md:px-8 md:text-[28px]">{t}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-ivory/60" />
          </li>
        ))}
      </ul>
      <p className="sr-only">{casa.faixa.join(", ")}</p>
    </div>
  );
}
