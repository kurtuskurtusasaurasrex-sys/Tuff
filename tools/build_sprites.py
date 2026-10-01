#!/usr/bin/env python3
"""Build the game's sprite atlases (game/assets/sprites/*.png + *.json) from the ripped source sheets.

  python3 tools/build_sprites.py [--preview DIR]

Sources (tools/source/): sans_sheet.png (edited by Kepabra, original sheet by Underfail),
papyrus_sheet.png (Sami32e).  Undertale (c) Toby Fox.
"""
import json, os, sys
import numpy as np
from PIL import Image, ImageDraw
from spritelib import *
import build_sans

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'source')
OUT = os.path.join(HERE, '..', 'game', 'assets', 'sprites')
os.makedirs(OUT, exist_ok=True)


def pack(frames, width=512, pad=2):
    """frames: {name: (rgba, (ax, ay))} -> (atlas ndarray, {name: rect+anchor}) using a simple shelf packer."""
    items = sorted(frames.items(), key=lambda kv: -kv[1][0].shape[0])
    x = y = rowh = 0
    place = {}
    for name, (arr, anc) in items:
        h, w = arr.shape[:2]
        if x + w + pad > width:
            x, y, rowh = 0, y + rowh + pad, 0
        place[name] = (x, y)
        x += w + pad
        rowh = max(rowh, h)
    H = y + rowh + pad
    atlas = np.zeros((H, width, 4), np.uint8)
    meta = {}
    for name, (arr, anc) in frames.items():
        px, py = place[name]
        h, w = arr.shape[:2]
        atlas[py:py + h, px:px + w] = arr
        meta[name] = {'x': px, 'y': py, 'w': w, 'h': h, 'ax': int(anc[0]), 'ay': int(anc[1])}
    return atlas, meta


def save(name, frames, **extra):
    atlas, meta = pack(frames)
    Image.fromarray(atlas, 'RGBA').save(os.path.join(OUT, name + '.png'), optimize=True)
    json.dump({'image': name + '.png', **extra, 'frames': meta}, open(os.path.join(OUT, name + '.json'), 'w'), separators=(',', ':'))
    print(f'{name}: {len(frames)} frames, atlas {atlas.shape[1]}x{atlas.shape[0]}')
    return frames


# ------------------------------------------------------------------------------------ Papyrus
def papyrus():
    A = load_keyed(os.path.join(SRC, 'papyrus_sheet.png'), PAP_BG, PAP_TILE)
    T = json.load(open(os.path.join(SRC, 'papyrus_tiles.json')))
    picks = {
        'idle0': 1, 'idle1': 2, 'idle2': 3, 'idle3': 4,                 # front, walking toward the camera
        'side0': 5, 'side1': 6, 'side2': 7, 'side3': 8,                 # profile (faces LEFT), walking
        'back0': 21, 'back1': 22, 'back2': 23, 'back3': 24,             # from behind, walking away
        'talk0': 9, 'talk1': 10,
        'angry0': 47, 'angry1': 48, 'angry2': 49, 'angry3': 50,
        'sangry0': 51, 'sangry1': 52, 'sangry2': 53, 'sangry3': 54,
        'kickR': 62, 'kickL': 63, 'fists': 64,
        'cape0': 65, 'cape1': 66, 'cape2': 67, 'cape3': 68, 'cape4': 69,
        'flail': 75, 'flail2': 74,
        'orb0': 80, 'orb1': 81, 'orb2': 82,
        'spin0': 92, 'spin1': 93, 'spin2': 94, 'spin3': 95,
    }
    # ground line: how far above the tile bottom do standing boots end?  (use frame 1)
    ref = crop(A, T[1]); ys, _ = np.where(ref[:, :, 3] > 0); ground = ref.shape[0] - 1 - ys.max()
    frames = {}
    for name, i in picks.items():
        box = T[i]; tile_w = box[2] - box[0]; tile_h = box[3] - box[1]
        arr = crop(A, box); t, (dx, dy) = trim(arr)
        frames[name] = (t, (tile_w // 2 - dx, tile_h - ground - dy))
    # the projectile orb (tile 83 is a loose blob, not a tile) -> take from sheet region
    orb = crop(A, [558, 464, 572, 478]); t, (dx, dy) = trim(orb)
    frames['orb'] = (t, (t.shape[1] // 2, t.shape[0] // 2))
    idle, _ = frames['idle0'][0], None
    cx = frames['idle0'][1][0]
    ic = idle[:23, max(0, cx - 11):cx + 11].copy(); ic, _ = trim(ic)
    frames['icon'] = (ic, (ic.shape[1] // 2, ic.shape[0]))
    return save('papyrus', frames, scale=2, title='Papyrus', ground=int(ground))


# ------------------------------------------------------------------------------------ Sans
def sans():
    return save('sans', build_sans.build(), scale=3, title='Sans')


# ------------------------------------------------------------------------------------ shared FX (blasters etc.)
def fx():
    A = load_keyed(os.path.join(SRC, 'sans_sheet.png'), SANS_BG, SANS_TILE)
    T = json.load(open(os.path.join(SRC, 'sans_tiles.json')))
    frames = {}

    def add(name, i, flip=False, vflip=False):
        t, _ = trim(crop(A, T[i]))
        if flip: t = flip_h(t)
        if vflip: t = flip_v(t)
        frames[name] = (t, (t.shape[1] // 2, t.shape[0] // 2))
    for n, i in enumerate(range(114, 120)): add(f'gb_s{n}', i)            # blaster looking down the screen
    for n, i in enumerate(range(120, 126)): add(f'gb_e{n}', i)            # ... turning to the right
    for n, i in enumerate(range(130, 136)): add(f'gb_w{n}', i)            # ... turning to the left
    for n, i in enumerate(range(114, 120)): add(f'gb_n{n}', i, vflip=True)
    for n, i in enumerate(range(136, 142)): add(f'giga_e{n}', i)
    for n, i in enumerate(range(142, 148)): add(f'giga_w{n}', i)
    return save('fx', frames, scale=3)


if __name__ == '__main__':
    S = sans(); P = papyrus(); X = fx()
    if '--preview' in sys.argv:
        d = sys.argv[sys.argv.index('--preview') + 1]
        os.makedirs(d, exist_ok=True)
        for tag, fr in (('sans', S), ('papyrus', P), ('fx', X)):
            items = list(fr.items()); cols = 10; sc = 2 if tag == 'papyrus' else 3
            cw = max(a.shape[1] for a, _ in fr.values()) * sc + 16; ch = max(a.shape[0] for a, _ in fr.values()) * sc + 28
            rows = (len(items) + cols - 1) // cols
            sh = Image.new('RGB', (cols * cw, rows * ch), (70, 90, 120)); dr = ImageDraw.Draw(sh)
            for n, (k, (arr, (ax, ay))) in enumerate(items):
                r, c = divmod(n, cols)
                im = Image.fromarray(arr, 'RGBA').resize((arr.shape[1] * sc, arr.shape[0] * sc), Image.NEAREST)
                gx, gy = c * cw + cw // 2, r * ch + 14 + max(a.shape[0] for a, _ in fr.values()) * sc - 4
                sh.paste(im, (gx - ax * sc, gy - ay * sc), im)
                dr.line([(gx - 8, gy), (gx + 8, gy)], fill=(255, 0, 0)); dr.line([(gx, gy - 8), (gx, gy + 8)], fill=(255, 0, 0))
                dr.text((c * cw + 3, r * ch + 1), k, fill=(255, 255, 0))
            sh.save(os.path.join(d, f'preview_{tag}.png')); print('preview', tag, sh.size)
