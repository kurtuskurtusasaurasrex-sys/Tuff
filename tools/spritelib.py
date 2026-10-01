"""Helpers for slicing the (indexed-colour) ripped sprite sheets."""
import json
import numpy as np
from PIL import Image

SANS_BG, SANS_TILE = (206, 186, 231), (165, 73, 165)
PAP_BG, PAP_TILE = (138, 90, 157), (195, 134, 255)


def load_keyed(path, bg, tile):
    """Open a sheet as RGBA with sheet-background and frame-tile colours made transparent."""
    a = np.array(Image.open(path).convert('RGBA'))
    for c in (bg, tile):
        a[np.all(a[:, :, :3] == np.array(c), axis=2), 3] = 0
    return a


def crop(a, box):
    x0, y0, x1, y1 = box[:4]
    return a[y0:y1, x0:x1].copy()


def trim(arr):
    """Trim fully transparent border; return (trimmed, (dx, dy)) where d* = pixels removed from left/top."""
    ys, xs = np.where(arr[:, :, 3] > 0)
    if len(ys) == 0:
        return arr, (0, 0)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    return arr[y0:y1, x0:x1].copy(), (int(x0), int(y0))


def paste(dst, src, x, y):
    """Alpha-composite src onto dst (both RGBA uint8 numpy) at integer offset."""
    h, w = src.shape[:2]
    H, W = dst.shape[:2]
    sx0, sy0 = max(0, -x), max(0, -y)
    sx1, sy1 = min(w, W - x), min(h, H - y)
    if sx1 <= sx0 or sy1 <= sy0:
        return
    s = src[sy0:sy1, sx0:sx1]
    d = dst[y + sy0:y + sy1, x + sx0:x + sx1]
    m = s[:, :, 3] > 0
    d[m] = s[m]


def flip_h(arr):
    return arr[:, ::-1].copy()


def flip_v(arr):
    return arr[::-1].copy()


def to_img(arr):
    return Image.fromarray(arr, 'RGBA')


def match_offsets(big, small, search):
    """Brute-force: find (dx,dy) placing `small` inside `big` maximising equal opaque pixels. Returns best (score,dx,dy)."""
    best = (-10 ** 9, 0, 0)
    sh, sw = small.shape[:2]
    bh, bw = big.shape[:2]
    sm = small[:, :, 3] > 0
    for dy in range(search[0], search[1] + 1):
        for dx in range(search[2], search[3] + 1):
            y0, x0 = max(0, dy), max(0, dx)
            y1, x1 = min(bh, dy + sh), min(bw, dx + sw)
            if y1 <= y0 or x1 <= x0:
                continue
            b = big[y0:y1, x0:x1]
            s = small[y0 - dy:y1 - dy, x0 - dx:x1 - dx]
            smm = sm[y0 - dy:y1 - dy, x0 - dx:x1 - dx]
            eq = np.all(b == s, axis=2) & smm & (b[:, :, 3] > 0)
            score = int(eq.sum()) - 0.5 * int((smm & ~(b[:, :, 3] > 0)).sum())
            if score > best[0]:
                best = (score, dx, dy)
    return best
