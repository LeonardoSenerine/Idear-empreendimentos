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

- Trocar tudo que está entre colchetes em `content/casas.ts` e `lib/site.ts`, e mudar `provisorio` para `false`. Isso remove o selo de prévia e libera a indexação.
- Vídeo do hero: exportar o DepthFlow (8–12 s, MP4 H.264 + WebM, até 4 MB no desktop e 2 MB no celular), colocar em `public/video/` e preencher `hero.video`.
- Planta: colocar o SVG ou a imagem de cada pavimento em `public/images/` e preencher `pavimentos[].planta`. Sem esse campo, aparece a planta ilustrativa.
- Galeria e casas entregues: os itens com `src: null` aparecem como "Imagem a receber".
- Imagens que são fotos reais da casa: usar `ilustrativa: false`.
- Configurar `RESEND_API_KEY` e `CONTATO_EMAIL` na Vercel.
- Ainda pendentes do briefing: as páginas `/casas-entregues`, `/a-idear`, `/contato` e a política de privacidade.

### Quando a casa for vendida

Mova a casa para `casasEntregues` e preencha `casaAtual` com a próxima.
