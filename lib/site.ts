import { casaAtual } from "@/content/casas";

export const site = {
  nome: "Idear Empreendimentos",
  url: "https://idearempreendimentos.com.br",
  telefoneExibicao: "(11) 91404-1150",
  whatsapp: "5511914041150",
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
    `Olá, gostaria de agendar uma visita à Casa ${casaAtual.nome}, em ${casaAtual.bairro}, ${casaAtual.cidade}.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;
}
