"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";

declare global {
  interface Window {
    __idearMotion?: boolean;
    __idearLenis?: Lenis | null;
    __idearIntroDone?: boolean;
  }
}

/**
 * Movimento lento e contínuo, como num filme de arquitetura.
 *
 * Atributos usados nas seções:
 * - [data-split]            título revelado palavra por palavra (máscara), ao entrar na tela
 * - [data-split="hero"]     idem, mas disparado pela sequência de abertura do hero
 * - [data-words-scrub]      parágrafo que "acende" palavra por palavra conforme a rolagem
 * - [data-reveal-group] > [data-reveal]   fade + subida, 80 ms entre itens
 * - [data-reveal-image] > [data-reveal-zoom]   imagem revelada de baixo para cima com zoom 1,08 → 1
 * - [data-img-parallax]     imagem que desliza devagar dentro da moldura
 * - [data-expand] > [data-expand-inner]   imagem que se abre até a largura total com a rolagem
 * - [data-line]             fio de 1 px que se desenha da esquerda
 * - [data-count]            número contando até o valor
 * - [data-draw]             SVG que se desenha com a rolagem (símbolo); [data-draw-once] desenha uma vez
 * - [data-hscroll] > [data-hscroll-track]   galeria horizontal fixa no desktop
 * - [data-step]             etapa que acende quando está no centro da tela
 * - [data-progress-y]       fio vertical de progresso
 * - [data-speed]            deslocamento vertical relativo (profundidade)
 */

const EASE = "idear";

function splitWords(el: HTMLElement, mask: boolean) {
  if (el.dataset.splitDone) return el.querySelectorAll<HTMLElement>(mask ? ".mask > span" : "[data-w]");
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    const parts = (node.textContent ?? "").split(/(\s+)/);
    const frag = document.createDocumentFragment();
    parts.forEach((p) => {
      if (!p) return;
      if (/^\s+$/.test(p)) {
        frag.appendChild(document.createTextNode(p));
        return;
      }
      if (mask) {
        const outer = document.createElement("span");
        outer.className = "mask";
        const inner = document.createElement("span");
        inner.textContent = p;
        outer.appendChild(inner);
        frag.appendChild(outer);
      } else {
        const w = document.createElement("span");
        w.dataset.w = "";
        w.textContent = p;
        frag.appendChild(w);
      }
    });
    node.parentNode?.replaceChild(frag, node);
  });
  el.dataset.splitDone = "1";
  // leitores de tela continuam lendo o texto inteiro
  if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", el.textContent?.replace(/\s+/g, " ").trim() ?? "");
  el.querySelectorAll<HTMLElement>(".mask, [data-w]").forEach((s) => s.setAttribute("aria-hidden", "true"));
  return el.querySelectorAll<HTMLElement>(mask ? ".mask > span" : "[data-w]");
}

export default function Motion() {
  useEffect(() => {
    window.__idearMotion = true;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      root.classList.remove("js-motion");
      return;
    }

    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create(EASE, "0.22, 1, 0.36, 1");

    // Smooth scroll só com ponteiro fino (no celular fica o scroll nativo)
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);
    if (window.matchMedia("(pointer: fine)").matches) {
      lenis = new Lenis({ lerp: 0.09, anchors: { offset: -72 } });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }
    window.__idearLenis = lenis;

    // Divide os textos uma vez só (mutação de DOM fica fora do matchMedia)
    const splitHero = document.querySelectorAll<HTMLElement>('[data-split="hero"]');
    const splitTitles = gsap.utils.toArray<HTMLElement>('[data-split]:not([data-split="hero"])');
    const scrubTexts = gsap.utils.toArray<HTMLElement>("[data-words-scrub]");
    splitHero.forEach((el) => splitWords(el, true));
    splitTitles.forEach((el) => splitWords(el, true));
    scrubTexts.forEach((el) => splitWords(el, false));

    let heroTocado = false;
    const mm = gsap.matchMedia();

    mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };

      /* ---------- Hero: sequência de abertura ---------- */
      const heroMedia = document.querySelector<HTMLElement>("[data-hero-media]");
      const heroZoom = document.querySelector<HTMLElement>("[data-hero-zoom]");
      const heroWords = Array.from(splitHero).flatMap((el) => Array.from(el.querySelectorAll<HTMLElement>(".mask > span")));
      const heroFade = gsap.utils.toArray<HTMLElement>("[data-hero-fade]");
      gsap.set(splitHero, { visibility: "visible" });

      const tocarHero = () => {
        if (heroTocado) {
          gsap.set(heroMedia, { clipPath: "inset(0% 0% 0% 0%)" });
          gsap.set(heroFade, { opacity: 1, y: 0 });
          return;
        }
        heroTocado = true;
        const tl = gsap.timeline({ defaults: { ease: EASE } });
        if (heroMedia) tl.fromTo(heroMedia, { clipPath: "inset(7% 7% 7% 7%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8 }, 0);
        if (heroZoom) tl.fromTo(heroZoom, { scale: 1.18 }, { scale: 1, duration: 2.2 }, 0);
        tl.fromTo(heroWords, { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.07 }, 0.35);
        tl.fromTo(heroFade, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.7);
      };

      if (window.__idearIntroDone || root.classList.contains("sem-intro")) tocarHero();
      else {
        const onDone = () => tocarHero();
        window.addEventListener("idear:intro-done", onDone, { once: true });
        const failsafe = window.setTimeout(tocarHero, 3200);
        ctx.add(() => () => {
          window.removeEventListener("idear:intro-done", onDone);
          window.clearTimeout(failsafe);
        });
      }

      // Rolagem do hero: mídia afunda devagar, texto sobe um pouco mais rápido
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax || 10),
          ease: "none",
          scrollTrigger: { trigger: el.closest("section") ?? el, start: "top top", end: "bottom top", scrub: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.speed),
          ease: "none",
          scrollTrigger: { trigger: el.closest("section") ?? el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      /* ---------- Títulos com máscara ---------- */
      splitTitles.forEach((el) => {
        gsap.set(el, { visibility: "visible" });
        const words = el.querySelectorAll<HTMLElement>(".mask > span");
        gsap.fromTo(
          words,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.15,
            ease: EASE,
            stagger: Math.min(0.06, 0.7 / Math.max(words.length, 1)),
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          },
        );
      });

      /* ---------- Texto que acende com a rolagem ---------- */
      scrubTexts.forEach((el) => {
        const words = el.querySelectorAll<HTMLElement>("[data-w]");
        gsap.fromTo(
          words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 52%", scrub: 0.6 },
          },
        );
      });

      /* ---------- Entradas em grupo ---------- */
      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!items.length) return;
        gsap.fromTo(
          items,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: EASE,
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-image]").forEach((el) => {
        const zoom = el.querySelector<HTMLElement>("[data-reveal-zoom]");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: EASE });
        if (zoom) tl.fromTo(zoom, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: EASE }, 0);
      });

      gsap.utils.toArray<HTMLElement>("[data-img-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      /* ---------- Imagem que se abre até a largura total ---------- */
      gsap.utils.toArray<HTMLElement>("[data-expand]").forEach((el) => {
        const inner = el.querySelector<HTMLElement>("[data-expand-inner]");
        const inset = desktop ? "12% 16% 12% 16%" : "6% 6% 6% 6%";
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 92%", end: desktop ? "top 8%" : "top 30%", scrub: 1 },
        });
        tl.fromTo(el, { clipPath: `inset(${inset})` }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0);
        if (inner) tl.fromTo(inner, { scale: 1.22 }, { scale: 1, ease: "none" }, 0);
      });

      /* ---------- Fios ---------- */
      ScrollTrigger.batch("[data-line]", {
        start: "top 92%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { scaleX: 1, duration: 1.4, ease: EASE, stagger: 0.06 }),
      });

      /* ---------- Números ---------- */
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const final = Number(el.dataset.count);
        if (!Number.isFinite(final)) return;
        const obj = { v: 0 };
        el.textContent = "0";
        gsap.to(obj, {
          v: final,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString("pt-BR");
          },
        });
        ctx.add(() => () => {
          el.textContent = final.toLocaleString("pt-BR");
        });
      });

      /* ---------- SVGs que se desenham ---------- */
      const prepararTracos = (svg: SVGSVGElement) => {
        const paths = svg.querySelectorAll<SVGGeometryElement>("path, line, polyline, rect, circle");
        paths.forEach((p) => {
          const len = p.getTotalLength();
          p.style.strokeDasharray = `${len}`;
          p.style.strokeDashoffset = `${len}`;
        });
        return paths;
      };
      gsap.utils.toArray<SVGSVGElement>("[data-draw]").forEach((svg) => {
        const paths = prepararTracos(svg);
        gsap.to(paths, {
          strokeDashoffset: 0,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: svg.closest("[data-draw-trigger]") ?? svg,
            start: "top 75%",
            end: desktop ? "40% 50%" : "top 10%",
            scrub: 1,
          },
        });
      });
      // pode ser um <svg> ou um <g> dentro dele
      gsap.utils.toArray<SVGSVGElement>("[data-draw-once]").forEach((svg) => {
        const paths = prepararTracos(svg);
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: EASE,
          stagger: 0.04,
          scrollTrigger: { trigger: svg, start: "top 80%", once: true },
        });
      });

      /* ---------- Galeria horizontal (desktop) ---------- */
      if (desktop) {
        gsap.utils.toArray<HTMLElement>("[data-hscroll]").forEach((section) => {
          const track = section.querySelector<HTMLElement>("[data-hscroll-track]");
          if (!track) return;
          const distancia = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
          const tween = gsap.to(track, {
            x: () => -distancia(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distancia()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
          const barra = section.querySelector<HTMLElement>("[data-hscroll-progress]");
          if (barra) {
            gsap.fromTo(
              barra,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distancia()}`, scrub: true },
              },
            );
          }
          track.querySelectorAll<HTMLElement>("[data-hscroll-img]").forEach((img) => {
            gsap.fromTo(
              img,
              { xPercent: -5 },
              {
                xPercent: 5,
                ease: "none",
                scrollTrigger: { containerAnimation: tween, trigger: img.parentElement, start: "left right", end: "right left", scrub: true },
              },
            );
          });
        });
      }

      /* ---------- Etapas do processo ---------- */
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 62%",
          end: "bottom 38%",
          toggleClass: { targets: el, className: "is-active" },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-progress-y]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top 62%", end: "bottom 38%", scrub: true },
          },
        );
      });
    });

    // Recalcula depois que fontes e imagens assentarem
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
      gsap.ticker.remove(tick);
      lenis?.destroy();
      window.__idearLenis = null;
    };
  }, []);

  return null;
}
