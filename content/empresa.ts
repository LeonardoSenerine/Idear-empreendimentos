/**
 * Conteúdo institucional da Idear.
 *
 * PRÉVIA: números, valores, entregas e textos abaixo foram criados para a prévia
 * e precisam ser confirmados ou substituídos pelo cliente antes de ir ao ar.
 */

const BASE = "/images/casa";

export const empresa = {
  provisorio: true,

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
      slug: "casa-jacaranda",
      nome: "Casa Jacarandá",
      bairro: "[Bairro]",
      cidade: "[Cidade]",
      ano: "2024",
      area: 285,
      suites: 3,
      descricao: "Térrea, com pátio central e área gourmet aberta para o jardim.",
      imagem: `${BASE}/piscina.webp`,
      alt: "Área externa com piscina e deck de madeira",
    },
    {
      slug: "casa-ipe",
      nome: "Casa Ipê",
      bairro: "[Bairro]",
      cidade: "[Cidade]",
      ano: "2022",
      area: 340,
      suites: 4,
      descricao: "Dois pavimentos, pé-direito duplo na sala e suítes voltadas para o nascente.",
      imagem: `${BASE}/estar-pe-direito.webp`,
      alt: "Sala com pé-direito duplo e janelas altas",
    },
    {
      slug: "casa-aroeira",
      nome: "Casa Aroeira",
      bairro: "[Bairro]",
      cidade: "[Cidade]",
      ano: "2019",
      area: 260,
      suites: 3,
      descricao: "Volumes em concreto e madeira, cozinha integrada e jardim de inverno.",
      imagem: `${BASE}/cozinha.webp`,
      alt: "Cozinha com ilha em porcelanato e mesa de madeira",
    },
  ],
};
