/**
 * Conteúdo do Guia da marca (página /guia-da-marca, para o cliente).
 * Fonte: "Guia da marca Idear", novembro de 2026.
 */

export const guia = {
  data: "Novembro de 2026",
  titulo: "Uma casa por vez.",
  subtitulo: "Identidade visual e comunicação da Idear Empreendimentos para o site, o Instagram e o Facebook.",

  marca: {
    texto:
      "A Idear não constrói em escala. Cada casa recebe atenção do terreno à entrega das chaves, e a comunicação mostra isso: a casa à venda é sempre a protagonista, com dados claros e um convite direto para a visita.",
    blocos: [
      { titulo: "Quem somos", texto: "Incorporadora imobiliária que constrói e vende casas de médio e alto padrão, uma por vez." },
      {
        titulo: "Para quem",
        texto: "Famílias que procuram uma casa pronta, bem construída e bem localizada, e querem falar direto com quem constrói.",
      },
      {
        titulo: "Como nos posicionamos",
        texto: "Construtora de alto padrão, com comunicação formal e sóbria e a casa à venda sempre em primeiro plano.",
      },
    ],
  },

  regrasLogo: [
    "Respiro mínimo igual à altura do “i”",
    "Não distorcer nem girar",
    "Sem sombras ou contornos",
    "Nunca sobre fotos claras e cheias de detalhes",
  ],

  cores: [
    { nome: "Azul-marinho", hex: "#07324F", uso: "Títulos, textos e botões" },
    { nome: "Bronze", hex: "#756B48", uso: "Detalhes, linhas e ícones" },
    { nome: "Bronze escuro", hex: "#635A3A", uso: "Bronze sobre fundo areia" },
    { nome: "Bronze claro", hex: "#C8BE96", uso: "Detalhes sobre o azul" },
    { nome: "Marfim", hex: "#FAF8F4", uso: "Fundo principal" },
    { nome: "Areia", hex: "#F1EDE5", uso: "Fundos de destaque" },
    { nome: "Pedra", hex: "#5B6570", uso: "Textos de apoio" },
    { nome: "Linha", hex: "#DDD7CB", uso: "Divisórias finas" },
  ],

  voz: {
    texto: "Sem emojis e sem exclamações. Falamos de materiais, metros e localização, sempre com um convite claro para a visita.",
    tabela: [
      ["Nossos projetos", "Casas entregues"],
      ["Entre em contato", "Agende uma visita"],
      ["Super espaçosa!!", "A metragem exata, em m²"],
      ["Acabamento lindo", "Painel em madeira e luz embutida"],
    ] as [string, string][],
  },

  imagens: [
    "Renders e fotos aparecem grandes, ocupando boa parte da peça.",
    "Todo render leva o selo “Imagem ilustrativa”.",
    "Linhas finas em bronze separam as informações.",
    "Os ícones têm traço fino, no mesmo desenho das linhas do símbolo.",
    "Cantos retos, sem sombras pesadas nem degradês.",
  ],

  criativos: {
    resumo: "12 posts, um carrossel de 6 slides, 13 stories e 8 capas de destaque. Toque em uma peça para ampliar.",
    aviso: "Peças atualizadas com os dados reais da casa no Ecologie Residencial: 240 m², 3 suítes, 4 vagas e R$ 2.000.000.",
    feed: [
      ["post-01-casa-a-venda", "Casa à venda"],
      ["post-02-uma-casa-por-vez", "Uma casa por vez"],
      ["post-03-ficha-tecnica", "Ficha técnica"],
      ["post-04-do-terreno-a-entrega", "Do terreno à entrega"],
      ["post-05-area-gourmet", "Área gourmet"],
      ["post-06-piscina", "Piscina"],
      ["post-07-cozinha", "Cozinha"],
      ["post-08-suite-master", "Suíte master"],
      ["post-09-sala-de-jantar", "Sala de jantar"],
      ["post-10-cada-detalhe", "Cada detalhe"],
      ["post-11-quartos", "Quartos"],
      ["post-12-arquitetura", "Arquitetura"],
    ] as [string, string][],
    carrossel: [
      ["carrossel-01-capa", "1. Capa"],
      ["carrossel-02-sala-de-estar", "2. Sala de estar"],
      ["carrossel-03-cozinha-e-jantar", "3. Cozinha e jantar"],
      ["carrossel-04-gourmet-e-piscina", "4. Gourmet e piscina"],
      ["carrossel-05-suite-master", "5. Suíte master"],
      ["carrossel-06-agende-sua-visita", "6. Agende sua visita"],
    ] as [string, string][],
    stories: [
      ["story-01-casa-a-venda", "Casa à venda"],
      ["story-02-agende-uma-visita", "Agende uma visita"],
      ["story-03-gourmet-e-piscina", "Gourmet e piscina"],
      ["story-04-suite-e-closet", "Suíte e closet"],
      ["story-05-tour-pela-casa", "Tour pela casa"],
      ["story-06-enquete", "Enquete"],
      ["story-07-ficha-tecnica", "Ficha técnica"],
      ["story-08-caixinha-de-perguntas", "Caixinha de perguntas"],
      ["story-09-sala-de-jantar", "Sala de jantar"],
      ["story-10-localizacao", "Localização"],
      ["story-11-uma-casa-por-vez", "Uma casa por vez"],
      ["story-12-banheiros", "Banheiros"],
      ["story-13-cozinha-gourmet", "Cozinha gourmet"],
    ] as [string, string][],
  },

  proximos: [
    { titulo: "Flyers", texto: "Apresentação da casa à venda, para entregar em visitas e eventos." },
    { titulo: "Cartões de visita", texto: "Frente com o logo, verso com contato e WhatsApp." },
    { titulo: "Placas", texto: "Placa de obra e placa de venda no terreno." },
  ],
};
