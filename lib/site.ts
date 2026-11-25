import { casaAtual } from "@/content/casas";

export const site = {
  nome: "Idear Empreendimentos",
  // URL absoluta usada no SEO e nas imagens de compartilhamento. Sem NEXT_PUBLIC_SITE_URL,
  // usa o domínio oficial (www.idearempreendimentos.com.br, já apontado para a Vercel).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.idearempreendimentos.com.br",
  cidade: "Itatiba",
  uf: "SP",
  telefoneExibicao: "(11) 98389-5608",
  whatsapp: "5511983895608",
  email: "contato@idearempreendimentos.com.br",
  instagram: "https://instagram.com/idearempreendimentos",
  instagramUsuario: "@idearempreendimentos",
  // Ocultos a pedido do cliente (23/11/2026) enquanto define os dados da empresa.
  // Vazio = não aparece no site; basta preencher para voltar a exibir.
  cnpj: "",
  creci: "",
  registroIncorporacao: "",
  endereco: "",
  horarioVisitas: "Segunda a sábado, com hora marcada",
};

export function linkWhatsApp(mensagem?: string) {
  const texto =
    mensagem ??
    `Olá, gostaria de agendar uma visita à casa à venda da Idear em ${casaAtual.cidade}.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;
}
