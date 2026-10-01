"""Compose Sans (head + torso + legs are separate pieces in the source sheet) into full-body frames."""
import json, os
import numpy as np
from spritelib import *

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'source')

A = load_keyed(os.path.join(SRC, 'sans_sheet.png'), SANS_BG, SANS_TILE)
T = json.load(open(os.path.join(SRC, 'sans_tiles.json')))
tile = lambda i: crop(A, T[i])

CW, CH = 90, 90
AX, AY = 45, 75            # feet anchor on working canvas
FULL_F = tile(20)          # 23x30 front full body
FULL_S = tile(21)          # 17x30 side full body (faces left)
# body-centre inside the full frames
CF, CS = 11, 8
OX_F, OX_S = AX - CF, AX - CS   # canvas x where the full-frame's left edge sits
OY = AY - 30                    # canvas y of the full-frame's top


def canvas():
    return np.zeros((CH, CW, 4), np.uint8)


def finish(c):
    t, (dx, dy) = trim(c)
    return t, (AX - dx, AY - dy)


def bottom_dx(piece, ref, rows=7, search=(-10, 12)):
    """x offset (in ref coordinates) that lines up the bottom `rows` rows (shoes) of `piece` with `ref`."""
    r = ref[-rows:]
    p = piece[-rows:]
    s, dx, _ = match_offsets(r, p, (0, 0, search[0], search[1]))
    return dx


# ---- front-facing builders -------------------------------------------------------------------------
def f_full(face=None):
    c = canvas(); paste(c, FULL_F, OX_F, OY)
    if face is not None: paste(c, tile(face), OX_F + 3, OY)
    return finish(c)


def f_headless(idx, face):
    c = canvas(); p = tile(idx); h = p.shape[0]
    dx = bottom_dx(p, FULL_F)
    paste(c, p, OX_F + dx, OY + 30 - h)
    paste(c, tile(face), OX_F + 3, OY)
    return finish(c)


def f_parts(torso, legs, face, lift=0):
    c = canvas(); t, l = tile(torso), tile(legs)
    paste(c, l, OX_F + (23 - l.shape[1]) // 2, OY + 30 - l.shape[0] - lift)
    paste(c, t, OX_F + (23 - t.shape[1]) // 2, OY + 24 - t.shape[0] - lift)
    paste(c, tile(face), OX_F + 3, OY - lift)
    return finish(c)


# ---- side-facing (looks left) ----------------------------------------------------------------------
def s_full(face=None):
    c = canvas(); paste(c, FULL_S, OX_S, OY)
    if face is not None: paste(c, tile(face), OX_S, OY)
    return finish(c)


def s_headless(idx, face):
    c = canvas(); p = tile(idx); h = p.shape[0]
    dx = bottom_dx(p, FULL_S, search=(-6, 10))
    paste(c, p, OX_S + dx, OY + 30 - h)
    paste(c, tile(face), OX_S, OY)
    return finish(c)


def s_parts(torso, legs, face, lift=0, tdx=2, ldx=3):
    c = canvas(); t, l = tile(torso), tile(legs)
    paste(c, l, OX_S + ldx, OY + 30 - l.shape[0] - lift)
    paste(c, t, OX_S + tdx, OY + 24 - t.shape[0] - lift)
    paste(c, tile(face), OX_S, OY - lift)
    return finish(c)


def build():
    F = {}
    # idle / expressions
    F['idle'] = f_full()
    F['idle_blink'] = f_full(48)
    F['idle_eye'] = f_full(103)
    F['side'] = s_full()
    F['side_blink'] = s_full(63)
    F['side_eye'] = s_full(105)
    # shuffle-walk (side) - second leg piece in the sheet is a different pose, so a single extra frame + procedural bob
    F['side_walk0'] = s_parts(8, 18, 59)
    # strike poses, front (arm to screen-right) and side
    for n, i in enumerate(range(32, 38)):
        F[f'lr{n}'] = f_headless(i, 44 if n < 3 else 101)
    for n, i in enumerate(range(22, 27)):
        F[f'ud{n}'] = f_headless(i, 44 if n < 2 else 101)
    for n, i in enumerate(range(38, 44)):
        F[f'slr{n}'] = s_headless(i, 59 if n < 3 else 85)
    for n, i in enumerate(range(27, 32)):
        F[f'sud{n}'] = s_headless(i, 59 if n < 2 else 85)
    # hit reactions
    F['hurt'] = f_parts(1, 16, 49)
    F['hurt2'] = f_parts(2, 17, 50)
    F['shurt'] = s_parts(9, 18, 64)
    F['shurt2'] = s_parts(10, 18, 66)
    F['guard'] = f_parts(3, 16, 101)
    F['sguard'] = s_parts(11, 18, 85)
    F['idle_eye2'] = f_full(104)      # yellow eye (super)
    ic, _ = trim(tile(44)); F['icon'] = (ic, (ic.shape[1] // 2, ic.shape[0]))
    return F


if __name__ == '__main__':
    import sys
    sys.path.insert(0, os.path.join(HERE, '..'))
    F = build()
    from PIL import Image, ImageDraw
    S = 4
    names = list(F)
    cols = 9
    cw, ch = 40 * S, 40 * S + 12
    rows = (len(names) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * cw, rows * ch), (70, 90, 120)); d = ImageDraw.Draw(sheet)
    for n, k in enumerate(names):
        arr, (ax, ay) = F[k]; r, c = divmod(n, cols)
        im = Image.fromarray(arr, 'RGBA').resize((arr.shape[1] * S, arr.shape[0] * S), Image.NEAREST)
        ox, oy = c * cw + cw // 2 - ax * S, r * ch + 12 + 34 * S - ay * S
        sheet.paste(im, (ox, oy), im)
        d.line([(c * cw + cw // 2 - 6, r * ch + 12 + 34 * S), (c * cw + cw // 2 + 6, r * ch + 12 + 34 * S)], fill=(255, 0, 0))
        d.line([(c * cw + cw // 2, r * ch + 12 + 34 * S - 6), (c * cw + cw // 2, r * ch + 12 + 34 * S + 6)], fill=(255, 0, 0))
        d.text((c * cw + 3, r * ch + 1), k, fill=(255, 255, 0))
    out = sys.argv[1] if len(sys.argv) > 1 else 'sans_preview.png'
    sheet.save(out); print(out, sheet.size, len(names), 'frames')
