# Idear Empreendimentos — site

Home da casa à venda, conforme o briefing de redesign (etapa 1: prévia).
Next.js (App Router) + TypeScript + Tailwind, GSAP + ScrollTrigger e Lenis.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Dados da casa atual e das casas entregues | `content/casas.ts` |
| Telefone, WhatsApp, e-mail, CNPJ, CRECI | `lib/site.ts` |
| Cores, fontes e escala | `tailwind.config.ts` e `app/globals.css` |
| Envio do formulário (Resend) | `app/api/contato/route.ts` + `.env.example` |

### Antes de publicar

- Trocar tudo que está entre colchetes em `content/casas.ts`, `content/empresa.ts` e `lib/site.ts` e mudar `provisorio` para `false`, o que remove o selo de prévia e libera a indexação. Depois, rodar `npm run og` para atualizar as capas de link.
- Vídeo do hero: exportar o DepthFlow (8–12 s, MP4 H.264 + WebM, até 4 MB no desktop e 2 MB no celular), colocar em `public/video/` e preencher `hero.video`.
- Planta: colocar o SVG ou a imagem de cada pavimento em `public/images/` e preencher `pavimentos[].planta`. Sem esse campo, aparece a planta ilustrativa.
- Galeria e casas entregues: os itens com `src: null` aparecem como "Imagem a receber".
- Imagens que são fotos reais da casa: usar `ilustrativa: false`.
- Configurar `RESEND_API_KEY` e `CONTATO_EMAIL` na Vercel.
- Ainda pendentes do briefing: as páginas `/casas-entregues`, `/a-idear`, `/contato` e a política de privacidade.

## Capa de compartilhamento (Open Graph)

A imagem que aparece ao compartilhar o link (WhatsApp, Instagram, Facebook, X) fica em
`app/opengraph-image.jpg` e `twitter-image.jpg` (home) e em `app/casa-a-venda/` (página da casa),
em 1200×630, com texto alternativo nos `.alt.txt`.
A arte são as páginas `app/og-cover/page.tsx` e `app/og-cover/casa/page.tsx` (só existem em
desenvolvimento; em produção dão 404). Para regerar depois de mudar a arte ou o nome da casa:

```bash
npm run dev   # em outro terminal
npm run og
```

As prévias usam URLs absolutas. Na Vercel o domínio de produção do projeto é usado automaticamente;
quando o domínio próprio estiver apontado para o site novo, defina `NEXT_PUBLIC_SITE_URL`
(ex.: `https://idearempreendimentos.com.br`) e faça um novo deploy.
Para conferir a prévia: https://developers.facebook.com/tools/debug/ (o WhatsApp usa o mesmo leitor).

### Quando a casa for vendida

Mova a casa para `casasEntregues` e preencha `casaAtual` com a próxima.
