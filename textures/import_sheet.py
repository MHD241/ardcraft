#!/usr/bin/env python3
"""Turn a finished sheet (the picture an image generator gave you back) into game textures.

  python3 import_sheet.py sheet-01 returned-sheet.png
  python3 import_sheet.py sheet-08 items.png --mode nearest

It reads manifest.json (which tile goes in which cell), cuts the picture into its 4x4 cells,
shrinks each cell to 16x16 pixels, turns the magenta (#FF00FF) background of CUTOUT / ITEM cells
transparent, and writes the result into textures.png (next to this script).
The game loads textures.png automatically and uses it in place of its own drawn textures, tile by
tile, so you can import one sheet at a time. Needs: pip install pillow
"""
import json, os, sys
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
def main():
    a = [x for x in sys.argv[1:] if not x.startswith('--')]
    mode = 'nearest' if '--mode' in sys.argv and sys.argv[sys.argv.index('--mode') + 1] == 'nearest' else 'box'
    a = [x for x in a if x not in ('box', 'nearest')]
    if len(a) < 2: print(__doc__); sys.exit(1)
    man = json.load(open(os.path.join(HERE, 'manifest.json')))
    sheet = next((s for s in man['sheets'] if s['file'] == a[0]), None)
    if not sheet: print('unknown sheet', a[0], 'choose from', [s['file'] for s in man['sheets']]); sys.exit(1)
    src = Image.open(a[1]).convert('RGB'); S = min(src.size); src = src.crop(((src.width - S) // 2, (src.height - S) // 2, (src.width + S) // 2, (src.height + S) // 2))
    out_path = os.path.join(HERE, 'textures.png')
    atlas = Image.open(out_path).convert('RGBA') if os.path.exists(out_path) else Image.new('RGBA', (256, 256), (0, 0, 0, 0))
    cell = S / 4.0; m = int(cell * 0.045)
    for n, t in enumerate(sheet['tiles']):
        cx, cy = int((n % 4) * cell), int((n // 4) * cell)
        c = src.crop((cx + m, cy + m, int(cx + cell) - m, int(cy + cell) - m)).convert('RGBA')
        kind = man['info'][str(t)]['kind']
        px = c.load(); alpha = Image.new('L', c.size, 255); ap = alpha.load()
        if kind in ('cutout', 'item'):
            for y in range(c.height):
                for x in range(c.width):
                    r, g, b, _ = px[x, y]
                    if r > 150 and b > 150 and g < 110 and abs(r - b) < 110: ap[x, y] = 0
        flt = Image.NEAREST if mode == 'nearest' else Image.BOX
        tile = c.resize((16, 16), flt); al = alpha.resize((16, 16), flt).point(lambda v: 255 if v > 127 else 0); tile.putalpha(al)
        if kind in ('cutout', 'item'):  # pull edge colours away from magenta fringes
            tp = tile.load()
            for y in range(16):
                for x in range(16):
                    r, g, b, aa = tp[x, y]
                    if aa and r > 190 and b > 190 and g < 150: tp[x, y] = (0, 0, 0, 0)
        atlas.paste(tile, ((t & 15) * 16, (t >> 4) * 16))
    atlas.save(out_path); print('wrote', out_path, '(', len(sheet['tiles']), 'tiles from', a[0], ')')
main()
