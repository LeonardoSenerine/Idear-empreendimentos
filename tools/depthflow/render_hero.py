"""Loop DepthFlow do hero da Idear: câmera lenta e discreta, como num filme de arquitetura.

Uso: python render_hero.py IMAGEM SAIDA LARGURA ALTURA SEGUNDOS [ssaa] [--depth DEPTH.png]
O movimento é periódico em `self.cycle` (0 → 2π no tempo total), então o vídeo fecha o loop sem corte.
"""

import math
import sys
from pathlib import Path

from attrs import define
from depthflow.scene import DepthScene


@define
class IdearHero(DepthScene):
    def update(self) -> None:
        c = self.cycle
        s = self.state
        s.height = 0.14          # intensidade da paralaxe: baixa, sem deformar a arquitetura
        s.steady = 0.32          # plano de pivô próximo da fachada
        s.isometric = 0.65       # raios mais paralelos = menos distorção de perspectiva
        s.sticky = True
        s.zoom = 0.97            # margem para as bordas não aparecerem
        # deslize lateral lento com leve elipse vertical (fecha o loop)
        s.offset = (0.30 * math.sin(c), 0.07 * math.cos(c))
        # aproximação muito sutil, também periódica
        s.dolly = 0.25 * (0.5 - 0.5 * math.cos(c))


def main() -> None:
    args = sys.argv[1:]
    depth = None
    if "--depth" in args:
        i = args.index("--depth")
        depth = Path(args[i + 1])
        del args[i : i + 2]
    image, out, w, h, t = Path(args[0]), Path(args[1]), int(args[2]), int(args[3]), float(args[4])
    ssaa = float(args[5]) if len(args) > 5 else 1.5
    backend = "glfw"  # no Windows o "headless" depende de EGL e trava; glfw abre janela invisível ao exportar

    scene = IdearHero(backend=backend)
    scene.ffmpeg.h264(preset="slow", crf=16)  # intermediário de alta qualidade; o peso final sai na recodificação
    scene.input(image=image, depth=depth)
    scene.main(output=out, width=w, height=h, time=t, fps=30, ssaa=ssaa)


if __name__ == "__main__":
    import os

    main()
    # no Windows a janela GLFW mantém o processo vivo depois do export; o arquivo já está fechado aqui
    os._exit(0)
