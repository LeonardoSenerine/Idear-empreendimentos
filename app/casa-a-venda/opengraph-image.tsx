import { renderCapa, TAMANHO_CAPA } from "@/lib/og";
import { casaAtual as casa } from "@/content/casas";

export const alt = `Casa ${casa.nome}, à venda em ${casa.bairro}, ${casa.cidade}`;
export const size = TAMANHO_CAPA;
export const contentType = "image/jpeg";

export default function Capa() {
  return renderCapa({
    fundo: "fundo-casa.jpg",
    chamada: `À venda em ${casa.bairro}, ${casa.cidade}`,
    titulo: `Casa ${casa.nome}`,
    tamanhoTitulo: 124,
    linha: `${casa.resumo.area} m², ${casa.resumo.suites} suítes e ${casa.resumo.vagas} vagas`,
    selo: "Agende uma visita",
  });
}
