import { casaAtual as casa } from "@/content/casas";

/** Mapa estilizado em tons claros (ilustrativo). Trocar por mapa real estilizado quando houver endereço divulgável. */
function MapaEstilizado() {
  const ruas = [
    "M-20 120 L720 70",
    "M-20 250 L720 215",
    "M-20 390 L720 360",
    "M90 -20 L130 520",
    "M260 -20 L290 520",
    "M440 -20 L455 520",
    "M600 -20 L610 520",
  ];
  const avenida = "M-20 480 C 180 430, 260 300, 420 170 S 640 10, 720 -10";
  const marcadores = [
    { x: 150, y: 150, n: 1 },
    { x: 560, y: 120, n: 2 },
    { x: 640, y: 420, n: 3 },
    { x: 95, y: 420, n: 4 },
  ];
  return (
    <svg viewBox="0 0 700 500" className="h-full w-full" role="img" aria-label="Mapa ilustrativo da região da casa">
      <rect width="700" height="500" fill="#F1EDE5" />
      <path d="M300 240 L430 228 L438 350 L304 362 Z" fill="#E7E2D6" />
      <path d="M140 270 L250 262 L262 380 L150 392 Z" fill="#EAE5DA" />
      {/* ruas e avenida se desenham ao entrar na tela */}
      <g data-draw-once="" fill="none" strokeLinecap="square">
        {ruas.map((d) => (
          <path key={d} d={d} stroke="#FFFFFF" strokeWidth="14" />
        ))}
        <path d={avenida} stroke="#FFFFFF" strokeWidth="22" />
        <path d="M520 520 C 560 420, 640 380, 720 370" stroke="#756B48" strokeOpacity="0.35" strokeWidth="6" />
      </g>

      {marcadores.map((m) => (
        <g key={m.n}>
          <circle cx={m.x} cy={m.y} r="13" fill="#FAF8F4" stroke="#756B48" />
          <text x={m.x} y={m.y + 4.5} textAnchor="middle" className="fill-navy font-sans text-[12px] font-semibold">
            {m.n}
          </text>
        </g>
      ))}

      {/* casa, com pulso lento */}
      <circle cx="350" cy="292" r="22" fill="#07324F" fillOpacity="0.18" className="pulso" />
      <rect x="339" y="281" width="22" height="22" fill="#07324F" />
      <text
        x="350"
        y="262"
        textAnchor="middle"
        className="fill-navy font-sans text-[12px] font-semibold"
        style={{ letterSpacing: "0.16em" }}
      >
        A CASA
      </text>
    </svg>
  );
}

export default function Localizacao() {
  const { localizacao } = casa;
  return (
    <section id="localizacao" aria-labelledby="localizacao-titulo" className="section bg-sand">
      <div className="container-idear grid-12 gap-y-12">
        <div className="col-span-4 md:col-span-12 lg:col-span-7">
          <div className="relative aspect-[7/5] w-full overflow-hidden" data-reveal-image>
            <div className="absolute inset-0" data-reveal-zoom>
              <MapaEstilizado />
            </div>
          </div>
          <p className="mt-4 text-[13px] text-stone">Mapa ilustrativo. O endereço exato é informado no agendamento da visita.</p>
        </div>
        <div className="col-span-4 md:col-span-12 lg:col-span-4 lg:col-start-9">
          <h2 id="localizacao-titulo" data-split className="h2">
            {casa.bairro}, {casa.cidade}.
          </h2>
          <div data-reveal-group>
            <p className="mt-6 text-stone" data-reveal>
              {localizacao.descricao}
            </p>
            <ol className="mt-10" data-reveal>
              {localizacao.pontos.map((p, i) => (
                <li key={p.categoria} className="relative flex items-baseline gap-4 py-4">
                  <span data-line className="absolute inset-x-0 top-0 h-px bg-bronze/30" aria-hidden />
                  <span className="w-5 shrink-0 text-[14px] tabular-nums text-stone">{i + 1}</span>
                  <span className="flex-1">
                    <span className="block text-[14px] font-semibold">{p.categoria}</span>
                    <span className="mt-0.5 block text-[15px] text-stone">{p.nome}</span>
                  </span>
                  <span className="whitespace-nowrap font-serif text-[22px]">{p.tempo}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[13px] text-stone" data-reveal>
              Tempos aproximados de carro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
