import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CapaLink from "@/components/CapaLink";
import { guia } from "@/content/guia";

/*
 * Capa de compartilhamento do guia da marca. Só existe em desenvolvimento:
 * `npm run og` salva app/guia-da-marca/opengraph-image.jpg e twitter-image.jpg.
 */
export const metadata: Metadata = {
  title: "Capa de compartilhamento do guia da marca",
  robots: { index: false, follow: false },
};

export default function OgCoverGuia() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <CapaLink
      foto="/images/casa/gourmet-mesa.webp"
      posicaoFoto="50% 55%"
      chamada={`Guia da marca, ${guia.data.toLowerCase()}`}
      titulo={guia.titulo}
      tamanhoTitulo={92}
      subtitulo="Identidade visual e comunicação da Idear para o site, o Instagram e o Facebook."
      itens={["Logo", "Cores", "Tipografia", "Tom de voz", "39 criativos"]}
      acao="Abrir o guia da marca"
      comWhatsApp={false}
    />
  );
}
