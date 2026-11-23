/**
 * Conteúdo institucional da Idear.
 *
 * PRÉVIA: números, valores, entregas, perguntas e textos abaixo foram criados para a prévia
 * e precisam ser confirmados ou substituídos pelo cliente antes de ir ao ar.
 */

const BASE = "/images/casa";

export type Entrega = {
  slug: string;
  bairro: string;
  cidade: string;
  ano: string;
  area: number;
  suites: number;
  meses: number; // duração da obra
  descricao: string;
  destaques: string[];
  imagem: string;
  alt: string;
};

export const empresa = {
  provisorio: true,
  cidade: "Itatiba",

  hero: {
    chamada: "Incorporadora de casas de alto padrão em Itatiba",
    titulo: "Construindo sonhos, uma casa por vez.",
    texto: "Do terreno à entrega das chaves, cuidamos de cada detalhe da casa onde a sua família vai viver.",
  },

  /** Faixa em movimento abaixo do hero da home */
  faixa: [
    "Uma casa por vez",
    "Projeto, obra e entrega",
    "Materiais que duram",
    "Obras entregues no prazo",
    "Assistência depois das chaves",
  ],

  manifesto:
    "Construímos poucas casas, e cada uma delas do começo ao fim. Escolhemos o terreno, desenhamos o projeto com quem vai morar em mente e acompanhamos a obra até a entrega das chaves.",

  numeros: [
    { valor: 12, sufixo: "", rotulo: "anos construindo casas" },
    { valor: 9, sufixo: "", rotulo: "casas entregues" },
    { valor: 2800, sufixo: " m²", rotulo: "de área construída" },
    { valor: 100, sufixo: "%", rotulo: "das obras entregues no prazo" },
  ],

  valores: [
    {
      titulo: "Uma casa por vez",
      texto: "Não trabalhamos em escala. Cada casa recebe a atenção inteira da equipe, do terreno ao último acabamento.",
    },
    {
      titulo: "Transparência na obra",
      texto: "Cronograma, memorial descritivo e fotos da obra compartilhados com o comprador em cada etapa.",
    },
    {
      titulo: "Materiais que duram",
      texto: "Especificamos pensando em quem vai morar daqui a vinte anos: estrutura, impermeabilização e acabamentos de primeira linha.",
    },
    {
      titulo: "Compromisso depois da entrega",
      texto: "Assistência técnica, manual do proprietário e uma equipe que atende o telefone depois que as chaves são entregues.",
    },
  ],

  processo: [
    {
      titulo: "Terreno",
      prazo: "1 a 2 meses",
      texto: "Escolhemos o lote pela rua, pela orientação solar e pela vizinhança. Estudamos o solo e a legislação antes de qualquer traço.",
      imagem: `${BASE}/fachada-perspectiva.webp`,
    },
    {
      titulo: "Projeto",
      prazo: "3 a 4 meses",
      texto: "Arquitetura, estrutura, instalações e interiores desenvolvidos juntos, com memorial descritivo de cada material.",
      imagem: `${BASE}/jantar.webp`,
    },
    {
      titulo: "Obra",
      prazo: "12 a 16 meses",
      texto: "Equipe com responsável técnico em todas as etapas e relatórios mensais com fotos para quem já comprou.",
      imagem: `${BASE}/gourmet-churrasqueira.webp`,
    },
    {
      titulo: "Entrega",
      prazo: "Chaves na mão",
      texto: "Vistoria com o comprador, habite-se, manual do proprietário e assistência técnica depois da mudança.",
      imagem: `${BASE}/suite-principal.webp`,
    },
  ],

  /** Casas entregues (exemplos para a prévia; trocar pelas casas reais com fotos reais) */
  entregas: [
    {
      slug: "casa-2024",
      bairro: "[Bairro]",
      cidade: "Itatiba",
      ano: "2024",
      area: 285,
      suites: 3,
      meses: 14,
      descricao: "Térrea, com pátio central e área gourmet aberta para o jardim e a piscina.",
      destaques: ["Casa térrea", "Pátio central", "Piscina aquecida"],
      imagem: `${BASE}/piscina.webp`,
      alt: "Área externa com piscina e deck de madeira",
    },
    {
      slug: "casa-2022",
      bairro: "[Bairro]",
      cidade: "Itatiba",
      ano: "2022",
      area: 340,
      suites: 4,
      meses: 16,
      descricao: "Dois pavimentos, pé-direito duplo na sala e suítes voltadas para o nascente.",
      destaques: ["Pé-direito duplo", "Suítes ao nascente", "Escritório"],
      imagem: `${BASE}/estar-pe-direito.webp`,
      alt: "Sala com pé-direito duplo e janelas altas",
    },
    {
      slug: "casa-2019",
      bairro: "[Bairro]",
      cidade: "Itatiba",
      ano: "2019",
      area: 260,
      suites: 3,
      meses: 13,
      descricao: "Volumes em concreto e madeira, cozinha integrada e jardim de inverno.",
      destaques: ["Cozinha integrada", "Jardim de inverno", "Concreto aparente"],
      imagem: `${BASE}/cozinha.webp`,
      alt: "Cozinha com ilha em porcelanato e mesa de madeira",
    },
  ] as Entrega[],

  faq: [
    {
      pergunta: "Como funciona a compra de uma casa da Idear?",
      resposta:
        "Você agenda uma visita, conhece a casa com a nossa equipe e recebe o memorial descritivo e as condições. A compra é feita direto com a Idear, com contrato registrado e acompanhamento até a entrega das chaves.",
    },
    {
      pergunta: "Posso visitar a casa antes de comprar?",
      resposta:
        "Sim. As visitas são feitas com hora marcada, de segunda a sábado. Agende pelo WhatsApp e confirmamos o horário com você.",
    },
    {
      pergunta: "A casa pode ser financiada?",
      resposta:
        "Sim. A casa aceita financiamento bancário, e nossa equipe orienta sobre a documentação. Também avaliamos propostas com imóvel na negociação.",
    },
    {
      pergunta: "Posso personalizar acabamentos?",
      resposta:
        "Quando a casa é comprada durante a obra, é possível escolher acabamentos dentro de opções pré-aprovadas, até a etapa de revestimentos. Com a casa pronta, ela é entregue como foi especificada.",
    },
    {
      pergunta: "Quanto tempo leva uma obra da Idear?",
      resposta:
        "Em média de 12 a 16 meses, do início da fundação à entrega. Quem compra durante a obra recebe relatórios mensais com fotos de cada etapa.",
    },
    {
      pergunta: "Qual é a garantia depois da entrega?",
      resposta:
        "A casa tem garantia de solidez e segurança da construção por 5 anos, conforme o Código Civil, além dos prazos de garantia de cada sistema descritos no manual do proprietário. Nossa assistência técnica atende depois da mudança.",
    },
    {
      pergunta: "Vocês constroem em outras regiões?",
      resposta:
        "Atuamos em Itatiba e região. Se você procura uma casa da Idear em outro bairro, fale com a gente: avisamos quando a próxima casa for lançada.",
    },
  ],
};
