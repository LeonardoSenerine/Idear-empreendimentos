# Vídeo do hero (DepthFlow)

Loop 2.5D de 10 s gerado a partir do render da fachada: Depth Anything V2 (base) para a profundidade e DepthFlow 1.0.1 para a câmera.

## Ambiente (Windows)

O DepthFlow precisa de Python ≤ 3.13, então ele roda num ambiente separado do site:

```bash
python -m pip install --user uv
uv venv --python 3.12 .venv
uv pip install --python .venv/Scripts/python.exe depthflow imageio-ffmpeg
```

- **ffmpeg:** copie o binário do imageio-ffmpeg (`.venv/Lib/site-packages/imageio_ffmpeg/binaries/ffmpeg-*.exe`) para uma pasta `bin/` como `ffmpeg.exe` e coloque essa pasta no PATH. No Git Bash, use `cygpath -u` para converter o caminho, porque o `C:` quebra o PATH.
- **Backend:** use `glfw`. O `headless` depende de EGL e trava no Windows.

## Passos

1. **Fonte:** prepare a imagem quadrada (`fachada-1x1.png`) e o recorte 16:9 (`fachada-16x9.png`), recortado na altura de 32%, igual ao `object-position` do hero.
2. **Profundidade** (cerca de 70 s em CPU):
   ```bash
   python make_depth.py fachada-1x1.png base 202 810
   ```
   Isso gera `depth-1x1.png` e `depth-16x9.png`.
3. **Masters** (cerca de 30 s cada na Iris Xe):
   ```bash
   python render_hero.py fachada-16x9.png master-desktop.mp4 1920 1080 10 1.5 --depth depth-16x9.png
   python render_hero.py fachada-1x1.png  master-mobile.mp4  1080 1080 10 1.5 --depth depth-1x1.png
   ```
4. **Web:** codifique em duas passadas e copie para `public/video/`.

| Arquivo | Resolução | Bitrate | Peso |
| --- | --- | --- | --- |
| `fachada-desktop.mp4` | 1920×1080, H.264 | 3100k | 3,8 MB |
| `fachada-desktop.webm` | 1920×1080, VP9 | 2700k | 3,4 MB |
| `fachada-mobile.mp4` | 1080×1080, H.264 | 1550k | 1,9 MB |
| `fachada-mobile.webm` | 1080×1080, VP9 | 1350k | 1,7 MB |

Fonte: a fachada frontal em 1600 px, com supersampling 2× no render. Os passos acima reproduzem estes arquivos, trocando o supersampling do render (sexto argumento) de 1.5 para 2.0.

Os limites do briefing são 4 MB no desktop e 2 MB no celular. Use `-movflags +faststart` no MP4 e não inclua áudio.

## Movimento

O movimento está em `IdearHero.update()` e é periódico em `self.cycle`, então o loop não tem corte. Os parâmetros são:

- **Deslize lateral:** `offset.x = 0,30·sin`, com elipse vertical de 0,07.
- **Aproximação:** dolly até 0,25.
- **Paralaxe:** `height` 0,14, `isometric` 0,65 e `zoom` 0,97.

Os valores foram escolhidos para dar profundidade sem entortar a arquitetura. Se o vídeo final vier do modelo 3D do arquiteto, ele substitui estes arquivos com os mesmos nomes.
