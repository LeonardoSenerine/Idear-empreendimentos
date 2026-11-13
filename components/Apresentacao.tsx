import Image from "next/image";
import { casaAtual as casa } from "@/content/casas";

function Seta() {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" aria-hidden>
      <path d="M0 5h20M16 1l4 4-4 4" />
    </svg>
  );
}

export default function Apresentacao() {
  const imagem = casa.imagemAmpla;
  return (
    <section id="a-casa" aria-label="A casa" className="pt-24 lg:pt-40">
      <div className="container-idear">
        {/* Frase de abertura que acende com a rolagem */}
        <p data-words-scrub className="statement max-w-[24ch] lg:pl-[8.33%]">
          {casa.apresentacao[0]}
        </p>

        <div className="grid-12 mt-12 gap-y-8 lg:mt-16">
          <p className="col-span-4 text-stone md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-8" data-reveal-group>
            <span data-reveal className="block">
              {casa.apresentacao[1]}
            </span>
          </p>
          <div
            className="col-span-4 flex flex-wrap gap-x-10 gap-y-3 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-8"
            data-reveal-group
          >
            <a href="#ficha-tecnica" className="link-seta" data-reveal>
              Ficha técnica <Seta />
            </a>
            <a href="#planta" className="link-seta" data-reveal>
              Planta <Seta />
            </a>
          </div>
        </div>
      </div>

      {/* Imagem que se abre até a largura total */}
      <div data-expand className="relative mt-20 h-[64svh] overflow-hidden md:h-[80svh] lg:mt-28 lg:h-[100svh]">
        <div className="absolute inset-0" data-expand-inner>
          <Image
            src={imagem.src}
            alt={imagem.alt}
            fill
            sizes="100vw"
            className="object-cover object-[50%_62%]"
          />
        </div>
        {imagem.ilustrativa ? <span className="legenda-ilustrativa lg:bottom-5 lg:right-5">Imagem ilustrativa</span> : null}
      </div>
    </section>
  );
}
