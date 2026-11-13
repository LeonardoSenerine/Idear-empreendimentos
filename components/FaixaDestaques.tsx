/** Faixa em bronze que corre devagar (pausa no hover). */
export default function FaixaDestaques({ itens, rotulo }: { itens: string[]; rotulo: string }) {
  const duplicados = [...itens, ...itens]; // duplicado para o loop não ter emenda
  return (
    <div className="faixa relative overflow-hidden bg-bronze-dark py-4 text-ivory md:py-6" aria-label={rotulo}>
      <ul className="faixa-corre flex w-max items-center" aria-hidden>
        {duplicados.map((t, i) => (
          <li key={i} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap px-5 font-serif text-[20px] italic md:px-8 md:text-[28px]">{t}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-ivory/60" />
          </li>
        ))}
      </ul>
      <p className="sr-only">{itens.join(", ")}</p>
    </div>
  );
}
