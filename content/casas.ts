/**
 * Conteúdo das casas da Idear.
 *
 * Com uma casa à venda por vez, o conteúdo fica no próprio projeto (sem CMS).
 * Quando a casa atual for vendida: mova-a para `casasEntregues` e preencha
 * `casaAtual` com a próxima.
 *
 * PRÉVIA: tudo entre colchetes e os valores marcados com `provisorio` são
 * provisórios e precisam ser confirmados com o cliente antes de ir ao ar.
 */

export type Imagem = {
  src: string | null; // null = imagem ainda não recebida (mostra moldura de espera)
  alt: string;
  /** true quando for render ou imagem de referência: exibe "Imagem ilustrativa" */
  ilustrativa: boolean;
  largura?: number;
  altura?: number;
};

export type DadoFicha = {
  rotulo: string;
  valor: number | string;
  unidade?: string;
};

export type Ambiente = { nome: string; area: number };

export type Pavimento = {
  id: "terreo" | "superior";
  nome: string;
  planta: string | null; // SVG/imagem da planta limpa em navy; null = planta ilustrativa
  ambientes: Ambiente[];
};

export type Acabamento = { item: string; material: string; imagem: Imagem };

export type PontoProximo = { categoria: string; nome: string; tempo: string };

export type CasaAtual = {
  slug: string;
  nome: string;
  bairro: string;
  cidade: string;
  uf: string;
  provisorio: boolean;
  titulo: string;
  resumo: { area: number; suites: number; vagas: number };
  apresentacao: [string, string];
  ficha: DadoFicha[];
  preco: string;
  hero: {
    poster: Imagem;
    /** Loop DepthFlow: 16:9 no desktop, quadrado no celular */
    video: { mp4: string; webm: string; mp4Mobile?: string; webmMobile?: string } | null;
  };
  imagemVertical: Imagem;
  /** Imagem que se abre até a largura total na seção "A casa" */
  imagemAmpla: Imagem & { src: string };
  /** Todas as imagens da casa, na ordem de um percurso. `faixa: true` aparece na galeria horizontal; as demais só em "ver todas". */
  galeria: (Imagem & { src: string; legenda: string; largura: number; altura: number; faixa?: boolean })[];
  /** Ambientes cujas imagens ainda não chegaram (aparecem como uma linha de texto ao fim da galeria) */
  imagensPendentes: string[];
  pavimentos: Pavimento[];
  acabamentos: Acabamento[];
  localizacao: { descricao: string; pontos: PontoProximo[] };
};

export type CasaEntregue = {
  slug: string;
  nome: string;
  bairro: string;
  cidade: string;
  ano: string;
  area: string;
  imagem: Imagem;
};

const BASE = "/images/casa";

export const casaAtual: CasaAtual = {
  slug: "casa-atual",
  nome: "[Nome]",
  bairro: "[Bairro]",
  cidade: "[Cidade]",
  uf: "SP",
  provisorio: true,
  titulo: "Luz natural, espaço e acabamento de alto padrão.",
  resumo: { area: 320, suites: 4, vagas: 4 },
  apresentacao: [
    "Uma casa por vez. Na Idear, cada imóvel é acompanhado do terreno à entrega das chaves.",
    "Estar com pé-direito duplo, cozinha e jantar integrados, área gourmet com churrasqueira voltada para a piscina e quatro suítes no pavimento superior.",
  ],
  ficha: [
    { rotulo: "Área construída", valor: 320, unidade: "m²" },
    { rotulo: "Terreno", valor: 360, unidade: "m²" },
    { rotulo: "Suítes", valor: 4 },
    { rotulo: "Vagas", valor: 4 },
    { rotulo: "Pavimentos", valor: 2 },
    { rotulo: "Previsão de entrega", valor: "[Mês/Ano]" },
  ],
  preco: "Sob consulta",
  hero: {
    poster: {
      src: `${BASE}/fachada-frontal.webp`,
      alt: "Fachada frontal da casa, com volume branco, pilar em revestimento metálico, porta pivotante de madeira e escada iluminada no jardim",
      ilustrativa: true,
      largura: 1600,
      altura: 1600,
    },
    // Loop DepthFlow de 10 s gerado do render (ver tools/depthflow/README.md)
    video: {
      mp4: "/video/fachada-desktop.mp4",
      webm: "/video/fachada-desktop.webm",
      mp4Mobile: "/video/fachada-mobile.mp4",
      webmMobile: "/video/fachada-mobile.webm",
    },
  },
  imagemVertical: {
    src: `${BASE}/closet.webp`,
    alt: "Closet da suíte principal com portas em vidro canelado e penteadeira com espelho em arco",
    ilustrativa: true,
    largura: 1280,
    altura: 1600,
  },
  imagemAmpla: {
    src: `${BASE}/piscina.webp`,
    alt: "Piscina com deck de madeira, jardim e área gourmet sob pergolado em revestimento metálico",
    ilustrativa: true,
    largura: 1600,
    altura: 1600,
  },
  galeria: [
    { src: `${BASE}/fachada-perspectiva.webp`, legenda: "Fachada", largura: 1600, altura: 1600, ilustrativa: true,
      alt: "Vista em perspectiva da fachada, garagem coberta e jardim em declive com escada iluminada" },
    { src: `${BASE}/gourmet-mesa.webp`, legenda: "Área gourmet", largura: 1600, altura: 1600, ilustrativa: true, faixa: true,
      alt: "Área gourmet sob pergolado em revestimento metálico, mesa de madeira com cadeiras de palhinha e luminárias de fibra" },
    { src: `${BASE}/gourmet-churrasqueira.webp`, legenda: "Churrasqueira e ilha", largura: 1600, altura: 1600, ilustrativa: true, faixa: true,
      alt: "Cozinha gourmet com churrasqueira, ilha revestida em cerâmica e banquetas de madeira sob forro ripado" },
    { src: `${BASE}/piscina.webp`, legenda: "Piscina", largura: 1600, altura: 1600, ilustrativa: true,
      alt: "Piscina com deck de madeira, jardim vertical e espreguiçadeiras de madeira" },
    { src: `${BASE}/estar-pe-direito.webp`, legenda: "Estar com pé-direito duplo", largura: 1600, altura: 1200, ilustrativa: true, faixa: true,
      alt: "Sala de estar com pé-direito duplo, janelas altas com persianas de madeira e lustre de anéis" },
    { src: `${BASE}/estar-jantar.webp`, legenda: "Estar e jantar integrados", largura: 1600, altura: 1200, ilustrativa: true,
      alt: "Sala de jantar integrada ao estar, mesa de mármore com cadeiras de madeira e painel ripado" },
    { src: `${BASE}/jantar.webp`, legenda: "Jantar", largura: 1600, altura: 1200, ilustrativa: true, faixa: true,
      alt: "Sala de jantar com painel de madeira e perfis de luz, aparador e pendentes dourados" },
    { src: `${BASE}/cozinha.webp`, legenda: "Cozinha", largura: 1600, altura: 1200, ilustrativa: true, faixa: true,
      alt: "Cozinha com ilha em porcelanato cinza, coifa, mesa de madeira e pendente de globos" },
    { src: `${BASE}/suite-principal.webp`, legenda: "Suíte principal", largura: 1600, altura: 1199, ilustrativa: true, faixa: true,
      alt: "Suíte principal com parede ripada, cabeceira estofada, pendentes dourados e cortinas de linho" },
    { src: `${BASE}/closet.webp`, legenda: "Closet", largura: 1280, altura: 1600, ilustrativa: true, faixa: true,
      alt: "Closet com portas em vidro canelado e penteadeira com espelho em arco" },
    { src: `${BASE}/banho-suite-principal.webp`, legenda: "Banho da suíte principal", largura: 1600, altura: 1199, ilustrativa: true, faixa: true,
      alt: "Banheiro com revestimento efeito granilite, duas cubas, metais pretos e espelhos com moldura escura" },
    { src: `${BASE}/suite-2.webp`, legenda: "Suíte 2", largura: 1600, altura: 1199, ilustrativa: true, faixa: true,
      alt: "Suíte com papel de parede de montanhas em tons de azul e tapete patchwork" },
    { src: `${BASE}/banho-2.webp`, legenda: "Banho da suíte 2", largura: 1280, altura: 1600, ilustrativa: true,
      alt: "Banheiro com porcelanato claro, bancada cinza com cuba esculpida e revestimento geométrico no box" },
    { src: `${BASE}/suite-3.webp`, legenda: "Suíte 3", largura: 1600, altura: 1199, ilustrativa: true,
      alt: "Suíte com papel de parede de folhas em aquarela, cabeceira capitonê e quadros" },
    { src: `${BASE}/banho-3.webp`, legenda: "Banho da suíte 3", largura: 1280, altura: 1600, ilustrativa: true,
      alt: "Banheiro com bancada cinza, revestimento em losangos no box e espelho com luz embutida" },
  ],
  imagensPendentes: [],
  pavimentos: [
    {
      id: "terreo",
      nome: "Térreo",
      planta: null,
      ambientes: [
        { nome: "Garagem coberta", area: 42 },
        { nome: "Hall de entrada", area: 24 },
        { nome: "Estar e jantar", area: 54 },
        { nome: "Cozinha", area: 20 },
        { nome: "Área gourmet", area: 30 },
        { nome: "Lavabo", area: 4 },
        { nome: "Serviço", area: 11 },
      ],
    },
    {
      id: "superior",
      nome: "Superior",
      planta: null,
      ambientes: [
        { nome: "Suíte principal com closet", area: 42 },
        { nome: "Suíte 2", area: 20 },
        { nome: "Suíte 3", area: 18 },
        { nome: "Suíte 4", area: 18 },
        { nome: "Sala íntima", area: 16 },
        { nome: "Varanda", area: 9 },
      ],
    },
  ],
  acabamentos: [
    {
      item: "Fachada",
      material: "Pedra natural em filetes, porta pivotante em madeira e revestimento metálico efeito corten",
      imagem: { src: `${BASE}/acab-fachada.webp`, alt: "Detalhe da entrada com pedra natural, esquadria preta e porta de madeira", ilustrativa: true, largura: 310, altura: 560 },
    },
    {
      item: "Área gourmet",
      material: "Pergolado em placa metálica efeito corten e forro ripado de madeira",
      imagem: { src: `${BASE}/acab-pergolado.webp`, alt: "Detalhe do pergolado em placas metálicas e forro ripado", ilustrativa: true, largura: 920, altura: 430 },
    },
    {
      item: "Painéis",
      material: "Painel de madeira com perfis de LED embutidos",
      imagem: { src: `${BASE}/acab-painel.webp`, alt: "Detalhe do painel de madeira da sala de jantar com faixas de luz", ilustrativa: true, largura: 420, altura: 800 },
    },
    {
      item: "Bancadas",
      material: "Porcelanato cinza com cuba esculpida e gabinete suspenso",
      imagem: { src: `${BASE}/acab-bancada.webp`, alt: "Detalhe da bancada cinza com cuba esculpida", ilustrativa: true, largura: 470, altura: 490 },
    },
    {
      item: "Banheiros",
      material: "Porcelanato efeito granilite do piso ao teto, com nicho iluminado",
      imagem: { src: `${BASE}/acab-granilite.webp`, alt: "Detalhe do revestimento efeito granilite no box", ilustrativa: true, largura: 560, altura: 840 },
    },
    {
      item: "Área externa",
      material: "Deck de madeira e borda da piscina em granilite",
      imagem: { src: `${BASE}/acab-deck.webp`, alt: "Detalhe do deck de madeira e da borda da piscina", ilustrativa: true, largura: 1020, altura: 580 },
    },
  ],
  localizacao: {
    descricao: "Rua residencial tranquila, com acesso rápido a escolas, comércio e às principais vias da cidade.",
    pontos: [
      { categoria: "Escola", nome: "[Nome da escola]", tempo: "[x] min" },
      { categoria: "Mercado", nome: "[Nome do mercado]", tempo: "[x] min" },
      { categoria: "Rodovia", nome: "[Nome da rodovia]", tempo: "[x] min" },
      { categoria: "Centro", nome: "Centro de [Cidade]", tempo: "[x] min" },
    ],
  },
};

export const casasEntregues: CasaEntregue[] = [
  {
    slug: "casa-entregue-1",
    nome: "Casa [Nome]",
    bairro: "[Bairro]",
    cidade: "[Cidade]",
    ano: "[Ano]",
    area: "[000] m²",
    imagem: { src: null, alt: "Casa entregue", ilustrativa: false },
  },
  {
    slug: "casa-entregue-2",
    nome: "Casa [Nome]",
    bairro: "[Bairro]",
    cidade: "[Cidade]",
    ano: "[Ano]",
    area: "[000] m²",
    imagem: { src: null, alt: "Casa entregue", ilustrativa: false },
  },
];
