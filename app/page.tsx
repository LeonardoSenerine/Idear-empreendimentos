import { empresa } from "@/content/empresa";
import { casaAtual as casa } from "@/content/casas";
import { site } from "@/lib/site";
import Motion from "@/components/Motion";
import Cursor from "@/components/Cursor";
import Intro from "@/components/Intro";
import Header from "@/components/Header";
import HeroEmpresa from "@/components/HeroEmpresa";
import FaixaDestaques from "@/components/FaixaDestaques";
import Idear from "@/components/Idear";
import Processo from "@/components/Processo";
import CasaDestaque from "@/components/CasaDestaque";
import CasasEntregues from "@/components/CasasEntregues";
import Faq from "@/components/Faq";
import Agendar from "@/components/Agendar";
import Rodape from "@/components/Rodape";
import WhatsAppFlutuante from "@/components/WhatsAppFlutuante";
import BarraCelular from "@/components/BarraCelular";

function DadosEstruturados() {
  const json = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.nome,
    url: site.url,
    logo: `${site.url}/brand/logo-completo.png`,
    image: `${site.url}${casa.hero.poster.src}`,
    description: empresa.hero.texto,
    telephone: `+${site.whatsapp}`,
    email: site.email,
    areaServed: empresa.cidade,
    sameAs: [site.instagram],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

export default function Home() {
  return (
    <>
      <DadosEstruturados />
      <Motion />
      <Intro />
      <Cursor />
      <a
        href="#a-idear"
        className="sr-only z-[70] bg-navy px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <HeroEmpresa />
        <FaixaDestaques itens={empresa.faixa} rotulo="Como a Idear trabalha" />
        <Idear />
        <Processo />
        <CasaDestaque />
        <CasasEntregues />
        <Faq />
        <Agendar
          id="contato"
          titulo="Vamos conversar sobre a sua próxima casa."
          texto={`Agende uma visita à Casa ${casa.nome} ou peça para ser avisado quando a próxima casa da Idear for lançada.`}
          assunto="Contato pelo site"
        />
      </main>
      <Rodape />
      <WhatsAppFlutuante />
      <BarraCelular ancora="#contato" rotulo="Fale conosco" />
    </>
  );
}
