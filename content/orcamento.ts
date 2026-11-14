/**
 * Proposta comercial para a Idear (página /orcamento).
 * Espelha o documento "Proposta comercial: site, marca e criativos da Idear", de 14/11/2026.
 * A aba interna de pesquisa de mercado não vai para o site.
 */

export const orcamento = {
  titulo: "Proposta comercial",
  subtitulo: "Site, guia da marca e coleção de lançamento",
  data: "14 de novembro de 2026",
  validade: "Válida por 15 dias a partir da data.",
  para: "Idear Empreendimentos, Daniel",
  de: {
    nome: "Leonardo Senerine",
    site: "https://senerine.dev",
    siteRotulo: "senerine.dev",
    whatsapp: "5518997307852",
    whatsappRotulo: "(18) 99730-7852",
  },
  total: "R$ 1.000",
  manutencao: "R$ 150/mês",

  apresentacao: [
    "Proposta para a Idear Empreendimentos: site institucional sob medida, guia da marca e a coleção de 39 posts de lançamento por R$ 1.000, em pagamento único, mais a manutenção do site por R$ 150/mês.",
    "O objetivo é um só: quem procura casa de alto padrão em Itatiba precisa conhecer a Idear, confiar em quem constrói e agendar uma visita. Tudo nesta proposta serve a esse caminho.",
  ],

  diagnostico: {
    texto:
      "A Idear constrói casas de alto padrão, mas o site e o perfil não mostravam isso: quem chegava pelo Instagram não via a casa à venda nem um jeito claro de falar com a equipe.",
    situacao: [
      "Site antigo montado sobre template de design de interiores, com texto de exemplo em inglês e sem dados da casa (local, metragem, preço).",
      "Sem cores, fontes e tom de voz definidos: cada peça tem uma cara diferente.",
      "Sem criativos prontos para apresentar a casa à venda nas redes.",
    ],
    decisao: [
      ["Confiança em quem constrói", "processo de obra, garantias e casas já entregues."],
      ["Dados claros", "metragem, suítes, vagas, planta e localização, como num anúncio de imóvel."],
      ["Imagem", "renders grandes e bem tratados, no celular, onde a maioria chega pelo Instagram."],
      ["Contato direto", "WhatsApp e agendamento de visita a um toque."],
    ] as [string, string][],
    fecho: "Esses pontos guiam o escopo abaixo: tudo aponta para a visita.",
  },

  antesDepois: {
    texto:
      "O site novo troca um modelo genérico de design de interiores por um site da Idear, com a mensagem da empresa, os números e o convite para a visita já na primeira tela.",
    imagens: [
      {
        src: "/orcamento/comparativo-computador.jpg",
        largura: 1904,
        altura: 728,
        alt: "Antes e depois no computador: à esquerda o site antigo, com um carrossel de fotos sem mensagem; à direita o site novo, com a mensagem da Idear, os números da empresa e os botões de contato",
      },
      {
        src: "/orcamento/comparativo-celular.jpg",
        largura: 896,
        altura: 957,
        alt: "Antes e depois no celular: à esquerda o site antigo, com texto de modelo abaixo da foto; à direita o site novo, com a mensagem, os números e a barra fixa de WhatsApp e visita",
      },
    ],
    legenda: "Capturas da primeira tela de cada site, no computador (1440 × 900) e no celular (390 × 844), em 14/11/2026.",
    tabela: [
      ["Primeira tela", "Carrossel de fotos, sem mensagem", "Mensagem da Idear, números da empresa e dois botões de contato"],
      ["Textos", "Texto de modelo (“Propomos e discutimos regras de design”) e trechos em inglês", "Textos da Idear, com Itatiba e os dados da casa"],
      ["Casa à venda", "Sem página e sem dados", "Página própria com galeria, ficha técnica, planta, acabamentos e localização"],
      ["Celular", "Layout de modelo, com o texto genérico logo abaixo da foto", "Pensado para o celular, com barra fixa de WhatsApp e visita"],
      ["Contato", "Telefone no topo da página", "WhatsApp fixo, formulário de visita e chamada em cada seção"],
      ["Link no WhatsApp", "Sem imagem nem descrição", "Capa própria para a home e para a casa à venda"],
    ] as [string, string, string][],
  },

  escopo: {
    texto:
      "São três frentes, nesta ordem: primeiro a identidade e o guia da marca, depois o site e os criativos, com as mesmas cores, fontes e fotos.",
    frentes: [
      {
        titulo: "Identidade e guia da marca",
        itens: [
          "Paleta de cores, tipografia (Cormorant Garamond e Manrope) e regras de uso do logo, com 2 rodadas de ajuste.",
          "Tom de voz: como a Idear escreve, com exemplos do que evitar e do que preferir.",
          "Regras para fotos e renders, ícones e capas de destaque.",
          "Guia da marca publicado numa página própria do site, para a equipe e parceiros consultarem.",
        ],
      },
      {
        titulo: "Site",
        itens: [
          "Site sob medida (não é template), pensado para celular: home da Idear, página da casa à venda e página de erro 404.",
          "Home: quem é a Idear, como constrói, casas entregues, casa à venda em destaque, perguntas frequentes e chamada para visita.",
          "Página da casa: galeria com ampliação, ficha técnica, planta, acabamentos e localização.",
          "Vídeo de abertura em movimento 2.5D, criado a partir do render da fachada, e animações de rolagem.",
          "Formulário de visita, WhatsApp fixo e barra de ações no celular.",
          "SEO local (Itatiba), dados estruturados para o Google e capas de compartilhamento para WhatsApp e redes.",
          "Publicação na Vercel e código entregue no GitHub do cliente.",
        ],
      },
      {
        titulo: "Coleção de lançamento para Instagram e Facebook",
        itens: [
          "12 posts para o feed.",
          "1 carrossel de 6 slides.",
          "13 stories, incluindo enquete e caixinha de perguntas.",
          "8 capas de destaque com ícones da marca.",
          "Arquivos prontos para publicar; publicação e gestão do perfil ficam com o cliente.",
        ],
      },
    ],
  },

  investimento: {
    texto:
      "O projeto sai por R$ 1.000, em pagamento único: site institucional, guia da marca e coleção de lançamento. A manutenção do site é opcional, por R$ 150/mês.",
    itens: [
      ["Site institucional", "Home da Idear, página da casa à venda, 404, vídeo de abertura, SEO, capas de compartilhamento e publicação", "R$ 500"],
      ["Guia da marca", "Paleta, tipografia, regras do logo, tom de voz, regras de imagem e página do guia", "R$ 300"],
      ["Coleção de lançamento", "12 posts, carrossel de 6 slides, 13 stories e 8 capas de destaque", "R$ 200"],
    ] as [string, string, string][],
    totalLinha: ["Projeto completo (pagamento único)", "As três frentes acima", "R$ 1.000"] as [string, string, string],
    mensalLinha: ["Manutenção mensal (opcional)", "Atualizações, backup, pequenos ajustes e troca da casa à venda", "R$ 150/mês"] as [string, string, string],
    observacao: "Valores pensados para fechar o projeto agora, abaixo da média de mercado para o mesmo conjunto de serviços.",
    manutencao:
      "Manutenção mensal (opcional, após a entrega): R$ 150/mês. Inclui atualizações, backup, troca de fotos, textos e valores, pequenos ajustes e a troca da casa à venda quando a próxima for lançada. Social media (criação de posts recorrentes, publicação e gestão do perfil) não faz parte deste orçamento.",
    pagamento: [
      "Projeto: 50% na aprovação e 50% na entrega final, ou 2x sem juros por Pix ou transferência.",
      "À vista no Pix: 5% de desconto no projeto.",
      "Manutenção: paga todo mês, a partir da entrega do projeto.",
    ],
  },

  terceiros: {
    texto: "O site tem custo fixo baixo, pago direto pelo cliente e registrado no nome da Idear.",
    tabela: [
      ["Domínio idearempreendimentos.com.br", "R$ 40/ano", "Domínio próprio do cliente; a renovação continua com ele"],
      ["Hospedagem na Vercel", "R$ 0 a US$ 20/mês", "O plano gratuito serve para a prévia; para uso comercial a Vercel pede o plano Pro"],
      ["E-mail do formulário (Resend)", "R$ 0", "Plano gratuito atende o volume de pedidos de visita"],
      ["Anúncios no Instagram ou Google", "A partir de R$ 15/dia", "Opcional; configuração pode ser orçada à parte"],
    ] as [string, string, string][],
    naoIncluso:
      "Não estão inclusos: social media (posts recorrentes, publicação e gestão do perfil), sessão de fotos ou renders novos, peças impressas (flyers, cartões de visita, placas de obra e de venda), vídeos além do vídeo de abertura do site, gestão de anúncios, textos longos de blog e alterações de escopo após a aprovação. Valores de terceiros são aproximados e podem mudar.",
  },

  condicoes: [
    "Até 2 rodadas de ajuste por etapa; ajustes extras são orçados à parte.",
    "Etapas e datas são alinhadas com o cliente ao longo do projeto, a partir do envio do material (renders, plantas, ficha técnica, dados da casa e da empresa).",
    "Os dados da casa e da empresa (nome, bairro, metragens, números, CNPJ, CRECI) são fornecidos e conferidos pelo cliente antes da publicação.",
    "Ao final, todos os arquivos e acessos (site, código no GitHub, domínio, Vercel, Google) ficam no nome do cliente.",
    "A manutenção mensal pode ser cancelada com 30 dias de aviso.",
  ],
  proximos: [
    "Escolher o pacote.",
    "Pagar a entrada e agendar a reunião de alinhamento (cerca de 1 hora).",
    "Enviar os renders e plantas finais, a ficha técnica da casa e os dados das casas já entregues.",
  ],
};
