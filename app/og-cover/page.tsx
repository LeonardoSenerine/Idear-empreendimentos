import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CapaLink from "@/components/CapaLink";
import { empresa } from "@/content/empresa";
import { casaAtual } from "@/content/casas";

/*
 * Capa de compartilhamento da home. Só existe em desenvolvimento:
 * `npm run og` abre esta página no Edge headless e salva app/opengraph-image.jpg e twitter-image.jpg.
 */
export const metadata: Metadata = {
  title: "Capa de compartilhamento",
  robots: { index: false, follow: false },
};

export default function OgCover() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <CapaLink
      foto="/images/casa/fachada-perspectiva.webp"
      posicaoFoto="55% 42%"
      chamada="Itatiba/SP"
      titulo={empresa.hero.titulo}
      tamanhoTitulo={92}
      selo={`À venda: Casa ${casaAtual.nome}`}
    />
  );
}
