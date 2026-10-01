#!/usr/bin/env python3
"""Bake the Snowdin arena: the supplied Snowdin Town screenshot as backdrop + a snow-topped stone slab to fight on.

The slab geometry here must match game/js/config.js (STAGE).
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'source', 'snowdin.webp')
OUT_DIR = os.path.join(HERE, '..', 'game', 'assets', 'stage')

W, H = 1000, 667
X0, X1 = 130, 870           # slab left/right
TOP, FRONT, BOT = 335, 560, 604   # far edge, near edge (start of stone face), bottom of stone face

def snowdin():
    OUT = os.path.join(OUT_DIR, 'snowdin.webp')
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
    print('wrote', OUT, os.path.getsize(OUT), 'bytes')



# ---------------------------------------------------------------------------------------------- shared helpers
def finish(img, name):
    os.makedirs(OUT_DIR, exist_ok=True)
    out = os.path.join(OUT_DIR, name + '.webp')
    img.save(out, 'WEBP', lossless=True, quality=100, method=6)
    print('wrote', out, os.path.getsize(out), 'bytes')


def noise_layer(rng, h, w, scales, amps):
    out = np.zeros((h, w), np.float32)
    for scale, amp in zip(scales, amps):
        n = rng.normal(0, 1, (h // scale + 2, w // scale + 2))
        out += np.kron(n, np.ones((scale, scale)))[:h, :w] * amp
    return out


def slab_outline(img, fill_lip=(222, 232, 250), edge=(12, 14, 34), mark=(118, 142, 196)):
    d = ImageDraw.Draw(img)
    d.rectangle([X0, TOP, X1 - 1, TOP], fill=fill_lip)
    d.rectangle([X0, TOP - 1, X1 - 1, TOP - 1], fill=edge)
    d.rectangle([X0 - 1, TOP, X0 - 1, BOT], fill=edge); d.rectangle([X1, TOP, X1, BOT], fill=edge)
    d.rectangle([X0 - 1, BOT, X1, BOT], fill=edge)
    for x in range(X0 + 14, X1 - 14, 10):
        d.rectangle([x, TOP + 12, x + 4, TOP + 12], fill=mark); d.rectangle([x, FRONT - 9, x + 4, FRONT - 9], fill=mark)
    for y in range(TOP + 12, FRONT - 9, 10):
        d.rectangle([X0 + 14, y, X0 + 14, y + 4], fill=mark); d.rectangle([X1 - 15, y, X1 - 15, y + 4], fill=mark)
    return d


# ---------------------------------------------------------------------------------------------- frozen lake (slippery!)
def ice():
    rng = np.random.default_rng(21)
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    sky = np.zeros((H, W, 3), np.float32)
    t = np.clip(yy / 330.0, 0, 1)[:, :, None]
    sky[:] = np.array((6, 10, 34), np.float32) * (1 - t) + np.array((24, 58, 96), np.float32) * t
    # aurora ribbons
    for k, (col, base, amp, ph) in enumerate([((60, 255, 170), 120, 38, 0.0), ((120, 120, 255), 90, 30, 1.7), ((90, 230, 255), 150, 26, 3.1)]):
        wave = base + amp * np.sin(xx / 95.0 + ph) + 14 * np.sin(xx / 31.0 + ph * 2)
        dist = np.abs(yy - wave)
        a = np.clip(1 - dist / (46 + 14 * k), 0, 1) ** 2 * 0.55 * np.clip(1 - yy / 300.0, 0.15, 1)
        sky += a[:, :, None] * np.array(col, np.float32)
    # stars
    for _ in range(170):
        x, y = rng.integers(0, W), rng.integers(0, 230)
        sky[y, x] = (235, 245, 255)
    # distant mountains + pines
    ridge = 235 + 22 * np.sin(xx / 120.0 + 0.6) + 12 * np.sin(xx / 47.0)
    mask = yy > ridge
    sky[mask] = np.array((14, 26, 52), np.float32)
    ridge2 = 262 + 14 * np.sin(xx / 70.0 + 2.0) + 7 * np.sin(xx / 23.0)
    sky[yy > ridge2] = np.array((9, 18, 40), np.float32)
    img = Image.fromarray(np.clip(sky, 0, 255).astype(np.uint8))
    d = ImageDraw.Draw(img)
    for x in range(-10, W + 10, 26):                      # pine silhouettes along the shore
        h = int(rng.integers(26, 52)); y0 = 300 - int(rng.integers(0, 14))
        for lvl in range(4):
            w = 6 + lvl * 5
            d.polygon([(x, y0 - h + lvl * 12), (x - w, y0 - h + lvl * 12 + 16), (x + w, y0 - h + lvl * 12 + 16)], fill=(6, 14, 30))
        d.rectangle([x - 2, y0, x + 2, y0 + 14], fill=(6, 12, 26))
    a = np.array(img).astype(np.float32)
    # frozen lake band behind the slab
    band = (yy > 300) & (yy < TOP)
    g = ((yy - 300) / max(1, TOP - 300))[:, :, None]
    a[band] = (np.array((20, 44, 80), np.float32) * (1 - g) + np.array((36, 74, 120), np.float32) * g)[band]
    a[band] += (noise_layer(rng, H, W, [40, 9], [3, 2])[:, :, None] * np.array((1, 1, 1.2)))[band]
    # void
    void = np.zeros((H - FRONT, W, 3), np.float32)
    gg = np.linspace(0, 1, H - FRONT)[:, None, None]
    void[:] = np.array((14, 30, 62), np.float32) * (1 - gg) + np.array((4, 8, 22), np.float32) * gg
    a[FRONT:] = void
    # slab top: glassy ice with cracks
    top = np.zeros((FRONT - TOP, X1 - X0, 3), np.float32); top[:] = (96, 150, 200)
    h, w = top.shape[:2]
    top += (noise_layer(rng, h, w, [60, 14, 3], [4, 3, 2])[:, :, None] * np.array((0.8, 1, 1.1)))
    yg, xg = np.mgrid[0:h, 0:w]
    top *= (0.88 + 0.16 * (yg / h))[:, :, None]
    top += (np.clip(1 - np.abs(((xg + yg * 0.6) % 150) - 10) / 6.0, 0, 1) * 18)[:, :, None]       # sheen streaks
    for _ in range(14):                                                                         # cracks
        x, y = int(rng.integers(20, w - 20)), int(rng.integers(10, h - 10))
        for _s in range(int(rng.integers(12, 40))):
            x += int(rng.integers(-2, 3)); y += int(rng.integers(-1, 2))
            if 0 <= x < w and 0 <= y < h: top[y, x] = (200, 232, 252)
    a[TOP:FRONT, X0:X1] = np.clip(top, 0, 255)
    # slab face: blocks of blue ice
    fh = BOT - FRONT
    face = np.zeros((fh, X1 - X0, 3), np.float32); face[:] = (40, 82, 130)
    x = 0
    while x < X1 - X0:
        bw = int(rng.integers(34, 64)); c = np.array((86, 150, 206), np.float32) + rng.normal(0, 6, 3)
        face[2:fh - 1, x + 1:min(X1 - X0, x + bw - 1)] = c
        face[2:4, x + 1:min(X1 - X0, x + bw - 1)] += 26
        x += bw
    face *= np.linspace(1.0, 0.6, fh)[:, None, None]
    a[FRONT:BOT, X0:X1] = face
    img = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    slab_outline(img, fill_lip=(224, 244, 255), mark=(150, 200, 236))
    d = ImageDraw.Draw(img)
    d.rectangle([X0, FRONT, X1 - 1, FRONT + 1], fill=(232, 246, 255))
    sh = Image.new('L', (W, H), 0)
    ImageDraw.Draw(sh).rectangle([X0 - 4, TOP - 14, X1 + 4, TOP], fill=60)
    sh = sh.filter(ImageFilter.GaussianBlur(6))
    img = Image.composite(Image.new('RGB', (W, H), (2, 6, 20)), img, sh)
    finish(img, 'ice')


# ---------------------------------------------------------------------------------------------- judgment-hall style corridor
def hall():
    rng = np.random.default_rng(33)
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    a = np.zeros((H, W, 3), np.float32)
    # back wall: warm dusk gradient
    t = np.clip(yy / 330.0, 0, 1)[:, :, None]
    a[:] = np.array((38, 22, 12), np.float32) * (1 - t) + np.array((120, 78, 30), np.float32) * t
    img = Image.fromarray(a.astype(np.uint8)); d = ImageDraw.Draw(img)
    # tall stained-glass windows between pillars
    for cx in range(125, W, 250):
        x0, x1 = cx - 52, cx + 52
        d.rectangle([x0 - 8, 70, x1 + 8, 330], fill=(70, 40, 16))
        d.rectangle([x0, 80, x1, 330], fill=(255, 214, 90))
        d.pieslice([x0, 60, x1, 140], 180, 360, fill=(255, 214, 90))
        for k in range(5):                                                                      # glass panes + light shafts
            d.line([(cx - 40 + k * 20, 90), (cx - 40 + k * 20, 330)], fill=(214, 150, 40), width=2)
        for k in range(1, 5):
            d.line([(x0, 80 + k * 50), (x1, 80 + k * 50)], fill=(214, 150, 40), width=2)
        d.polygon([(cx - 12, 120), (cx + 12, 120), (cx, 140)], fill=(255, 245, 190))
    # pillars
    for px in range(0, W + 1, 250):
        d.rectangle([px - 34, 0, px + 34, 334], fill=(26, 14, 8))
        d.rectangle([px - 34, 0, px - 28, 334], fill=(110, 70, 28)); d.rectangle([px + 28, 0, px + 34, 334], fill=(16, 8, 4))
        d.rectangle([px - 44, 300, px + 44, 334], fill=(40, 24, 12)); d.rectangle([px - 44, 0, px + 44, 30], fill=(40, 24, 12))
    img = img.filter(ImageFilter.GaussianBlur(0.6))
    a = np.array(img).astype(np.float32)
    # glowing floor band behind the slab (checkered, in perspective-ish bands)
    band = (yy >= 300) & (yy < TOP)
    chk = ((xx // 56).astype(int) + (yy // 14).astype(int)) % 2
    a[band] = np.where(chk[band][:, None] == 0, np.array((214, 142, 48), np.float32), np.array((236, 190, 96), np.float32)) * 0.55
    a *= (0.8 + 0.2 * np.clip(1 - np.abs(xx - W / 2) / (W * 0.7), 0, 1))[:, :, None]        # vignette
    void = np.zeros((H - FRONT, W, 3), np.float32)
    gg = np.linspace(0, 1, H - FRONT)[:, None, None]
    void[:] = np.array((44, 24, 10), np.float32) * (1 - gg) + np.array((10, 6, 4), np.float32) * gg
    a[FRONT:] = void
    # slab top: checkered gold tiles
    h, w = FRONT - TOP, X1 - X0
    yg, xg = np.mgrid[0:h, 0:w]
    chk = ((xg // 46) + (yg // 46)) % 2
    top = np.where(chk[:, :, None] == 0, np.array((176, 114, 44), np.float32), np.array((206, 152, 76), np.float32))
    top += noise_layer(rng, h, w, [30, 4], [4, 2])[:, :, None]
    top *= (0.86 + 0.16 * (yg / h))[:, :, None]
    top[(xg % 46 == 0) | (yg % 46 == 0)] *= 0.82                                           # grout
    a[TOP:FRONT, X0:X1] = np.clip(top, 0, 255)
    fh = BOT - FRONT
    face = np.zeros((fh, w, 3), np.float32); face[:] = (120, 78, 34)
    for x in range(0, w, 46):
        face[2:fh - 1, x + 1:x + 45] = (176, 120, 52) + rng.normal(0, 4, 3)
        face[2:4, x + 1:x + 45] += 24
    face *= np.linspace(1.0, 0.55, fh)[:, None, None]
    a[FRONT:BOT, X0:X1] = face
    img = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    slab_outline(img, fill_lip=(255, 236, 170), edge=(20, 10, 4), mark=(196, 140, 56))
    ImageDraw.Draw(img).rectangle([X0, FRONT, X1 - 1, FRONT + 1], fill=(255, 226, 150))
    finish(img, 'hall')


if __name__ == '__main__':
    import sys
    which = sys.argv[1:] or ['snowdin', 'ice', 'hall']
    for name in which:
        globals()[name]()
