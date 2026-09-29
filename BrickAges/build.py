#!/usr/bin/env python3
"""Build THE BRICK AGES — DELUXE.

    original/The-Brick-Ages.html   the untouched game (three.js + every part, one file)
  + src/p*.js                      the new parts, spliced in just before the test suite (p85_tests)
  + patches.py                     small, exact edits to existing parts (each must match exactly once)
  = The-Brick-Ages-Deluxe.html     one self-contained file: open it in a browser and play

Usage:  python3 build.py            (writes The-Brick-Ages-Deluxe.html)
        python3 build.py --check    (only verifies every patch still applies)
"""
import glob
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'original', 'The-Brick-Ages.html')
OUT = os.path.join(HERE, 'The-Brick-Ages-Deluxe.html')
ANCHOR = '/* ==== p85_tests.js ==== */'

sys.path.insert(0, HERE)
from patches import PATCHES  # noqa: E402


def main():
    html = open(SRC, encoding='utf-8').read()
    for name, old, new in PATCHES:
        n = html.count(old)
        if n != 1:
            sys.exit(f'patch "{name}": expected 1 match, found {n}')
        html = html.replace(old, new)
    parts = sorted(glob.glob(os.path.join(HERE, 'src', 'p*.js')))
    code = ''.join(open(p, encoding='utf-8').read().rstrip() + '\n\n' for p in parts)
    if html.count(ANCHOR) != 1:
        sys.exit('anchor for new parts not found')
    html = html.replace(ANCHOR, code + ANCHOR)
    if '--check' in sys.argv:
        print(f'ok: {len(PATCHES)} patches, {len(parts)} new parts')
        return
    open(OUT, 'w', encoding='utf-8').write(html)
    print(f'wrote {os.path.relpath(OUT, HERE)}: {len(html):,} bytes · {len(PATCHES)} patches · parts: ' + ', '.join(os.path.basename(p) for p in parts))


if __name__ == '__main__':
    main()
