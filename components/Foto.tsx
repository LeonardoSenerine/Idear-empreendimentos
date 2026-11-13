import Image from "next/image";
import type { Imagem } from "@/content/casas";
import Simbolo from "./Simbolo";

type Props = {
  imagem: Imagem;
  sizes: string;
  /** classes do contêiner (defina a proporção aqui, ex.: aspect-[4/5]) */
  className?: string;
  priority?: boolean;
  /** revela de baixo para cima ao entrar na tela */
  reveal?: boolean;
  /** imagem desliza devagar dentro da moldura durante a rolagem */
  parallax?: boolean;
  /** zoom lento no hover (use dentro de um elemento .group) */
  hover?: boolean;
  rotuloEspera?: string;
  objectPosition?: string;
  /** esconde o selo "Imagem ilustrativa" (use só quando o aviso estiver no próprio bloco) */
  semLegenda?: boolean;
};

/**
 * Foto com legenda "Imagem ilustrativa" quando não for foto real.
 * Sem `src`, mostra uma moldura de espera (material ainda não recebido).
 */
export default function Foto({
  imagem,
  sizes,
  className = "",
  priority = false,
  reveal = true,
  parallax = false,
  hover = false,
  rotuloEspera,
  objectPosition,
  semLegenda = false,
}: Props) {
  if (!imagem.src) {
    return (
      <div className={`relative overflow-hidden bg-sand ${className}`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center md:gap-4">
          <Simbolo className="h-10 w-auto text-bronze/50 md:h-14" strokeWidth={1} />
          <p className="text-[13px] font-semibold text-stone">{rotuloEspera ?? imagem.alt}</p>
          <p className="text-[12px] text-stone md:text-[13px]">Imagem a receber</p>
        </div>
        <div className="pointer-events-none absolute inset-3 border border-line" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-sand ${className}`} data-reveal-image={reveal ? "" : undefined}>
      <div className="absolute inset-0" data-reveal-zoom>
        <div
          className={`absolute inset-x-0 ${parallax ? "-top-[7%] h-[114%]" : "inset-y-0"}`}
          data-img-parallax={parallax ? "" : undefined}
        >
          <Image
            src={imagem.src}
            alt={imagem.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover ${
              hover ? "transition-transform duration-[1400ms] ease-idear group-hover:scale-[1.04]" : ""
            }`}
            style={objectPosition ? { objectPosition } : undefined}
          />
        </div>
      </div>
      {imagem.ilustrativa && !semLegenda ? <span className="legenda-ilustrativa">Imagem ilustrativa</span> : null}
    </div>
  );
}
