#!/usr/bin/env python3
"""Bake the Snowdin arena: the supplied Snowdin Town screenshot as backdrop + a snow-topped stone slab to fight on.

The slab geometry here must match game/js/config.js (STAGE).
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'source', 'snowdin.webp')
OUT = os.path.join(HERE, '..', 'game', 'assets', 'stage', 'snowdin.webp')

W, H = 1000, 667
X0, X1 = 130, 870           # slab left/right
TOP, FRONT, BOT = 335, 560, 604   # far edge, near edge (start of stone face), bottom of stone face

rng = np.random.default_rng(7)
bg = Image.open(SRC).convert('RGB').resize((W, H), Image.NEAREST)
a = np.array(bg).astype(np.float32)

# --- slightly deepen the whole town so fighters pop, stronger toward the very top (HUD area)
yy = np.linspace(0, 1, H)[:, None, None]
a *= (0.82 + 0.18 * np.clip(yy * 2.2, 0, 1))
a = np.clip(a, 0, 255)

# --- void under the slab
void = np.zeros((H - FRONT, W, 3), np.float32)
g = np.linspace(0, 1, H - FRONT)[:, None, None]
void[:] = np.array((22, 26, 54), np.float32) * (1 - g) + np.array((6, 7, 20), np.float32) * g
a[FRONT:] = void

# --- slab top: night snow
top = np.zeros((FRONT - TOP, X1 - X0, 3), np.float32)
base = np.array((92, 112, 166), np.float32)
top[:] = base
h, w = top.shape[:2]
# gentle chunky noise at three scales (nearest-upscaled => pixel-art look, low amplitude so it stays calm)
for scale, amp in ((60, 5), (12, 3.2), (3, 2.2)):
    n = rng.normal(0, 1, (h // scale + 2, w // scale + 2))
    n = np.kron(n, np.ones((scale, scale)))[:h, :w]
    top += (n * amp)[:, :, None] * np.array((1.0, 1.0, 0.85))
yy_, xx_ = np.mgrid[0:h, 0:w]
# vignette toward the edges + depth gradient (far edge slightly darker)
ex = np.minimum(xx_, w - 1 - xx_) / 60.0
ey = np.minimum(yy_, h - 1 - yy_) / 40.0
edge = np.clip(np.minimum(ex, ey), 0, 1)
top *= (0.82 + 0.18 * edge)[:, :, None]
top *= (0.92 + 0.12 * (yy_ / h))[:, :, None]
# snow drifts: soft light ellipses, dithered edge
def drift(cx, cy, rx, ry, amt):
    m = ((xx_ - cx) / rx) ** 2 + ((yy_ - cy) / ry) ** 2
    t = np.clip(1 - m, 0, 1)
    dither = (rng.random((h, w)) < t * 1.6).astype(np.float32)
    top[:] += (dither * amt)[:, :, None] * np.array((1.0, 1.0, 1.0))
for _ in range(14):
    drift(rng.integers(20, w - 20), rng.integers(10, h - 10), rng.integers(30, 80), rng.integers(8, 20), 14)
# footprints / pebbles / sparkle
for _ in range(26):
    x, y = rng.integers(8, w - 8), rng.integers(8, h - 8)
    top[y:y + 2, x:x + 3] = (70, 86, 134)
for _ in range(70):
    x, y = rng.integers(0, w), rng.integers(0, h)
    top[y, x] = (176, 198, 238)
a[TOP:FRONT, X0:X1] = np.clip(top, 0, 255)

# --- slab face: procedural cobble wall in the palette of the screenshot's own stone
fh = BOT - FRONT
face = np.zeros((fh, X1 - X0, 3), np.float32)
face[:] = (52, 56, 74)                                   # mortar
fw = X1 - X0
y = 0; row = 0
while y < fh:
    rh = 11 if row % 2 == 0 else 10
    x = -int(rng.integers(0, 14))
    while x < fw:
        sw = int(rng.integers(16, 26))
        c = np.array((98, 102, 120), np.float32) + rng.normal(0, 5, 3) * np.array((1, 1, 1.2))
        x0_, x1_ = max(0, x + 1), min(fw, x + sw - 1)
        y0_, y1_ = y + 1, min(fh, y + rh - 1)
        if x1_ > x0_ and y1_ > y0_:
            face[y0_:y1_, x0_:x1_] = c
            face[y0_:y0_ + 1, x0_:x1_] = c + 14                      # top highlight
            face[y1_ - 1:y1_, x0_:x1_] = c - 22                      # bottom shade
            face[y0_:y1_, x0_:x0_ + 1] = c + 6
        x += sw
    y += rh; row += 1
face *= np.linspace(1.0, 0.62, fh)[:, None, None]       # darker toward the void
a[FRONT:BOT, X0:X1] = face

img = Image.fromarray(a.astype(np.uint8))
d = ImageDraw.Draw(img)
# rim highlights + outlines
d.rectangle([X0, TOP, X1 - 1, TOP], fill=(196, 212, 244))
d.rectangle([X0, TOP - 1, X1 - 1, TOP - 1], fill=(12, 14, 34))
d.rectangle([X0 - 1, TOP, X0 - 1, BOT], fill=(12, 14, 34)); d.rectangle([X1, TOP, X1, BOT], fill=(12, 14, 34))
d.rectangle([X0, FRONT, X1 - 1, FRONT + 1], fill=(222, 232, 250))      # snow lip over the stone
d.rectangle([X0, FRONT + 2, X1 - 1, FRONT + 3], fill=(60, 72, 110))
d.rectangle([X0 - 1, BOT, X1, BOT], fill=(12, 14, 34))
# snow overhang bumps on the lip
for x in range(X0, X1, 6):
    hgt = int(rng.integers(2, 6))
    d.rectangle([x, FRONT + 2, x + int(rng.integers(3, 6)), FRONT + 2 + hgt], fill=(222, 232, 250))
# arena markings: faint dashed inner border so the walkable limit reads clearly
for x in range(X0 + 14, X1 - 14, 10):
    d.rectangle([x, TOP + 12, x + 4, TOP + 12], fill=(118, 142, 196))
    d.rectangle([x, FRONT - 9, x + 4, FRONT - 9], fill=(118, 142, 196))
for y in range(TOP + 12, FRONT - 9, 10):
    d.rectangle([X0 + 14, y, X0 + 14, y + 4], fill=(118, 142, 196))
    d.rectangle([X1 - 15, y, X1 - 15, y + 4], fill=(118, 142, 196))
# snowflake emblem in the middle
cx, cy = (X0 + X1) // 2, (TOP + FRONT) // 2
col = (116, 140, 194)
for ang in range(0, 180, 45):
    import math
    dx, dy = math.cos(math.radians(ang)), math.sin(math.radians(ang)) * 0.7
    for r in range(-34, 35):
        px, py = int(cx + dx * r), int(cy + dy * r)
        d.point((px, py), fill=col)
d.ellipse([cx - 5, cy - 3, cx + 5, cy + 3], outline=col)

# soft shadow of the slab on the town above its far edge (reads as depth)
sh = Image.new('L', (W, H), 0)
ImageDraw.Draw(sh).rectangle([X0 - 4, TOP - 14, X1 + 4, TOP], fill=70)
sh = sh.filter(ImageFilter.GaussianBlur(6))
dark = Image.new('RGB', (W, H), (4, 6, 20))
img = Image.composite(dark, img, sh)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
img.save(OUT, 'WEBP', lossless=True, quality=100, method=6)
img.save(OUT.replace('.webp', '.preview.png'))
print('wrote', OUT, os.path.getsize(OUT), 'bytes')
