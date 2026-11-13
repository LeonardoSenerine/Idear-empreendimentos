import { casaAtual as casa } from "@/content/casas";
import { site } from "@/lib/site";
import Motion from "@/components/Motion";
import Intro from "@/components/Intro";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Apresentacao from "@/components/Apresentacao";
import FichaTecnica from "@/components/FichaTecnica";
import Galeria from "@/components/Galeria";
import Planta from "@/components/Planta";
import Acabamentos from "@/components/Acabamentos";
import Localizacao from "@/components/Localizacao";
import Processo from "@/components/Processo";
import CasasEntregues from "@/components/CasasEntregues";
import Agendar from "@/components/Agendar";
import Rodape from "@/components/Rodape";
import WhatsAppFlutuante from "@/components/WhatsAppFlutuante";
import SeloPrevia from "@/components/SeloPrevia";

function DadosEstruturados() {
  const json = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: `Casa ${casa.nome}`,
    description: casa.apresentacao.join(" "),
    url: site.url,
    image: `${site.url}${casa.hero.poster.src}`,
    numberOfRooms: casa.resumo.suites,
    numberOfBedrooms: casa.resumo.suites,
    floorSize: { "@type": "QuantitativeValue", value: casa.resumo.area, unitCode: "MTK" },
    address: {
      "@type": "PostalAddress",
      addressLocality: casa.cidade,
      addressRegion: casa.uf,
      addressCountry: "BR",
    },
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

export default function Home() {
  return (
    <>
      <DadosEstruturados />
      <Motion />
      <Intro />
      <a
        href="#a-casa"
        className="sr-only z-[70] bg-navy px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <Apresentacao />
        <FichaTecnica />
        <Galeria />
        <Planta />
        <Acabamentos />
        <Localizacao />
        <Processo />
        <CasasEntregues />
        <Agendar />
      </main>
      <Rodape />
      <WhatsAppFlutuante />
      {casa.provisorio ? <SeloPrevia /> : null}
    </>
  );
}
