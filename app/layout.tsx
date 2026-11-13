import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { casaAtual } from "@/content/casas";
import { site } from "@/lib/site";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const titulo = `Casa à venda em ${casaAtual.bairro}, ${casaAtual.cidade} | ${site.nome}`;
const descricao = `Casa ${casaAtual.nome}: ${casaAtual.resumo.area} m², ${casaAtual.resumo.suites} suítes e ${casaAtual.resumo.vagas} vagas em ${casaAtual.bairro}, ${casaAtual.cidade}. Agende uma visita com a Idear Empreendimentos.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: titulo,
  description: descricao,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.nome,
    title: titulo,
    description: descricao,
    images: [{ url: "/images/casa/fachada-frontal.webp", width: 1440, height: 1440, alt: casaAtual.hero.poster.alt }],
  },
  // Prévia: não indexar até o conteúdo real ser aprovado
  robots: casaAtual.provisorio ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#FAF8F4",
};

// Liga as animações de entrada só quando o usuário não pediu movimento reduzido
// A abertura com o símbolo aparece só na primeira visita da sessão
const motionScript = `try{var d=document.documentElement;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-motion');try{if(sessionStorage.getItem('idear-intro')){d.classList.add('sem-intro')}}catch(e){d.classList.add('sem-intro')}setTimeout(function(){if(!window.__idearMotion){d.classList.remove('js-motion')}},4000)}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
