#!/usr/bin/env python3
"""Pixel-art app icons (a white 'T' and a red SOUL on night blue) -> game/assets/icons/."""
import os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'game', 'assets', 'icons')
os.makedirs(OUT, exist_ok=True)

def icon(size, pad_ratio=0.0):
    g = 32                                   # design on a 32x32 pixel grid, scale up with nearest neighbour
    im = Image.new('RGB', (g, g), (5, 6, 15))
    d = ImageDraw.Draw(im)
    for y in range(g):                       # night gradient
        d.line([(0, y), (g, y)], fill=(8 + y // 3, 12 + y // 2, 36 + y))
    d.rectangle([5, 5, 26, 9], fill=(255, 255, 255)); d.rectangle([13, 9, 18, 22], fill=(255, 255, 255))
    d.rectangle([4, 4, 27, 4], fill=(43, 79, 208)); d.rectangle([27, 5, 27, 10], fill=(43, 79, 208))
    heart = ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...']
    for ry, row in enumerate(heart):
        for rx, c in enumerate(row):
            if c == '#': d.point((12 + rx, 24 + ry - 1), fill=(255, 42, 42))
    if pad_ratio:
        canvas = Image.new('RGB', (g, g), (5, 6, 15))
        inner = int(g * (1 - pad_ratio * 2))
        canvas.paste(im.resize((inner, inner), Image.NEAREST), ((g - inner) // 2, (g - inner) // 2))
        im = canvas
    return im.resize((size, size), Image.NEAREST)

icon(192).save(os.path.join(OUT, 'icon-192.png'))
icon(512).save(os.path.join(OUT, 'icon-512.png'))
icon(512, 0.12).save(os.path.join(OUT, 'icon-maskable-512.png'))
print('icons written to', OUT)
