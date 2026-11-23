import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CapaLink from "@/components/CapaLink";
import { empresa } from "@/content/empresa";

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
  const n = (trecho: string) => empresa.numeros.find((x) => x.rotulo.includes(trecho));
  const anos = n("anos construindo");
  const casas = n("casas entregues");
  return (
    <CapaLink
      foto="/images/casa/fachada-perspectiva.webp"
      posicaoFoto="58% 42%"
      chamada={`Incorporadora em ${empresa.cidade}/SP`}
      titulo="Casas de alto padrão, do terreno às chaves."
      tamanhoTitulo={66}
      subtitulo="Uma casa por vez, com projeto, obra e entrega sob a mesma responsabilidade."
      itens={
        anos || casas
          ? [anos ? `${anos.valor} anos` : "", casas ? `${casas.valor} casas entregues` : ""].filter(Boolean)
          : ["Projeto", "Obra", "Entrega das chaves"]
      }
      acao="Casa à venda: agende sua visita"
    />
  );
}
