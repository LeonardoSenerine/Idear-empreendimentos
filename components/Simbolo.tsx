/**
 * Símbolo da Idear (as linhas da casa) redesenhado como linhas de centro,
 * para virar elemento gráfico e se desenhar com o scroll (stroke-dashoffset).
 * Coordenadas no mesmo sistema do recorte do logo original (416 × 570).
 */
export const SIMBOLO_PATHS = [
  // pilar central
  "M218 8 V378",
  // parallelogramo superior esquerdo
  "M218 26 L23 121 V206 L218 112",
  // painel esquerdo, base frontal, painel direito
  "M218 186 L23 281 V438 L213 540 L393 460 V19 L218 98",
  // piso (arestas do fundo)
  "M23 438 L218 378 L393 460",
];

type Props = {
  className?: string;
  strokeWidth?: number;
  draw?: boolean;
  title?: string;
};

export default function Simbolo({ className, strokeWidth = 2, draw = false, title }: Props) {
  return (
    <svg
      viewBox="0 0 416 570"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="miter"
      vectorEffect="non-scaling-stroke"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      data-draw={draw ? "" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {SIMBOLO_PATHS.map((d) => (
        <path key={d} d={d} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
