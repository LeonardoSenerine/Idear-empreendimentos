import Image from "next/image";

type Props = { variante?: "cor" | "clara"; className?: string };

/** Logo horizontal para o cabeçalho: símbolo + lettering "idear". */
export function LogoHorizontal({ variante = "cor", className = "" }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image src={`/brand/simbolo-${variante}.png`} alt="" width={416} height={570} className="h-9 w-auto md:h-10" priority />
      <Image
        src={`/brand/idear-${variante}.png`}
        alt="Idear Empreendimentos"
        width={738}
        height={250}
        className="h-[22px] w-auto md:h-6"
        priority
      />
    </span>
  );
}

/** Logo empilhado (símbolo + idear + empreendimentos), usado no rodapé. */
export function LogoEmpilhado({ variante = "clara", className = "" }: Props) {
  return (
    <span className={`inline-flex flex-col items-start gap-5 ${className}`}>
      <Image src={`/brand/simbolo-${variante}.png`} alt="" width={416} height={570} className="h-16 w-auto" />
      <Image
        src={`/brand/lettering-${variante}.png`}
        alt="Idear Empreendimentos"
        width={780}
        height={346}
        className="h-14 w-auto"
      />
    </span>
  );
}
