import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Simbolo from "@/components/Simbolo";
import { LogoHorizontal } from "@/components/Logo";
import { linkWhatsApp } from "@/lib/site";
import { casaAtual } from "@/content/casas";

export const metadata: Metadata = {
  title: "Página não encontrada | Idear Empreendimentos",
  robots: { index: false },
};

export default function NaoEncontrada() {
  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy-deep text-ivory">
      <div className="absolute inset-0" aria-hidden>
        <Image src="/images/casa/fachada-perspectiva.webp" alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy-deep/60" />
      </div>

      <header className="container-idear relative flex h-20 items-center">
        <Link href="/" aria-label="Idear Empreendimentos, página inicial">
          <LogoHorizontal variante="clara" />
        </Link>
      </header>

      <div className="container-idear relative flex flex-1 flex-col justify-center py-16">
        <Simbolo className="h-24 w-auto self-start text-bronze-light md:h-32" strokeWidth={1.25} />
        <p className="mt-10 text-[13px] font-semibold uppercase tracking-[0.2em] text-bronze-light">Erro 404</p>
        <h1 className="display mt-4 max-w-[12ch] text-[56px] text-ivory md:text-[96px]">Esta página não foi construída.</h1>
        <p className="mt-6 max-w-[44ch] text-[17px] text-ivory/75">
          O endereço pode ter mudado ou estar digitado errado. As casas, essas sim, continuam de pé.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-claro">
            Voltar para o início
          </Link>
          <Link href="/casa-a-venda" className="btn-outline-claro">
            Ver a Casa {casaAtual.nome}
          </Link>
        </div>
        <a href={linkWhatsApp("Olá, vim pelo site da Idear.")} target="_blank" rel="noopener" className="link-line mt-8 self-start text-[15px] text-ivory/80">
          Ou fale com a Idear pelo WhatsApp
        </a>
      </div>
    </main>
  );
}
