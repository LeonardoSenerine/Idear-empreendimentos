import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { guia } from "@/content/guia";
import { site } from "@/lib/site";
import Motion from "@/components/Motion";
import Cursor from "@/components/Cursor";
import { GaleriaCriativos, PaletaCores, TesteFonte } from "@/components/guia/GuiaInterativo";

/*
 * Guia da marca, para o cliente acompanhar a identidade e os criativos.
 * Fica fora do menu e do Google: é acessada só pelo link /guia-da-marca.
 */
export const metadata: Metadata = {
  title: "Guia da marca | Idear Empreendimentos",
  description: guia.subtitulo,
  robots: { index: false, follow: false },
  alternates: { canonical: "/guia-da-marca" },
};

const SECOES = [
  { id: "marca", rotulo: "Marca" },
  { id: "logo", rotulo: "Logo" },
  { id: "cores", rotulo: "Cores" },
  { id: "tipografia", rotulo: "Tipografia" },
  { id: "voz", rotulo: "Tom de voz" },
  { id: "imagens", rotulo: "Imagens" },
  { id: "criativos", rotulo: "Criativos" },
];

function Rotulo({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <p className={`text-[12px] font-semibold uppercase tracking-[0.2em] md:text-[13px] ${claro ? "text-bronze-light" : "text-bronze-dark"}`}>
      {children}
    </p>
  );
}

export default function GuiaDaMarca() {
  return (
    <>
      <Motion />
      <Cursor />

      {/* Barra do guia: logo, seções e volta para o site */}
      <header className="sticky top-0 z-50 border-b border-line bg-ivory/95 backdrop-blur-sm">
        <div className="container-idear flex h-16 items-center justify-between gap-6 md:h-[72px]">
          <Link href="/" aria-label="Idear Empreendimentos, ir para o site" className="flex shrink-0 items-center gap-2.5">
            <Image src="/brand/simbolo-cor.png" alt="" width={416} height={570} className="h-8 w-auto" />
            <Image src="/brand/idear-cor.png" alt="Idear" width={738} height={250} className="h-[22px] w-auto" />
          </Link>
          <nav aria-label="Seções do guia" className="hidden items-center gap-6 text-[14px] font-semibold lg:flex">
            {SECOES.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="link-line text-stone hover:text-navy">
                {s.rotulo}
              </a>
            ))}
          </nav>
          <Link href="/" className="btn-outline min-h-[40px] shrink-0 px-4 text-[14px]">
            Ver o site
          </Link>
        </div>
        {/* Celular: seções numa faixa que desliza */}
        <nav aria-label="Seções do guia (celular)" className="sem-scrollbar flex gap-5 overflow-x-auto px-6 pb-3 text-[14px] font-semibold text-stone lg:hidden">
          {SECOES.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 py-1">
              {s.rotulo}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* Abertura: foto cheia e o título num cartão */}
        <section className="relative overflow-hidden lg:grid lg:min-h-[86svh] lg:items-end">
          <div className="relative h-[52svh] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
            <div className="absolute inset-x-0 -top-[8%] h-[116%]" data-img-parallax>
              <Image
                src="/images/casa/fachada-perspectiva.webp"
                alt="Fachada da casa em perspectiva, com escada iluminada e jardim"
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover object-[50%_40%]"
              />
            </div>
            <span className="absolute right-3 top-3 bg-navy/80 px-2.5 py-1 text-[12px] text-ivory lg:bottom-4 lg:right-4 lg:top-auto">
              Imagem ilustrativa
            </span>
          </div>
          <div className="container-idear relative lg:pb-12">
            <div className="relative -mt-14 grid max-w-[640px] gap-5 bg-ivory p-6 md:p-10 lg:mt-0 lg:p-12" data-reveal-group>
              <Image src="/brand/logo-completo.png" alt="Idear Empreendimentos" width={840} height={970} className="h-20 w-auto self-start mix-blend-multiply md:h-28" data-reveal />
              <p className="text-[14px] font-semibold text-bronze-dark" data-reveal>
                Guia da marca, {guia.data.toLowerCase()}
              </p>
              <h1 className="display text-[52px] md:text-[76px]" data-reveal>
                {guia.titulo}
              </h1>
              <p className="max-w-[46ch] text-[17px] text-stone md:text-[18px]" data-reveal>
                {guia.subtitulo}
              </p>
            </div>
          </div>
        </section>

        {/* Marca */}
        <section id="marca" className="section">
          <div className="container-idear">
            <div className="grid-12 gap-y-6">
              <div className="col-span-4 md:col-span-5">
                <Rotulo>Marca</Rotulo>
                <h2 data-split className="h2 mt-4">
                  Quem é a Idear
                </h2>
              </div>
              <p className="col-span-4 text-[18px] text-stone md:col-span-7 md:pt-10">{guia.marca.texto}</p>
            </div>
            <ul className="mt-12 grid gap-5 md:grid-cols-3" data-reveal-group>
              {guia.marca.blocos.map((b) => (
                <li key={b.titulo} className="border border-line bg-white p-7 md:p-8" data-reveal>
                  <h3 className="h3">{b.titulo}</h3>
                  <p className="mt-3 text-stone">{b.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Logo */}
        <section id="logo" className="section bg-sand">
          <div className="container-idear">
            <Rotulo>Logo</Rotulo>
            <h2 data-split className="h2 mt-4">
              Logo
            </h2>
            <p className="mt-5 max-w-[60ch] text-[18px] text-stone">
              Use a versão colorida em fundos claros, a clara sobre o azul-marinho e o símbolo sozinho quando o espaço for pequeno.
            </p>
            <ul className="mt-12 grid gap-5 md:grid-cols-3" data-reveal-group>
              <li data-reveal>
                <div className="grid h-60 place-items-center border border-line bg-ivory">
                  <span className="flex flex-col items-center gap-4">
                    <Image src="/brand/simbolo-cor.png" alt="" width={416} height={570} className="h-20 w-auto" />
                    <Image src="/brand/lettering-cor.png" alt="Logo principal" width={780} height={346} className="h-14 w-auto" />
                  </span>
                </div>
                <p className="mt-3 text-[15px] text-stone">
                  <b className="text-navy">Principal.</b> Sobre fundos claros, marfim ou areia.
                </p>
              </li>
              <li data-reveal>
                <div className="grid h-60 place-items-center bg-navy">
                  <span className="flex flex-col items-center gap-4">
                    <Image src="/brand/simbolo-clara.png" alt="" width={416} height={570} className="h-20 w-auto" />
                    <Image src="/brand/lettering-clara.png" alt="Logo em versão clara" width={780} height={346} className="h-14 w-auto" />
                  </span>
                </div>
                <p className="mt-3 text-[15px] text-stone">
                  <b className="text-navy">Negativa.</b> Sobre o azul-marinho e fotos escuras.
                </p>
              </li>
              <li data-reveal>
                <div className="grid h-60 place-items-center border border-line bg-sand">
                  <Image src="/brand/simbolo-cor.png" alt="Símbolo" width={416} height={570} className="h-28 w-auto" />
                </div>
                <p className="mt-3 text-[15px] text-stone">
                  <b className="text-navy">Símbolo.</b> Avatar, capas de destaque e detalhes.
                </p>
              </li>
            </ul>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-stone">
              {guia.regrasLogo.map((r) => (
                <li key={r} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-bronze" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cores */}
        <section id="cores" className="section">
          <div className="container-idear">
            <div className="grid-12 gap-y-6">
              <div className="col-span-4 md:col-span-5">
                <Rotulo>Cores</Rotulo>
                <h2 data-split className="h2 mt-4">
                  Cores
                </h2>
              </div>
              <p className="col-span-4 text-[18px] text-stone md:col-span-7 md:pt-10">
                Fundos marfim e areia, textos em azul-marinho e detalhes em bronze. Toque em um código para copiar.
              </p>
            </div>
            <PaletaCores />
          </div>
        </section>

        {/* Tipografia */}
        <section id="tipografia" className="section bg-sand">
          <div className="container-idear">
            <Rotulo>Tipografia</Rotulo>
            <h2 data-split className="h2 mt-4">
              Tipografia
            </h2>
            <p className="mt-5 max-w-[60ch] text-[18px] text-stone">
              Cormorant Garamond nos títulos e Manrope nos textos, as mesmas fontes dos criativos.
            </p>
            <div className="mt-12 grid gap-5 md:grid-cols-2" data-reveal-group>
              <div className="border border-line bg-white p-7 md:p-8" data-reveal>
                <p className="font-serif text-[120px] font-medium leading-[0.9] md:text-[170px]">Aa</p>
                <p className="mt-4 text-[20px] font-semibold">Cormorant Garamond</p>
                <p className="mt-2 text-stone">Títulos e números de destaque. Pesos 400 e 500.</p>
              </div>
              <div className="border border-line bg-white p-7 md:p-8" data-reveal>
                <p className="text-[120px] font-medium leading-[0.9] tracking-[-0.04em] md:text-[170px]">Aa</p>
                <p className="mt-4 text-[20px] font-semibold">Manrope</p>
                <p className="mt-2 text-stone">Textos, legendas, rótulos e botões. Pesos 400, 500 e 600.</p>
              </div>
            </div>
            <TesteFonte />
            <p className="mt-5 text-[14px] text-stone">As duas fontes são gratuitas, do Google Fonts.</p>
          </div>
        </section>

        {/* Tom de voz */}
        <section id="voz" className="section">
          <div className="container-idear grid-12 gap-y-10">
            <div className="col-span-4 md:col-span-5">
              <Rotulo>Tom de voz</Rotulo>
              <h2 data-split className="h2 mt-4">
                Como a Idear escreve
              </h2>
              <p className="mt-6 text-[18px] text-stone">{guia.voz.texto}</p>
            </div>
            <div className="col-span-4 md:col-span-7">
              <table className="w-full border-collapse text-[16px] md:text-[17px]">
                <thead>
                  <tr>
                    <th className="border-b border-line pb-3 pr-4 text-left text-[15px] font-semibold text-bronze-dark">Evitar</th>
                    <th className="border-b border-line pb-3 text-left text-[15px] font-semibold text-bronze-dark">Preferir</th>
                  </tr>
                </thead>
                <tbody>
                  {guia.voz.tabela.map(([evitar, preferir]) => (
                    <tr key={evitar}>
                      <td className="border-b border-line py-4 pr-4 align-top text-stone line-through decoration-stone/50">
                        “{evitar}”
                      </td>
                      <td className="border-b border-line py-4 align-top">“{preferir}”</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Imagens */}
        <section id="imagens" className="section bg-sand">
          <div className="container-idear grid-12 items-start gap-y-10">
            <div className="col-span-4 md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden" data-reveal-image>
                <div className="absolute inset-0" data-reveal-zoom>
                  <Image
                    src="/images/casa/gourmet-mesa.webp"
                    alt="Área gourmet com mesa e pendentes de palha"
                    fill
                    quality={90}
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <span className="absolute bottom-3 right-3 bg-navy/80 px-2.5 py-1 text-[12px] text-ivory">Imagem ilustrativa</span>
              </div>
            </div>
            <div className="col-span-4 md:col-span-7 md:pl-6">
              <Rotulo>Imagens</Rotulo>
              <h2 data-split className="h2 mt-4">
                Fotos e renders
              </h2>
              <ol className="mt-8 border-t border-line" data-reveal-group>
                {guia.imagens.map((r, i) => (
                  <li key={r} className="flex items-baseline gap-5 border-b border-line py-5 text-[17px]" data-reveal>
                    <span className="w-6 shrink-0 font-serif text-[28px] leading-none text-bronze">{i + 1}</span>
                    {r}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Criativos */}
        <section id="criativos" className="section">
          <div className="container-idear">
            <div className="grid-12 gap-y-6">
              <div className="col-span-4 md:col-span-6">
                <Rotulo>Criativos</Rotulo>
                <h2 data-split className="h2 mt-4">
                  Criativos para Instagram e Facebook
                </h2>
              </div>
              <p className="col-span-4 text-[18px] text-stone md:col-span-6 md:pt-10">{guia.criativos.resumo}</p>
            </div>
            <GaleriaCriativos />
            <p className="mt-8 text-[14px] text-stone">{guia.criativos.aviso}</p>
          </div>
        </section>

        {/* Próximos passos */}
        <section className="bg-navy py-20 text-ivory lg:py-32">
          <div className="container-idear grid-12 items-end gap-y-10">
            <div className="col-span-4 md:col-span-8">
              <Rotulo claro>Próximos passos</Rotulo>
              <h2 data-split className="h2 mt-4 text-ivory">
                A mesma identidade segue para as peças impressas.
              </h2>
              <ol className="mt-10 border-t border-bronze-light/40" data-reveal-group>
                {guia.proximos.map((p) => (
                  <li key={p.titulo} className="border-b border-bronze-light/40 py-5" data-reveal>
                    <p className="text-[18px] font-semibold">{p.titulo}</p>
                    <p className="mt-1 text-ivory/70">{p.texto}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="col-span-4 md:col-span-4 md:justify-self-end">
              <Image src="/brand/lettering-clara.png" alt="Idear Empreendimentos" width={780} height={346} className="h-20 w-auto md:h-24" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy-deep py-8 text-[14px] text-ivory/70">
        <div className="container-idear flex flex-col gap-2 md:flex-row md:justify-between">
          <span>Idear Empreendimentos, guia da marca, {guia.data.toLowerCase()}</span>
          <span>
            WhatsApp {site.telefoneExibicao}, idearempreendimentos.com.br
          </span>
        </div>
      </footer>
    </>
  );
}
