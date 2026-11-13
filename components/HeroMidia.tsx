"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CasaAtual } from "@/content/casas";

/**
 * Poster (elemento LCP, carregado com prioridade) + vídeo DepthFlow em loop por cima.
 * O vídeo só entra depois da hidratação, com fade quando começa a tocar, então o poster
 * segue sendo o LCP e não há salto de enquadramento.
 * Com prefers-reduced-motion ou economia de dados, fica só o poster.
 * Sem vídeo configurado, o poster recebe um zoom lento para simular profundidade.
 */
export default function HeroMidia({ hero }: { hero: CasaAtual["hero"] }) {
  const [mostrarVideo, setMostrarVideo] = useState(false);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    if (!hero.video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const economia = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    setMostrarVideo(!reduce && !economia);
  }, [hero.video]);

  const poster = hero.poster;

  return (
    // começa 12% acima da moldura para o parallax nunca mostrar o fundo
    <div className="absolute inset-x-0 -top-[12%] bottom-0 overflow-hidden" data-parallax="10">
      <div className={`absolute inset-0 ${hero.video ? "" : "hero-drift"}`}>
        <Image
          src={poster.src!}
          alt={poster.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[50%_32%]"
        />
        {hero.video && mostrarVideo ? (
          <video
            className={`absolute inset-0 h-full w-full object-cover object-[50%_32%] transition-opacity duration-[1200ms] ease-idear ${
              tocando ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden
            tabIndex={-1}
            onPlaying={() => setTocando(true)}
          >
            {hero.video.webmMobile ? (
              <source src={hero.video.webmMobile} type="video/webm" media="(max-width: 1023px)" />
            ) : null}
            {hero.video.mp4Mobile ? (
              <source src={hero.video.mp4Mobile} type="video/mp4" media="(max-width: 1023px)" />
            ) : null}
            <source src={hero.video.webm} type="video/webm" />
            <source src={hero.video.mp4} type="video/mp4" />
          </video>
        ) : null}
      </div>
    </div>
  );
}
