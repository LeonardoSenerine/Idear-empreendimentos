import type { Metadata } from "next";
import Link from "next/link";
import { casaAtual as casa } from "@/content/casas";
import { site } from "@/lib/site";
import Motion from "@/components/Motion";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FaixaDestaques from "@/components/FaixaDestaques";
import Projeto from "@/components/Projeto";
import FichaTecnica from "@/components/FichaTecnica";
import Galeria from "@/components/Galeria";
import Planta from "@/components/Planta";
import Acabamentos from "@/components/Acabamentos";
import Localizacao from "@/components/Localizacao";
import Agendar from "@/components/Agendar";
import Rodape from "@/components/Rodape";
import WhatsAppFlutuante from "@/components/WhatsAppFlutuante";
import BarraCelular from "@/components/BarraCelular";

const titulo = `Casa à venda em ${casa.cidade}: ${casa.resumo.area} m², ${casa.resumo.suites} suítes e piscina | Idear`;
const descricao = `Pé-direito duplo, área gourmet com churrasqueira, piscina e ${casa.resumo.suites} suítes. Agende sua visita com a Idear pelo WhatsApp.`;

export const metadata: Metadata = {
  title: titulo,
  description: descricao,
  alternates: { canonical: "/casa-a-venda" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/casa-a-venda",
    siteName: site.nome,
    title: titulo,
    description: descricao,
  },
};

function DadosEstruturados() {
  const json = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: casa.manchete,
    description: casa.apresentacao.join(" "),
    url: `${site.url}/casa-a-venda`,
    image: casa.galeria.map((g) => `${site.url}${g.src}`),
    numberOfRooms: casa.resumo.suites,
    numberOfBedrooms: casa.resumo.suites,
    floorSize: { "@type": "QuantitativeValue", value: casa.resumo.area, unitCode: "MTK" },
    address: { "@type": "PostalAddress", addressLocality: casa.cidade, addressRegion: casa.uf, addressCountry: "BR" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "BRL",
      description: casa.preco,
      seller: { "@type": "Organization", name: site.nome, url: site.url, telephone: `+${site.whatsapp}` },
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function CasaAVenda() {
  return (
    <>
      <DadosEstruturados />
      <Motion />
      <Cursor />
      <Header cta={{ href: "#agendar", rotulo: "Agendar visita" }} />
      <main>
        <Hero />
        <FaixaDestaques itens={casa.faixa} rotulo="Destaques da casa" />
        <Projeto />
        <FichaTecnica />
        <Galeria />
        <Planta />
        <Acabamentos />
        <Localizacao />
        <Agendar id="agendar" />
        <nav aria-label="Voltar" className="bg-ivory">
          <div className="container-idear flex flex-col gap-4 py-12 md:flex-row md:items-center md:justify-between">
            <p className="font-serif text-[26px] md:text-[32px]">Conheça também quem constrói.</p>
            <Link href="/" className="btn-outline self-start">
              A Idear e as casas entregues
            </Link>
          </div>
        </nav>
      </main>
      <Rodape />
      <WhatsAppFlutuante />
      <BarraCelular ancora="#agendar" rotulo="Agendar visita" />
    </>
  );
}
