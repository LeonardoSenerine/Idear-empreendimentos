import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CapaLink from "@/components/CapaLink";
import { orcamento as o } from "@/content/orcamento";

/*
 * Capa de compartilhamento da proposta comercial. Só existe em desenvolvimento:
 * `npm run og` salva app/orcamento/opengraph-image.jpg e twitter-image.jpg.
 */
export const metadata: Metadata = {
  title: "Capa de compartilhamento da proposta",
  robots: { index: false, follow: false },
};

export default function OgCoverOrcamento() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <CapaLink
      foto="/images/casa/fachada-frontal.webp"
      posicaoFoto="55% 40%"
      chamada={`${o.titulo} para a Idear`}
      titulo={`${o.subtitulo}.`}
      tamanhoTitulo={70}
      subtitulo={`Para ${o.para}. ${o.validade}`}
      itens={[`Projeto ${o.total}`, "Até 3x", "10% de desconto no Pix"]}
      acao="Ver a proposta"
      comWhatsApp={false}
    />
  );
}
