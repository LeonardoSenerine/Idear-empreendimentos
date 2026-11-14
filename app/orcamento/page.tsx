import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { orcamento as o } from "@/content/orcamento";
import Motion from "@/components/Motion";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/*
 * Proposta comercial para a Idear, para o cliente acompanhar.
 * Fora do menu e do Google: acessada só pelo link /orcamento.
 */
export const metadata: Metadata = {
  title: "Proposta comercial | Idear Empreendimentos",
  description: `${o.subtitulo}: ${o.total} no projeto e ${o.manutencao} de manutenção. Para ${o.para}.`,
  robots: { index: false, follow: false },
  alternates: { canonical: "/orcamento" },
};

const SECOES = [
  { id: "apresentacao", rotulo: "Apresentação" },
  { id: "diagnostico", rotulo: "Diagnóstico" },
  { id: "antes-e-depois", rotulo: "Antes e depois" },
  { id: "escopo", rotulo: "Escopo" },
  { id: "investimento", rotulo: "Investimento" },
  { id: "condicoes", rotulo: "Condições" },
];

function Rotulo({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <p className={`text-[12px] font-semibold uppercase tracking-[0.2em] md:text-[13px] ${claro ? "text-bronze-light" : "text-bronze-dark"}`}>
      {children}
    </p>
  );
}

function Tabela({ cabecalho, linhas, destaque }: { cabecalho: string[]; linhas: string[][]; destaque?: string[][] }) {
  return (
    <div className="sem-scrollbar -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
      <table className="w-full min-w-[620px] border-collapse text-left text-[15px] md:min-w-0 md:text-[16px]">
        <thead>
          <tr>
            {cabecalho.map((c, i) => (
              <th key={i} className="border-b border-navy/30 pb-3 pr-5 text-[14px] font-semibold text-bronze-dark">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((l) => (
            <tr key={l[0]}>
              {l.map((c, i) => (
                <td key={i} className={`border-b border-line py-4 pr-5 align-top ${i === 0 ? "font-semibold" : "text-stone"}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
          {destaque?.map((l) => (
            <tr key={l[0]} className="bg-sand">
              {l.map((c, i) => (
                <td key={i} className={`border-b border-line py-4 pl-3 pr-5 align-top first:pl-3 ${i === 0 ? "font-semibold" : ""}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Orcamento() {
  const whatsapp = `https://wa.me/${o.de.whatsapp}?text=${encodeURIComponent(
    "Olá, Leonardo. Vi a proposta do site da Idear e quero conversar.",
  )}`;

  return (
    <>
      <Motion />

      <header className="sticky top-0 z-50 border-b border-line bg-ivory/95 backdrop-blur-sm">
        <div className="container-idear flex h-16 items-center justify-between gap-6 md:h-[72px]">
          <Link href="/" aria-label="Idear Empreendimentos, ir para o site" className="flex shrink-0 items-center gap-2.5">
            <Image src="/brand/simbolo-cor.png" alt="" width={416} height={570} className="h-8 w-auto" />
            <Image src="/brand/idear-cor.png" alt="Idear" width={738} height={250} className="h-[22px] w-auto" />
          </Link>
          <nav aria-label="Seções da proposta" className="hidden items-center gap-6 text-[14px] font-semibold lg:flex">
            {SECOES.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="link-line text-stone hover:text-navy">
                {s.rotulo}
              </a>
            ))}
          </nav>
          <a href={whatsapp} target="_blank" rel="noopener" className="btn-primary min-h-[40px] shrink-0 px-4 text-[14px]">
            Responder
          </a>
        </div>
        <nav aria-label="Seções da proposta (celular)" className="sem-scrollbar flex gap-5 overflow-x-auto px-6 pb-3 text-[14px] font-semibold text-stone lg:hidden">
          {SECOES.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 py-1">
              {s.rotulo}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* Abertura */}
        <section className="relative overflow-hidden bg-navy-deep text-ivory">
          <div className="absolute inset-0" aria-hidden>
            <Image src="/images/casa/fachada-frontal.webp" alt="" fill priority quality={90} sizes="100vw" className="object-cover object-[60%_40%] opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40" />
          </div>
          <div className="container-idear relative grid-12 gap-y-10 py-20 lg:py-32">
            <div className="col-span-4 md:col-span-12 lg:col-span-7" data-reveal-group>
              <Rotulo claro>
                {o.titulo}, {o.data}
              </Rotulo>
              <h1 className="display mt-5 text-[48px] text-ivory md:text-[80px]" data-reveal>
                {o.subtitulo}.
              </h1>
              <p className="mt-6 text-[17px] text-ivory/80" data-reveal>
                Para {o.para}. {o.validade}
              </p>
            </div>
            <dl className="col-span-4 grid grid-cols-2 self-end border-t border-ivory/25 md:col-span-12 lg:col-span-4 lg:col-start-9 lg:grid-cols-1 lg:border-t-0 lg:bg-navy-deep/40 lg:backdrop-blur-md">
              <div className="flex flex-col-reverse justify-end py-5 pr-4 lg:px-7 lg:py-6">
                <dt className="mt-1 text-[13px] text-ivory/70">projeto completo, pagamento único</dt>
                <dd className="whitespace-nowrap font-serif text-[30px] leading-none min-[400px]:text-[40px] md:text-[56px]">{o.total}</dd>
              </div>
              <div className="flex flex-col-reverse justify-end border-l border-ivory/20 py-5 pl-4 lg:border-l-0 lg:border-t lg:px-7 lg:py-6">
                <dt className="mt-1 text-[13px] text-ivory/70">manutenção do site, opcional</dt>
                <dd className="whitespace-nowrap font-serif text-[30px] leading-none min-[400px]:text-[40px] md:text-[56px]">{o.manutencao}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Apresentação */}
        <section id="apresentacao" className="section">
          <div className="container-idear grid-12 gap-y-8">
            <div className="col-span-4 md:col-span-5">
              <Rotulo>Apresentação</Rotulo>
              <h2 data-split className="h2 mt-4">
                Uma proposta, um objetivo.
              </h2>
            </div>
            <div className="col-span-4 space-y-5 text-[18px] md:col-span-7 md:pt-10" data-reveal-group>
              {o.apresentacao.map((p) => (
                <p key={p} data-reveal>
                  {p}
                </p>
              ))}
              <dl className="grid gap-3 border-t border-line pt-6 text-[16px]" data-reveal>
                <div className="flex gap-3">
                  <dt className="w-12 font-semibold">Para</dt>
                  <dd className="text-stone">{o.para}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-12 font-semibold">De</dt>
                  <dd className="text-stone">
                    {o.de.nome},{" "}
                    <a href={o.de.site} target="_blank" rel="noopener" className="link-line text-navy">
                      {o.de.siteRotulo}
                    </a>
                    , WhatsApp{" "}
                    <a href={whatsapp} target="_blank" rel="noopener" className="link-line text-navy">
                      {o.de.whatsappRotulo}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Diagnóstico */}
        <section id="diagnostico" className="section bg-sand">
          <div className="container-idear">
            <Rotulo>Diagnóstico</Rotulo>
            <h2 data-split className="h2 mt-4 max-w-[20ch]">
              O que o site antigo não mostrava.
            </h2>
            <p className="mt-6 max-w-[62ch] text-[18px] text-stone">{o.diagnostico.texto}</p>
            <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
              <div>
                <p className="text-[15px] font-semibold">Situação atual</p>
                <ul className="mt-4 border-t border-navy/20" data-reveal-group>
                  {o.diagnostico.situacao.map((s) => (
                    <li key={s} className="border-b border-navy/15 py-4 text-stone" data-reveal>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[15px] font-semibold">O que pesa na decisão de quem compra uma casa de alto padrão</p>
                <ul className="mt-4 border-t border-navy/20" data-reveal-group>
                  {o.diagnostico.decisao.map(([t, d]) => (
                    <li key={t} className="border-b border-navy/15 py-4" data-reveal>
                      <span className="font-semibold">{t}:</span> <span className="text-stone">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-8 text-[17px]">{o.diagnostico.fecho}</p>
          </div>
        </section>

        {/* Antes e depois */}
        <section id="antes-e-depois" className="section">
          <div className="container-idear">
            <Rotulo>Antes e depois</Rotulo>
            <h2 data-split className="h2 mt-4 max-w-[20ch]">
              Do modelo genérico ao site da Idear.
            </h2>
            <p className="mt-6 max-w-[62ch] text-[18px] text-stone">{o.antesDepois.texto}</p>
            <div className="mt-12 grid gap-8 lg:grid-cols-[2.1fr_1fr] lg:items-start">
              {o.antesDepois.imagens.map((img) => (
                <figure key={img.src} className="overflow-hidden border border-line bg-ivory" data-reveal-image>
                  <div data-reveal-zoom>
                    <Image src={img.src} alt={img.alt} width={img.largura} height={img.altura} quality={90} sizes="(min-width: 1024px) 66vw, 100vw" className="h-auto w-full" />
                  </div>
                </figure>
              ))}
            </div>
            <p className="mt-4 text-[13px] text-stone">{o.antesDepois.legenda}</p>
            <div className="mt-12">
              <Tabela cabecalho={["", "Site antigo", "Site novo"]} linhas={o.antesDepois.tabela} />
            </div>
          </div>
        </section>

        {/* Escopo */}
        <section id="escopo" className="section bg-sand">
          <div className="container-idear">
            <Rotulo>Escopo dos serviços</Rotulo>
            <h2 data-split className="h2 mt-4 max-w-[20ch]">
              Três frentes, uma identidade.
            </h2>
            <p className="mt-6 max-w-[62ch] text-[18px] text-stone">{o.escopo.texto}</p>
            <ol className="mt-12 grid gap-6 lg:grid-cols-3" data-reveal-group>
              {o.escopo.frentes.map((f, i) => (
                <li key={f.titulo} className="border border-line bg-white p-7 md:p-8" data-reveal>
                  <span className="font-serif text-[28px] leading-none text-bronze">{i + 1}</span>
                  <h3 className="h3 mt-3">{f.titulo}</h3>
                  <ul className="mt-5 space-y-3 text-[15px] text-stone">
                    {f.itens.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45 bg-bronze" aria-hidden />
                        {it}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Investimento */}
        <section id="investimento" className="section">
          <div className="container-idear">
            <Rotulo>Investimento</Rotulo>
            <h2 data-split className="h2 mt-4">
              {o.total} no projeto, {o.manutencao} de manutenção.
            </h2>
            <p className="mt-6 max-w-[62ch] text-[18px] text-stone">{o.investimento.texto}</p>
            <div className="mt-10">
              <Tabela
                cabecalho={["Item", "O que inclui", "Valor"]}
                linhas={o.investimento.itens}
                destaque={[o.investimento.totalLinha, o.investimento.mensalLinha]}
              />
            </div>
            <p className="mt-6 text-[15px] text-stone">{o.investimento.observacao}</p>
            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
              <p className="text-[16px] text-stone">{o.investimento.manutencao}</p>
              <div>
                <p className="text-[15px] font-semibold">Formas de pagamento</p>
                <ul className="mt-4 border-t border-line">
                  {o.investimento.pagamento.map((p) => (
                    <li key={p} className="border-b border-line py-3.5 text-stone">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Terceiros e condições */}
        <section id="condicoes" className="section bg-sand">
          <div className="container-idear">
            <Rotulo>Custos de terceiros</Rotulo>
            <h2 data-split className="h2 mt-4 max-w-[22ch]">
              Custos de terceiros e o que não está incluso.
            </h2>
            <p className="mt-6 max-w-[62ch] text-[18px] text-stone">{o.terceiros.texto}</p>
            <div className="mt-10">
              <Tabela cabecalho={["Item", "Custo aproximado", "Observação"]} linhas={o.terceiros.tabela} />
            </div>
            <p className="mt-6 max-w-[80ch] text-[15px] text-stone">{o.terceiros.naoIncluso}</p>

            <div className="mt-20 grid gap-12 md:grid-cols-2">
              <div>
                <h3 className="h3">Condições gerais</h3>
                <p className="mt-3 text-stone">{o.validade}</p>
                <ul className="mt-5 border-t border-navy/20">
                  {o.condicoes.map((c) => (
                    <li key={c} className="border-b border-navy/15 py-3.5 text-stone">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="h3">Próximos passos</h3>
                <ol className="mt-5 border-t border-navy/20">
                  {o.proximos.map((p, i) => (
                    <li key={p} className="flex gap-4 border-b border-navy/15 py-3.5">
                      <span className="w-5 shrink-0 font-serif text-[22px] leading-none text-bronze">{i + 1}</span>
                      <span className="text-stone">{p}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Chamada */}
        <section className="bg-navy py-20 text-ivory lg:py-28">
          <div className="container-idear flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Rotulo claro>Vamos começar</Rotulo>
              <h2 data-split className="h2 mt-4 max-w-[16ch] text-ivory">
                Aprovou ou tem alguma dúvida?
              </h2>
              <p className="mt-5 max-w-[46ch] text-ivory/75">Responda pelo WhatsApp e agendamos a reunião de alinhamento.</p>
            </div>
            <a href={whatsapp} target="_blank" rel="noopener" className="btn-claro self-start md:self-auto">
              <WhatsAppIcon className="h-5 w-5" />
              Falar com o Leonardo
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-navy-deep py-8 text-[14px] text-ivory/70">
        <div className="container-idear flex flex-col gap-2 md:flex-row md:justify-between">
          <span>Proposta comercial para a Idear Empreendimentos, {o.data}</span>
          <span>
            {o.de.nome}, {o.de.siteRotulo}
          </span>
        </div>
      </footer>
    </>
  );
}
