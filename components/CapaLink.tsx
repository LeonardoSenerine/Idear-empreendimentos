import Image from "next/image";
import WhatsAppIcon from "./WhatsAppIcon";

/*
 * Arte da capa de compartilhamento (Open Graph), 1200x630.
 * Usada só pelas páginas /og-cover (desenvolvimento). `npm run og` fotografa o quadro #og
 * e salva em app/opengraph-image.jpg (home) e app/casa-a-venda/opengraph-image.jpg (casa).
 */
type Props = {
  foto: string;
  posicaoFoto?: string;
  chamada: string;
  titulo: string;
  tamanhoTitulo: number;
  subtitulo?: string;
  itens?: string[];
  /** chamada para ação no botão em bronze (com ícone do WhatsApp) */
  acao: string;
};

export default function CapaLink({ foto, posicaoFoto = "50% 45%", chamada, titulo, tamanhoTitulo, subtitulo, itens, acao }: Props) {
  return (
    // Cobre o resto da página: a captura pega só este quadro de 1200x630
    <div className="fixed inset-0 z-[100] bg-navy-deep">
      <div id="og" className="relative h-[630px] w-[1200px] overflow-hidden bg-navy-deep text-ivory">
        {/* Foto à direita, fundindo com o painel escuro */}
        <div className="absolute inset-y-0 right-0 w-[700px]">
          <Image
            src={foto}
            alt=""
            fill
            priority
            quality={90}
            sizes="700px"
            className="object-cover"
            style={{ objectPosition: posicaoFoto }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/35 via-25% to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-deep/75 to-transparent" />
        </div>

        {/* Painel de texto */}
        <div className="relative flex h-full w-[700px] flex-col justify-between pb-[64px] pl-[72px] pt-[54px]">
          <div className="flex items-center gap-4">
            <Image src="/brand/simbolo-clara.png" alt="" width={416} height={570} className="h-[56px] w-auto" />
            <Image src="/brand/idear-clara.png" alt="" width={738} height={250} className="h-[36px] w-auto" />
          </div>

          <div>
            <p className="text-[19px] font-semibold uppercase tracking-[0.2em] text-bronze-light">{chamada}</p>
            <p className="mt-4 max-w-[600px] font-serif leading-[0.98] tracking-[-0.015em]" style={{ fontSize: tamanhoTitulo }}>
              {titulo}
            </p>
            {subtitulo ? <p className="mt-5 max-w-[540px] text-[23px] leading-snug text-ivory/80">{subtitulo}</p> : null}
            {itens?.length ? (
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {itens.map((t) => (
                  <li key={t} className="border border-ivory/30 px-4 py-2 text-[18px] font-semibold text-ivory/90">
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <p className="text-[19px] font-medium text-ivory/60">idearempreendimentos.com.br</p>
        </div>

        {/* Chamada para ação */}
        <div className="absolute bottom-[64px] right-[56px] flex items-center gap-3.5 bg-bronze-dark px-7 py-[18px] text-[23px] font-semibold shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]">
          <WhatsAppIcon className="h-7 w-7" />
          {acao}
        </div>

        {/* Faixa em bronze no rodapé, como nos outros projetos */}
        <div className="absolute inset-x-0 bottom-0 h-[12px] bg-bronze" />
      </div>
    </div>
  );
}
