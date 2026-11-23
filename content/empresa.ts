/**
 * Conteúdo institucional da Idear.
 *
 * Só entra aqui o que o cliente confirmou. Números da empresa, casas entregues e prazos
 * da obra ficam vazios até o Daniel passar os dados reais: listas vazias não aparecem no site.
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
  provisorio: false,
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
    "Do terreno às chaves",
  ],

  manifesto:
    "Construímos poucas casas, e cada uma delas do começo ao fim. Escolhemos o terreno, desenhamos o projeto com quem vai morar em mente e acompanhamos a obra até a entrega das chaves.",

  /** Ex.: { valor: 12, sufixo: "", rotulo: "anos construindo casas" }. Vazio até o cliente confirmar. */
  numeros: [] as { valor: number; sufixo: string; rotulo: string }[],

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
      prazo: "",
      texto: "Escolhemos o lote pela rua, pela orientação solar e pela vizinhança. Estudamos o solo e a legislação antes de qualquer traço.",
      imagem: `${BASE}/fachada-perspectiva.webp`,
    },
    {
      titulo: "Projeto",
      prazo: "",
      texto: "Arquitetura, estrutura, instalações e interiores desenvolvidos juntos, com memorial descritivo de cada material.",
      imagem: `${BASE}/jantar.webp`,
    },
    {
      titulo: "Obra",
      prazo: "",
      texto: "Obra acompanhada por responsável técnico em todas as etapas, com o comprador informado do andamento.",
      imagem: `${BASE}/gourmet-churrasqueira.webp`,
    },
    {
      titulo: "Entrega",
      prazo: "",
      texto: "Vistoria com o comprador, habite-se e manual do proprietário na entrega das chaves.",
      imagem: `${BASE}/suite-principal.webp`,
    },
  ],

  /** Casas entregues pela Idear, com fotos reais. Vazio até o cliente enviar; a seção some do site enquanto estiver vazia. */
  entregas: [] as Entrega[],

  faq: [
    {
      pergunta: "Como funciona a compra de uma casa da Idear?",
      resposta:
        "Você agenda uma visita pelo WhatsApp, conhece a casa com a nossa equipe e recebe o memorial descritivo e as condições de compra.",
    },
    {
      pergunta: "Posso visitar a casa antes de comprar?",
      resposta:
        "Sim. As visitas são feitas com hora marcada, de segunda a sábado. Agende pelo WhatsApp e confirmamos o horário com você.",
    },
    {
      pergunta: "Quais são as formas de pagamento?",
      resposta: "Fale com a gente pelo WhatsApp: enviamos os valores e as condições de compra da casa.",
    },
    {
      pergunta: "A casa é entregue mobiliada?",
      resposta:
        "Não. A casa é entregue com revestimentos nos banheiros, louças e metais. Os móveis, a marcenaria, os eletrodomésticos e a decoração que aparecem nas imagens são sugestões de ambientação, para mostrar o que dá para fazer em cada espaço.",
    },
    {
      pergunta: "Quando a casa fica pronta?",
      resposta: "A previsão de entrega é março de 2027.",
    },
    {
      pergunta: "Qual é a garantia depois da entrega?",
      resposta:
        "A casa tem garantia de solidez e segurança da construção por 5 anos, conforme o Código Civil, além dos prazos de garantia de cada sistema descritos no manual do proprietário.",
    },
    {
      pergunta: "Vocês constroem em outras regiões?",
      resposta:
        "Atuamos em Itatiba e região. Se você procura uma casa da Idear em outro bairro, fale com a gente: avisamos quando a próxima casa for lançada.",
    },
  ],
};
