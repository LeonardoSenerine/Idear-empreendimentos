import { casaAtual } from "@/content/casas";

export const site = {
  nome: "Idear Empreendimentos",
  // URL absoluta usada no SEO e nas imagens de compartilhamento. Sem NEXT_PUBLIC_SITE_URL,
  // usa o domínio de produção que a Vercel injeta no build; em último caso, o endereço atual na Vercel.
  // Enquanto idearempreendimentos.com.br apontar para o site antigo, não use esse domínio aqui:
  // a capa do link seria procurada no site antigo e não apareceria.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://idear-one.vercel.app"),
  cidade: "Itatiba",
  uf: "SP",
  telefoneExibicao: "(11) 98217-2522",
  whatsapp: "5511982172522",
  email: "contato@idearempreendimentos.com.br",
  instagram: "https://instagram.com/idearempreendimentos",
  instagramUsuario: "@idearempreendimentos",
  // Confirmar com o cliente antes de publicar
  cnpj: "[00.000.000/0001-00]",
  creci: "[CRECI, se houver]",
  registroIncorporacao: "[Registro de incorporação, quando houver]",
  endereco: "[Endereço comercial]",
  horarioVisitas: "Segunda a sábado, com hora marcada",
};

export function linkWhatsApp(mensagem?: string) {
  const texto =
    mensagem ??
    `Olá, gostaria de agendar uma visita à casa à venda da Idear em ${casaAtual.cidade}.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;
}
