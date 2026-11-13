"""Gera o mapa de profundidade (Depth Anything V2) da fachada quadrada e o recorte 16:9 correspondente."""

import sys
import time

import numpy as np
from PIL import Image

from depthflow.estimators.anything import DepthAnythingV2

src, model = sys.argv[1], sys.argv[2]
crop_y, crop_h = int(sys.argv[3]), int(sys.argv[4])

img = Image.open(src).convert("RGB")
t0 = time.time()
est = DepthAnythingV2(model=model)
depth = est.estimate(np.asarray(img))  # float32 0..1, já pós-processado
print("estimado em", round(time.time() - t0, 1), "s, shape", depth.shape, "min/max", float(depth.min()), float(depth.max()))

d16 = (np.clip(depth, 0, 1) * 65535).astype(np.uint16)
dimg = Image.fromarray(d16).resize(img.size, Image.BICUBIC)
dimg.save("depth-1x1.png")
w, h = img.size
dimg.crop((0, crop_y, w, crop_y + crop_h)).save("depth-16x9.png")
# prévia 8 bits para inspeção visual
Image.fromarray((np.asarray(dimg) / 257).astype(np.uint8)).save("depth-preview.png")
print("ok", dimg.size)
