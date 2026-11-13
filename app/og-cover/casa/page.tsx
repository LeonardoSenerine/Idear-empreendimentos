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
  return (
    <CapaLink
      foto="/images/casa/fachada-frontal.webp"
      posicaoFoto="50% 40%"
      chamada={`À venda em ${casa.bairro}, ${casa.cidade}`}
      titulo={`Casa ${casa.nome}`}
      tamanhoTitulo={118}
      linha={`${casa.resumo.area} m², ${casa.resumo.suites} suítes e ${casa.resumo.vagas} vagas`}
      selo="Agende uma visita"
    />
  );
}
