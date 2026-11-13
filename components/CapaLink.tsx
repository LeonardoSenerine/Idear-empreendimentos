import Image from "next/image";

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
  linha?: string;
  selo?: string;
};

export default function CapaLink({ foto, posicaoFoto = "50% 45%", chamada, titulo, tamanhoTitulo, linha, selo }: Props) {
  return (
    // Cobre o resto da página: a captura pega só este quadro de 1200x630
    <div className="fixed inset-0 z-[100] bg-navy-deep">
      <div id="og" className="relative h-[630px] w-[1200px] overflow-hidden bg-navy-deep text-ivory">
        {/* Foto à direita, fundindo com o painel escuro */}
        <div className="absolute inset-y-0 right-0 w-[760px]">
          <Image
            src={foto}
            alt=""
            fill
            priority
            quality={90}
            sizes="760px"
            className="object-cover"
            style={{ objectPosition: posicaoFoto }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/40 via-30% to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/70 to-transparent" />
        </div>

        {/* Painel de texto */}
        <div className="relative flex h-full w-[700px] flex-col justify-between py-[56px] pl-[72px]">
          <div className="flex items-center gap-4">
            <Image src="/brand/simbolo-clara.png" alt="" width={416} height={570} className="h-[60px] w-auto" />
            <Image src="/brand/idear-clara.png" alt="" width={738} height={250} className="h-[38px] w-auto" />
          </div>

          <div>
            <p className="text-[20px] font-semibold uppercase tracking-[0.2em] text-bronze-light">{chamada}</p>
            <p className="mt-5 font-serif leading-[0.94] tracking-[-0.015em]" style={{ fontSize: tamanhoTitulo }}>
              {titulo}
            </p>
            {linha ? <p className="mt-6 font-serif text-[40px] leading-none text-ivory/90">{linha}</p> : null}
            <p className="mt-7 text-[22px] font-medium text-ivory/70">idearempreendimentos.com.br</p>
          </div>
        </div>

        {selo ? (
          <div className="absolute bottom-[56px] right-[56px] flex items-center gap-3 bg-bronze-dark px-6 py-4 text-[22px] font-semibold">
            <span className="h-2.5 w-2.5 rounded-full bg-bronze-light" />
            {selo}
          </div>
        ) : null}

        {/* Faixa em bronze no rodapé, como nos outros projetos */}
        <div className="absolute inset-x-0 bottom-0 h-[12px] bg-bronze" />
      </div>
    </div>
  );
}
