import { renderCapa, TAMANHO_CAPA } from "@/lib/og";
import { empresa } from "@/content/empresa";
import { casaAtual } from "@/content/casas";

export const alt = "Idear Empreendimentos: casas construídas para durar";
export const size = TAMANHO_CAPA;
export const contentType = "image/jpeg";

export default function Capa() {
  return renderCapa({
    fundo: "fundo-home.jpg",
    chamada: empresa.hero.chamada,
    titulo: empresa.hero.titulo,
    tamanhoTitulo: 96,
    selo: `À venda: Casa ${casaAtual.nome}`,
  });
}
