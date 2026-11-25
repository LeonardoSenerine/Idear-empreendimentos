import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Só as páginas públicas e indexáveis. Orçamento, guia da marca e rotas de capa ficam fora (noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  return [
    { url: `${site.url}/`, lastModified: agora, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/casa-a-venda`, lastModified: agora, changeFrequency: "weekly", priority: 0.9 },
  ];
}
