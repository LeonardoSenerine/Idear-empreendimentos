import { linkWhatsApp } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

/** WhatsApp fixo no canto da tela em todas as páginas. */
export default function WhatsAppFlutuante() {
  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noopener"
      data-evento="whatsapp-flutuante"
      aria-label="Falar com a Idear pelo WhatsApp"
      className="fixed bottom-4 right-4 z-40 hidden md:inline-flex h-14 items-center gap-3 rounded bg-navy px-4 text-ivory shadow-[0_10px_30px_-12px_rgba(7,50,79,0.55)] transition-colors duration-300 hover:bg-navy-deep md:bottom-6 md:right-6 md:px-5"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden text-[14px] font-semibold md:inline">WhatsApp</span>
    </a>
  );
}
