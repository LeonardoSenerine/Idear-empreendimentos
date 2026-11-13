import type { Pavimento } from "@/content/casas";

/**
 * Planta ilustrativa em linhas navy, usada só na prévia até chegar a planta do arquiteto.
 * Medidas em metros (1 m = 40 unidades). Frente da casa (rua) embaixo.
 */
type Comodo = { nome?: string; x: number; y: number; w: number; h: number; rotulo?: string };

const M = 40;

const TERREO: Comodo[] = [
  { nome: "Área gourmet", x: 0, y: 0, w: 12, h: 2.5 },
  { nome: "Serviço", x: 0, y: 2.5, w: 4.4, h: 2.5 },
  { nome: "Cozinha", x: 0, y: 5, w: 4.4, h: 4.6 },
  { nome: "Estar e jantar", x: 4.4, y: 2.5, w: 7.6, h: 7.1 },
  { nome: "Garagem coberta", x: 0, y: 9.6, w: 6.5, h: 6.4 },
  { nome: "Hall de entrada", x: 6.5, y: 9.6, w: 3, h: 6.4 },
  { nome: "Lavabo", x: 9.5, y: 12.4, w: 2.5, h: 1.6 },
];

const SUPERIOR: Comodo[] = [
  { nome: "Suíte 3", x: 0, y: 2.5, w: 4.5, h: 4 },
  { rotulo: "Banho", x: 0, y: 6.5, w: 4.5, h: 3.1 },
  { nome: "Sala íntima", x: 4.5, y: 2.5, w: 3, h: 5.3 },
  { nome: "Suíte 4", x: 7.5, y: 2.5, w: 4.5, h: 4 },
  { rotulo: "Banho", x: 7.5, y: 6.5, w: 4.5, h: 3.1 },
  { nome: "Suíte principal com closet", x: 0, y: 9.6, w: 6.5, h: 6.4 },
  { nome: "Suíte 2", x: 6.5, y: 12.4, w: 5.5, h: 3.6 },
  { nome: "Varanda", x: 0, y: 16, w: 6.5, h: 1.4 },
];

const ESCADA = { x: 9.5, y: 9.6, w: 2.5, h: 2.8 };

export default function PlantaIlustrativa({ pavimento }: { pavimento: Pavimento }) {
  const comodos = pavimento.id === "terreo" ? TERREO : SUPERIOR;
  const topo = pavimento.id === "terreo" ? 0 : 2.5;
  const numero = (nome?: string) => (nome ? pavimento.ambientes.findIndex((a) => a.nome === nome) + 1 : 0);

  return (
    <svg
      viewBox={`-40 -40 ${12 * M + 80} ${18.6 * M + 40}`}
      className="h-auto w-full text-navy"
      role="img"
      aria-label={`Planta ilustrativa do pavimento ${pavimento.nome.toLowerCase()}`}
    >
      {/* Contorno do lote construído */}
      <g fill="none" stroke="currentColor">
        {comodos.map((c, i) => (
          <rect
            key={i}
            x={c.x * M}
            y={c.y * M}
            width={c.w * M}
            height={c.h * M}
            strokeWidth={1.25}
            strokeDasharray={c.nome === "Varanda" || c.nome === "Área gourmet" ? "6 5" : undefined}
          />
        ))}
        <rect
          x={0}
          y={topo * M}
          width={12 * M}
          height={(16 - topo) * M}
          strokeWidth={5}
          vectorEffect="non-scaling-stroke"
        />
        {/* Escada */}
        <rect x={ESCADA.x * M} y={ESCADA.y * M} width={ESCADA.w * M} height={ESCADA.h * M} strokeWidth={1.25} />
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={i}
            x1={ESCADA.x * M}
            x2={(ESCADA.x + ESCADA.w) * M}
            y1={(ESCADA.y + (ESCADA.h / 10) * (i + 1)) * M}
            y2={(ESCADA.y + (ESCADA.h / 10) * (i + 1)) * M}
            strokeWidth={0.75}
          />
        ))}
      </g>

      {/* Numeração dos ambientes (ver legenda) */}
      {comodos.map((c, i) => {
        const cx = (c.x + c.w / 2) * M;
        const cy = (c.y + c.h / 2) * M;
        const n = numero(c.nome);
        if (c.rotulo) {
          return (
            <text key={i} x={cx} y={cy + 4} textAnchor="middle" className="fill-stone font-sans text-[12px]">
              {c.rotulo}
            </text>
          );
        }
        if (!n) return null;
        return (
          <g key={i}>
            <rect x={cx - 15} y={cy - 15} width={30} height={30} className="fill-ivory" stroke="#756B48" strokeWidth={1} />
            <text x={cx} y={cy + 5} textAnchor="middle" className="fill-navy font-sans text-[14px] font-semibold">
              {n}
            </text>
          </g>
        );
      })}

      {/* Rua e escala */}
      <g className="fill-stone font-sans text-[12px]" style={{ letterSpacing: "0.2em" }}>
        <text x={12 * M} y={18.6 * M - 12} textAnchor="end">
          RUA
        </text>
      </g>
      <g stroke="#756B48" strokeWidth={1}>
        <line x1={0} x2={5 * M} y1={18.6 * M - 22} y2={18.6 * M - 22} />
        <line x1={0} x2={0} y1={18.6 * M - 28} y2={18.6 * M - 16} />
        <line x1={M} x2={M} y1={18.6 * M - 26} y2={18.6 * M - 18} />
        <line x1={5 * M} x2={5 * M} y1={18.6 * M - 28} y2={18.6 * M - 16} />
      </g>
      <text x={5 * M + 10} y={18.6 * M - 18} className="fill-stone font-sans text-[12px]">
        5 m
      </text>
    </svg>
  );
}
