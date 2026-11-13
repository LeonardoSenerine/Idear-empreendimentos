import { LogoEmpilhado } from "./Logo";
import { linkWhatsApp, site } from "@/lib/site";

export default function Rodape() {
  const ano = new Date().getFullYear();
  return (
    <footer className="bg-navy text-ivory">
      <div className="container-idear grid-12 gap-y-12 py-20 lg:py-28">
        <div className="col-span-4 md:col-span-4">
          <LogoEmpilhado variante="clara" />
          <p className="mt-8 max-w-[34ch] text-[15px] text-ivory/75">
            Incorporadora de casas unifamiliares. Projeto, obra e entrega sob uma única responsabilidade.
          </p>
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-6">
          <p className="eyebrow text-bronze-light">Contato</p>
          <ul className="mt-6 space-y-3 text-[15px]">
            <li>
              <a href={linkWhatsApp()} target="_blank" rel="noopener" className="link-line" data-evento="whatsapp-rodape">
                WhatsApp {site.telefoneExibicao}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-line break-all">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener" className="link-line">
                Instagram {site.instagramUsuario}
              </a>
            </li>
            <li className="text-ivory/75">{site.endereco}</li>
          </ul>
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-10">
          <p className="eyebrow text-bronze-light">Navegação</p>
          <ul className="mt-6 space-y-3 text-[15px]">
            <li>
              <a href="/casa-a-venda" className="link-line">
                Casa à venda
              </a>
            </li>
            <li>
              <a href="/#casas-entregues" className="link-line">
                Casas entregues
              </a>
            </li>
            <li>
              <a href="/#a-idear" className="link-line">
                A Idear
              </a>
            </li>
            <li>
              <a href="/#contato" className="link-line">
                Agendar visita
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="container-idear flex flex-col gap-4 pb-28 pt-8 text-[13px] leading-relaxed text-ivory/70 md:flex-row md:justify-between md:gap-10">
          <p className="max-w-[70ch]">
            Imagens meramente ilustrativas. Medidas, acabamentos e valores podem sofrer alterações sem aviso prévio.{" "}
            {site.registroIncorporacao}.
          </p>
          <p className="shrink-0 md:text-right">
            © {ano} {site.nome}
            <br />
            CNPJ {site.cnpj}
            <br />
            {site.creci}
          </p>
        </div>
      </div>
    </footer>
  );
}
