/**
 * Conteúdo das casas da Idear.
 *
 * Com uma casa à venda por vez, o conteúdo fica no próprio projeto (sem CMS).
 * Quando a casa atual for vendida: mova-a para `entregas` em content/empresa.ts e preencha
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
  planta: string | null; // imagem da planta do arquiteto; null = planta ilustrativa
  /** largura e altura da imagem da planta, em px */
  plantaTamanho?: [number, number];
  ambientes: Ambiente[];
};

export type Acabamento = { item: string; material: string; imagem: Imagem };

export type PontoProximo = { categoria: string; nome: string; tempo: string };

export type CasaAtual = {
  slug: string;
  /** Título da casa nas páginas (as casas não têm nome próprio) */
  manchete: string;
  /** Resumo curto do que a casa tem, usado em cartões e na capa do link */
  resumoCurto: string;
  bairro: string;
  cidade: string;
  uf: string;
  provisorio: boolean;
  titulo: string;
  resumo: { area: number; suites: number; vagas: number };
  apresentacao: [string, string];
  ficha: DadoFicha[];
  preco: string;
  /** O que acompanha a casa na entrega (aviso de que as imagens mostram sugestões de decoração) */
  entrega: { inclui: string; naoInclui: string };
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
  /** Os pontos altos do projeto (seção "O projeto") */
  destaques: { titulo: string; texto: string; numero: string; imagem: string; alt: string }[];
  /** Frases curtas da faixa em movimento abaixo do hero */
  faixa: string[];
  pavimentos: Pavimento[];
  acabamentos: Acabamento[];
  localizacao: { descricao: string; pontos: PontoProximo[] };
};


const BASE = "/images/casa";

export const casaAtual: CasaAtual = {
  slug: "casa-atual",
  manchete: "Casa à venda em Itatiba",
  resumoCurto: "3 suítes, piscina com prainha e vista para a mata",
  // Condomínio (loteamento fechado). O endereço do lote não vai para o site.
  bairro: "Ecologie Residencial",
  cidade: "Itatiba",
  uf: "SP",
  provisorio: false,
  titulo: "Vista para a mata, espaço e acabamento de alto padrão.",
  resumo: { area: 240, suites: 3, vagas: 4 },
  apresentacao: [
    "Uma casa pensada para receber, com vista privilegiada para a mata e a montanha: a cozinha se abre para o jantar e o espaço gourmet completo olha para a piscina com prainha.",
    "Hall de entrada e sala com pé-direito alto, escritório com banheiro ao lado do hall, três suítes (a master com closet e sacada), lavabo, área de serviço e despensa. Mais um espaço de 40 m² para estúdio de música, ferramentas, equipamentos, um quarto a mais ou o ambiente que a família precisar.",
  ],
  ficha: [
    { rotulo: "Área construída", valor: 240, unidade: "m²" },
    { rotulo: "Terreno", valor: 399.1, unidade: "m²" },
    { rotulo: "Suítes", valor: 3 },
    { rotulo: "Vagas (2 cobertas)", valor: 4 },
    { rotulo: "Pavimentos", valor: 2 },
    { rotulo: "Previsão de entrega", valor: "Março de 2027" },
  ],
  preco: "R$ 2.000.000",
  // Confirmado pelo Daniel em 23/11/2026
  entrega: {
    inclui: "A casa é entregue com revestimentos nos banheiros, louças e metais.",
    naoInclui: "Móveis, marcenaria, eletrodomésticos e decoração das imagens são sugestões de ambientação e não acompanham o imóvel.",
  },
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
    { src: `${BASE}/estar-pe-direito.webp`, legenda: "Estar com pé-direito alto", largura: 1600, altura: 1200, ilustrativa: true, faixa: true,
      alt: "Sala de estar com pé-direito duplo, janelas altas com persianas de madeira e lustre de anéis" },
    { src: `${BASE}/estar-jantar.webp`, legenda: "Estar e jantar integrados", largura: 1600, altura: 1200, ilustrativa: true,
      alt: "Sala de jantar integrada ao estar, mesa de mármore com cadeiras de madeira e painel ripado" },
    { src: `${BASE}/jantar.webp`, legenda: "Jantar", largura: 1600, altura: 1200, ilustrativa: true, faixa: true,
      alt: "Sala de jantar com painel de madeira e perfis de luz, aparador e pendentes dourados" },
    { src: `${BASE}/cozinha.webp`, legenda: "Cozinha", largura: 1600, altura: 1200, ilustrativa: true, faixa: true,
      alt: "Cozinha com ilha em porcelanato cinza, coifa, mesa de madeira e pendente de globos" },
    { src: `${BASE}/suite-principal.webp`, legenda: "Suíte master", largura: 1600, altura: 1199, ilustrativa: true, faixa: true,
      alt: "Suíte principal com parede ripada, cabeceira estofada, pendentes dourados e cortinas de linho" },
    { src: `${BASE}/closet.webp`, legenda: "Closet", largura: 1280, altura: 1600, ilustrativa: true, faixa: true,
      alt: "Closet com portas em vidro canelado e penteadeira com espelho em arco" },
    { src: `${BASE}/banho-suite-principal.webp`, legenda: "Banho da suíte master", largura: 1600, altura: 1199, ilustrativa: true, faixa: true,
      alt: "Banheiro com revestimento efeito granilite, duas cubas, metais pretos e espelhos com moldura escura" },
    { src: `${BASE}/suite-2.webp`, legenda: "Suíte 1", largura: 1600, altura: 1199, ilustrativa: true, faixa: true,
      alt: "Suíte com papel de parede de montanhas em tons de azul e tapete patchwork" },
    { src: `${BASE}/banho-2.webp`, legenda: "Banho da suíte 1", largura: 1280, altura: 1600, ilustrativa: true,
      alt: "Banheiro com porcelanato claro, bancada cinza com cuba esculpida e revestimento geométrico no box" },
    { src: `${BASE}/suite-3.webp`, legenda: "Suíte 2", largura: 1600, altura: 1199, ilustrativa: true,
      alt: "Suíte com papel de parede de folhas em aquarela, cabeceira capitonê e quadros" },
    { src: `${BASE}/banho-3.webp`, legenda: "Banho da suíte 2", largura: 1280, altura: 1600, ilustrativa: true,
      alt: "Banheiro com bancada cinza, revestimento em losangos no box e espelho com luz embutida" },
  ],
  imagensPendentes: [],
  destaques: [
    {
      titulo: "Pé-direito alto",
      numero: "16,8 m²",
      texto: "Hall de entrada e sala de estar com pé-direito alto, janelas grandes e luz natural.",
      imagem: `${BASE}/estar-pe-direito.webp`,
      alt: "Sala de estar com pé-direito alto e janelas altas",
    },
    {
      titulo: "Espaço gourmet completo",
      numero: "14,6 m²",
      texto: "Churrasqueira, ilha e mesa grande sob o pergolado, de frente para a piscina.",
      imagem: `${BASE}/gourmet-mesa.webp`,
      alt: "Espaço gourmet com mesa de madeira sob pergolado",
    },
    {
      titulo: "Suíte master",
      numero: "17,7 m²",
      texto: "Closet, banho com duas cubas e sacada.",
      imagem: `${BASE}/suite-principal.webp`,
      alt: "Suíte master com parede ripada e cabeceira estofada",
    },
    {
      titulo: "Piscina com prainha",
      numero: "5 × 2,5 m",
      texto: "Prainha rasa para as crianças, ao lado do espaço gourmet.",
      imagem: `${BASE}/piscina.webp`,
      alt: "Piscina com deck de madeira e jardim",
    },
  ],
  faixa: [
    "Vista para a mata e a montanha",
    "Pé-direito alto",
    "Espaço gourmet completo",
    "Piscina com prainha",
    "Três suítes",
    "Closet na suíte master",
    "Escritório com banheiro",
    "Espaço livre de 40 m²",
    "Ar-condicionado em todos os ambientes",
    "Quatro vagas",
  ],
  // Áreas do projeto executivo (folhas 01 e 02). O térreo fica no nível da rua;
  // o superior é o pavimento social, com a piscina nos fundos do terreno em aclive.
  pavimentos: [
    {
      id: "terreo",
      nome: "Térreo",
      planta: "/images/casa/planta-terreo.webp",
      plantaTamanho: [1600, 1362],
      ambientes: [
        { nome: "Garagem (2 vagas cobertas)", area: 25.65 },
        { nome: "Hall de entrada com pé-direito alto", area: 16.65 },
        { nome: "Escritório", area: 5.49 },
        { nome: "Banheiro do escritório", area: 3.24 },
      ],
    },
    {
      id: "superior",
      nome: "Superior",
      planta: "/images/casa/planta-superior.webp",
      plantaTamanho: [714, 1600],
      ambientes: [
        { nome: "Sala de estar", area: 16.8 },
        { nome: "Jantar", area: 12.95 },
        { nome: "Cozinha", area: 16.8 },
        { nome: "Espaço gourmet", area: 14.6 },
        { nome: "Suíte master", area: 17.67 },
        { nome: "Closet master", area: 6.75 },
        { nome: "Banho master", area: 4.93 },
        { nome: "Sacada", area: 3.05 },
        { nome: "Suíte 1", area: 12.09 },
        { nome: "Banho da suíte 1", area: 3.25 },
        { nome: "Suíte 2", area: 12.09 },
        { nome: "Banho da suíte 2", area: 3.25 },
        { nome: "Lavabo", area: 2.19 },
        { nome: "Lavanderia", area: 5.04 },
        { nome: "Despensa", area: 2.47 },
        { nome: "Depósito", area: 2.88 },
        { nome: "Vestiário", area: 3.36 },
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
      item: "Marcenaria",
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
    // Fonte: site do condomínio (ecologieitatiba.com.br), consultado em 23/11/2026.
    // Distância até o centro corrigida pelo cliente em 24/11/2026: 10 km, cerca de 15 minutos.
    descricao:
      "Loteamento fechado com portaria 24 horas, câmeras de segurança e internet por fibra ótica, cercado de mata. A 10 km do centro de Itatiba, cerca de 15 minutos de carro, com acesso pelas rodovias Bandeirantes e Anhanguera.",
    pontos: [
      { categoria: "Centro", nome: "Centro de Itatiba", tempo: "10 km" },
      { categoria: "Cidade", nome: "Jundiaí", tempo: "24 km" },
      { categoria: "Cidade", nome: "Campinas", tempo: "38 km" },
      { categoria: "Cidade", nome: "São Paulo", tempo: "80 km" },
    ],
  },
};
