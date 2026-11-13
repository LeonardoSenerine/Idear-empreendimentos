import { linkWhatsApp } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

/**
 * Celular: barra fixa no rodapé da tela com as duas ações principais.
 * Substitui o botão flutuante de WhatsApp em telas pequenas.
 */
export default function BarraCelular({ ancora = "#contato", rotulo = "Agendar visita" }: { ancora?: string; rotulo?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ivory/10 bg-navy-deep/95 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
      <div className="flex gap-2">
        <a href={ancora} className="btn-claro min-h-[48px] flex-1 px-3 text-[15px]">
          {rotulo}
        </a>
        <a
          href={linkWhatsApp()}
          target="_blank"
          rel="noopener"
          data-evento="whatsapp-barra"
          aria-label="Falar pelo WhatsApp"
          className="btn min-h-[48px] bg-bronze-dark px-5 text-ivory"
        >
          <WhatsAppIcon className="h-5 w-5" />
          <span className="text-[15px]">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
