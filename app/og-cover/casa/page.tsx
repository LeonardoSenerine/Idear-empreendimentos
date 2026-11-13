import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CapaLink from "@/components/CapaLink";
import { casaAtual as casa } from "@/content/casas";

/*
 * Capa de compartilhamento da página da casa. Só existe em desenvolvimento:
 * `npm run og` salva app/casa-a-venda/opengraph-image.jpg e twitter-image.jpg.
 */
export const metadata: Metadata = {
  title: "Capa de compartilhamento da casa",
  robots: { index: false, follow: false },
};

export default function OgCoverCasa() {
  if (process.env.NODE_ENV === "production") notFound();
  const pavimentos = casa.ficha.find((f) => f.rotulo === "Pavimentos")?.valor;
  return (
    <CapaLink
      foto="/images/casa/fachada-frontal.webp"
      posicaoFoto="52% 40%"
      chamada={`Casa à venda em ${casa.cidade}/${casa.uf}`}
      titulo={`${casa.resumoCurto}.`}
      tamanhoTitulo={80}
      subtitulo="Pé-direito duplo, cozinha integrada e closet na suíte principal."
      itens={[
        `${casa.resumo.area} m²`,
        `${casa.resumo.suites} suítes`,
        `${casa.resumo.vagas} vagas`,
        pavimentos ? `${pavimentos} pavimentos` : "",
      ].filter(Boolean)}
      acao="Agende sua visita pelo WhatsApp"
    />
  );
}
