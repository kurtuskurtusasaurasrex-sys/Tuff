#!/usr/bin/env python3
"""Re-detect frame tiles on the two source sprite sheets -> tools/source/*_tiles.json.

Each frame in the ripped sheets sits on a flat-coloured rectangle ("tile") that is separated from its
neighbours by the sheet background colour, so every frame is a connected blob of "not sheet background".
"""
import json, os
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'source')


def tiles(path, bg, tile, min_area, ymax=None, need_tile=False):
    a = np.array(Image.open(path).convert('RGB'))
    isbg = np.all(a == np.array(bg), axis=2)
    istile = np.all(a == np.array(tile), axis=2)
    fg = ~isbg
    if ymax:
        fg[ymax:, :] = False
    lab, _ = ndi.label(fg)
    out = []
    for i, sl in enumerate(ndi.find_objects(lab)):
        m = lab[sl] == i + 1
        if m.sum() < min_area or (need_tile and (istile[sl] & m).sum() < 20):
            continue
        out.append([int(sl[1].start), int(sl[0].start), int(sl[1].stop), int(sl[0].stop)])
    return out


if __name__ == '__main__':
    s = tiles(os.path.join(SRC, 'sans_sheet.png'), (206, 186, 231), (165, 73, 165), 30, ymax=700, need_tile=True)
    s.sort(key=lambda b: (round(b[1] / 12), b[0]))
    json.dump(s, open(os.path.join(SRC, 'sans_tiles.json'), 'w'))
    p = tiles(os.path.join(SRC, 'papyrus_sheet.png'), (138, 90, 157), (195, 134, 255), 150)
    p.sort(key=lambda b: (round(b[1] / 40), b[0]))
    json.dump(p, open(os.path.join(SRC, 'papyrus_tiles.json'), 'w'))
    print(len(s), 'sans tiles,', len(p), 'papyrus tiles')
