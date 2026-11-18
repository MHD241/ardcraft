#!/usr/bin/env python3
"""Draw-on templates for Ard block textures.

  python3 tex_tools.py all                      make every template (templates/ folder)
  python3 tex_tools.py template "Grass Block"   make one
  python3 tex_tools.py import "Grass Block" my-drawing.png   put your drawing into textures.png

A template shows the faces the game uses for that block (TOP, SIDE, BOTTOM; the four sides all use SIDE),
each as a 16 x 16 grid: 1 square = 1 pixel of the final texture. Draw inside the squares (any size you like:
export the picture at the same proportions) and keep the layout. Cutout blocks and items can be left see-through
(or paint the background magenta #FF00FF). Needs: pip install pillow numpy
"""
import json, os, sys, re
import numpy as np
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.abspath(__file__))
W, H = 928, 830
FACES = {'TOP': (40, 96), 'SIDE': (336, 96), 'BOTTOM': (632, 96)}  # top-left of each 256 x 256 face
CELL = 16
def font(n, bold=False):
    for p in ['/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf' % ('-Bold' if bold else ''), '/System/Library/Fonts/Supplemental/Arial.ttf', 'C:/Windows/Fonts/arial.ttf']:
        if os.path.exists(p): return ImageFont.truetype(p, n)
    return ImageFont.load_default()
def single(b): return bool(b.get('item')) or b.get('kind') == 'cross'
def tile_img(atlas, t):
    return atlas.crop(((t & 15) * 16, (t >> 4) * 16, (t & 15) * 16 + 16, (t >> 4) * 16 + 16)).convert('RGBA')
def iso(canvas, faces, cx, cy, s, outline=True, labels=True):
    k = 0.866 * s; d = ImageDraw.Draw(canvas)
    polys = {'TOP': [(cx, cy - s), (cx + k, cy - s / 2), (cx, cy), (cx - k, cy - s / 2)], 'SIDE_L': [(cx - k, cy - s / 2), (cx, cy), (cx, cy + s), (cx - k, cy + s / 2)], 'SIDE_R': [(cx, cy), (cx + k, cy - s / 2), (cx + k, cy + s / 2), (cx, cy + s)]}
    maps = {'TOP': ((cx, cy - s), (k, s / 2), (-k, s / 2)), 'SIDE_L': ((cx - k, cy - s / 2), (k, s / 2), (0, s)), 'SIDE_R': ((cx, cy), (k, -s / 2), (0, s))}
    for nm, poly in polys.items():
        if faces:
            img = faces['TOP' if nm == 'TOP' else 'SIDE'].resize((128, 128), Image.NEAREST)
            (ox, oy), (ux, uy), (vx, vy) = maps[nm]; M = np.array([[ux / 128, vx / 128], [uy / 128, vy / 128]]); inv = np.linalg.inv(M); o = np.array([ox, oy])
            c = -inv @ o; tr = img.transform(canvas.size, Image.AFFINE, (inv[0, 0], inv[0, 1], c[0], inv[1, 0], inv[1, 1], c[1]), Image.NEAREST)
            mask = Image.new('L', canvas.size, 0); ImageDraw.Draw(mask).polygon(poly, fill=255)
            if nm != 'TOP':
                sh = 0.78 if nm == 'SIDE_L' else 0.62; arr = np.array(tr).astype(float); arr[:, :, :3] *= sh; tr = Image.fromarray(arr.astype('uint8'), 'RGBA')
            canvas.paste(tr, (0, 0), mask)
        if outline: d.polygon(poly, outline=(20, 20, 20), width=4)
    if labels:
        f = font(15, True); d.text((cx - 22, cy - s / 2 - 8), 'TOP', fill=(120, 120, 120), font=f); d.text((cx - k + 22, cy + s / 4 - 8), 'SIDE', fill=(120, 120, 120), font=f); d.text((cx + 14, cy + s / 4 - 8), 'SIDE', fill=(120, 120, 120), font=f)
def make(b, atlas, current, out):
    im = Image.new('RGBA', (W, H), (246, 244, 238, 255)); d = ImageDraw.Draw(im)
    d.text((40, 10), b['name'], fill=(20, 20, 20), font=font(26, True))
    d.text((40, 42), ('1 square = 1 pixel · draw inside the squares · leave the background empty (see-through)' if single(b) else '1 square = 1 pixel · draw inside the squares · the four sides of the block all use SIDE'), fill=(90, 90, 90), font=font(14))
    kind = 'item' if b.get('item') else b.get('kind'); see = kind in ('cutout', 'cross', 'item', 'shape')
    ft = {'TOP': b['top'], 'SIDE': b['side'], 'BOTTOM': b['bottom']}
    if single(b): ft = {'ITEM': b['top']}
    pos = {'ITEM': (336, 96)} if single(b) else FACES
    faces = {}
    for nm, (x, y) in pos.items():
        t = ft[nm]; tile = tile_img(atlas, t) if t is not None else None
        for yy in range(16):
            for xx in range(16):
                col = (255, 255, 255, 255) if not see else (((228, 222, 240, 255) if (xx + yy) % 2 == 0 else (246, 242, 252, 255)))
                d.rectangle([x + xx * CELL, y + yy * CELL, x + xx * CELL + CELL - 1, y + yy * CELL + CELL - 1], fill=col)
        if current and tile is not None:
            big = tile.resize((256, 256), Image.NEAREST); im.alpha_composite(big, (x, y))
        faces[nm] = tile if tile is not None else None
        for i in range(17):
            w = 2 if i % 4 == 0 else 1; c = (120, 120, 130, 255) if i % 4 == 0 else (190, 190, 198, 255)
            d.line([(x + i * CELL, y), (x + i * CELL, y + 256)], fill=c, width=w); d.line([(x, y + i * CELL), (x + 256, y + i * CELL)], fill=c, width=w)
        d.rectangle([x - 1, y - 1, x + 257, y + 257], outline=(20, 20, 20, 255), width=3)
        d.text((x, y - 22), nm + ('  (tile #%d)' % t if t is not None else ''), fill=(20, 20, 20), font=font(15, True))
    if not single(b):
        iso(im, {'TOP': tile_img(atlas, b['top']), 'SIDE': tile_img(atlas, b['side'])} if current else None, W // 2, 610, 170, outline=True, labels=not current)
        d.text((40, 420), 'Outline of the block' + (' (shows the current art)' if current else ' (your drawing will look like this)'), fill=(90, 90, 90), font=font(14))
    im.convert('RGB').save(out)
def safe(n): return re.sub(r'[^A-Za-z0-9]+', '-', n).strip('-')
def load():
    atlas = Image.open(os.path.join(HERE, 'atlas-current.png')).convert('RGBA')
    blocks = json.load(open(os.path.join(HERE, 'blocks.json'))); items = json.load(open(os.path.join(HERE, 'manifest.json')))['info']
    return atlas, blocks, items
def all_blocks(blocks, items):
    out = [b for b in blocks if b['kind'] != 'item']
    for t, i in items.items():
        if i['kind'] == 'item': out.append({'name': i['name'], 'kind': 'item', 'item': True, 'top': int(t), 'side': int(t), 'bottom': int(t)})
    return out
def find(blocks, name):
    n = name.lower().strip()
    return next((b for b in blocks if b['name'].lower() == n), None) or next((b for b in blocks if n in b['name'].lower()), None)
def region(b):
    return FACES if not single(b) else {'ITEM': (336, 96)}
def groups(v, gap=4):
    if len(v) == 0: return []
    g = []; st = v[0]; pv = v[0]
    for x in v[1:]:
        if x - pv > gap: g.append((int(st), int(pv))); st = x
        pv = x
    g.append((int(st), int(pv))); return g
def longest_runs(mask):
    """Longest run of True per row of a 2-D mask."""
    best = np.zeros(mask.shape[0], dtype=int)
    for i, row in enumerate(mask):
        if not row.any(): continue
        d = np.diff(np.concatenate(([0], row.astype(int), [0]))); st = np.where(d == 1)[0]; en = np.where(d == -1)[0]; best[i] = (en - st).max()
    return best
def detect_faces(src):
    """Find the TOP / SIDE / BOTTOM squares by their black frames, so a redrawn template with other proportions still imports."""
    a = np.array(src.convert('RGB')).astype(int); dark = a.max(axis=2) < 55; H, Wd = dark.shape
    top = dark[:int(H * 0.62)]; lr = longest_runs(top)
    rows = np.where(lr > 0.2 * Wd)[0]; rg = [g for g in groups(rows) if g[1] - g[0] <= 10]
    if len(rg) < 2: return None
    y0, y1 = rg[0][1] + 1, rg[1][0] - 1
    if y1 - y0 < 60: return None
    lc = longest_runs(dark[y0 - 4:y1 + 4, :].T); cols = np.where(lc > 0.85 * (y1 - y0))[0]; cg = [g for g in groups(cols) if g[1] - g[0] <= 10]
    if len(cg) < 6: return None
    return [(cg[i][1] + 1, y0, cg[i + 1][0] - 1, y1) for i in (0, 2, 4)]
def sample_box(a, box):
    x0, y0, x1, y1 = box; cw = (x1 - x0) / 16.0; ch = (y1 - y0) / 16.0; tile = Image.new('RGBA', (16, 16)); tp = tile.load()
    for yy in range(16):
        for xx in range(16):
            ax0 = int(x0 + xx * cw + cw * 0.3); ax1 = max(ax0 + 1, int(x0 + (xx + 1) * cw - cw * 0.3)); ay0 = int(y0 + yy * ch + ch * 0.3); ay1 = max(ay0 + 1, int(y0 + (yy + 1) * ch - ch * 0.3))
            r, g, bb = [int(v) for v in np.median(a[ay0:ay1, ax0:ax1, :3].reshape(-1, 3), axis=0)]; tp[xx, yy] = (r, g, bb, 255)
    return tile
def do_import(b, path):
    src0 = Image.open(path).convert('RGBA'); det = detect_faces(src0) if not single(b) else None
    if det:
        a = np.array(src0).astype(int); out_path = os.path.join(HERE, 'textures.png'); atlas = Image.open(out_path).convert('RGBA') if os.path.exists(out_path) else Image.new('RGBA', (256, 256), (0, 0, 0, 0))
        ft = {'TOP': b['top'], 'SIDE': b['side'], 'BOTTOM': b['bottom']}; done = set()
        for (nm, t), box in zip(ft.items(), det):
            if t in done: continue
            done.add(t); atlas.paste(sample_box(a, box), ((t & 15) * 16, (t >> 4) * 16))
        atlas.save(out_path); print('wrote', out_path, 'tiles', sorted(done), 'for', b['name'], '(squares found automatically)'); return
    do_import_fixed(b, path)
def do_import_fixed(b, path):
    src = Image.open(path).convert('RGBA'); sx, sy = src.width / W, src.height / H
    out_path = os.path.join(HERE, 'textures.png'); atlas = Image.open(out_path).convert('RGBA') if os.path.exists(out_path) else Image.new('RGBA', (256, 256), (0, 0, 0, 0))
    ft = {'TOP': b['top'], 'SIDE': b['side'], 'BOTTOM': b['bottom']} if not single(b) else {'ITEM': b['top']}
    done = set(); see = b.get('kind') in ('cutout', 'cross', 'item', 'shape')
    for nm, (x, y) in region(b).items():
        t = ft[nm]
        if t in done: continue
        done.add(t); tile = Image.new('RGBA', (16, 16)); tp = tile.load(); a = np.array(src)
        for yy in range(16):
            for xx in range(16):
                x0 = int((x + xx * CELL + 4) * sx); x1 = max(x0 + 1, int((x + xx * CELL + 12) * sx)); y0 = int((y + yy * CELL + 4) * sy); y1 = max(y0 + 1, int((y + yy * CELL + 12) * sy))
                blk = a[y0:y1, x0:x1].reshape(-1, 4).astype(int); col = tuple(int(v) for v in np.median(blk, axis=0))
                r, g, bb, al = col
                transparent = al < 100 or (see and r > 190 and bb > 190 and g < 120)
                if see and ((r, g, bb) in [(228, 222, 240), (246, 242, 252)] or (abs(r - 228) < 3 and abs(g - 222) < 3 and abs(bb - 240) < 3) or (abs(r - 246) < 3 and abs(g - 242) < 3 and abs(bb - 252) < 3)): transparent = True
                tp[xx, yy] = (0, 0, 0, 0) if transparent else (r, g, bb, 255)
        atlas.paste(tile, ((t & 15) * 16, (t >> 4) * 16))
    atlas.save(out_path); print('wrote', out_path, 'tiles', sorted(done), 'for', b['name'])
if __name__ == '__main__':
    a = sys.argv[1:]
    if not a: print(__doc__); sys.exit(1)
    atlas, blocks, items = load(); every = all_blocks(blocks, items)
    if a[0] == 'all':
        for sub in ('blank', 'current'): os.makedirs(os.path.join(HERE, 'templates', sub), exist_ok=True)
        seen = set()
        for b in every:
            key = (b['name']); 
            if key in seen: continue
            seen.add(key); fn = safe(b['name']) + '.png'
            make(b, atlas, False, os.path.join(HERE, 'templates', 'blank', fn)); make(b, atlas, True, os.path.join(HERE, 'templates', 'current', fn))
        print(len(seen), 'templates in', os.path.join(HERE, 'templates'))
    elif a[0] == 'template':
        b = find(every, a[1]); b or sys.exit('no block called ' + a[1])
        make(b, atlas, False, safe(b['name']) + '-blank.png'); make(b, atlas, True, safe(b['name']) + '-current.png'); print('wrote', safe(b['name']) + '-blank.png and -current.png')
    elif a[0] == 'import':
        b = find(every, a[1]); b or sys.exit('no block called ' + a[1]); do_import(b, a[2])

# ---- tool sets: one template per material with the five tools side by side ----
TW, TH = 1480, 470
TOOLS = ['Pickaxe', 'Axe', 'Shovel', 'Sword', 'Hoe']
TOOL_X = [30 + i * 286 for i in range(5)]; TOOL_Y = 110
def tool_tiles(items, mat):
    out = []
    for t in TOOLS:
        nm = mat + ' ' + t
        k = next((int(k) for k, v in items.items() if v['name'] == nm), None)
        if k is None: sys.exit('missing ' + nm)
        out.append((t, k))
    return out
def make_tools(mat, items, atlas, current, out):
    im = Image.new('RGBA', (TW, TH), (246, 244, 238, 255)); d = ImageDraw.Draw(im)
    d.text((30, 12), mat + ' tools', fill=(20, 20, 20), font=font(26, True))
    d.text((30, 46), '1 square = 1 pixel · draw inside the squares · handle at the bottom left, tool head at the top right · leave the background empty', fill=(90, 90, 90), font=font(14))
    for (nm, t), x in zip(tool_tiles(items, mat), TOOL_X):
        y = TOOL_Y
        for yy in range(16):
            for xx in range(16):
                d.rectangle([x + xx * CELL, y + yy * CELL, x + xx * CELL + CELL - 1, y + yy * CELL + CELL - 1], fill=(228, 222, 240, 255) if (xx + yy) % 2 == 0 else (246, 242, 252, 255))
        if current: im.alpha_composite(tile_img(atlas, t).resize((256, 256), Image.NEAREST), (x, y))
        else:
            for k in range(1, 15): d.rectangle([x + k * CELL + 5, y + (15 - k) * CELL + 5, x + k * CELL + 10, y + (15 - k) * CELL + 10], fill=(150, 190, 235, 255))
        for i in range(17):
            w = 2 if i % 4 == 0 else 1; c = (120, 120, 130, 255) if i % 4 == 0 else (190, 190, 198, 255)
            d.line([(x + i * CELL, y), (x + i * CELL, y + 256)], fill=c, width=w); d.line([(x, y + i * CELL), (x + 256, y + i * CELL)], fill=c, width=w)
        d.rectangle([x - 1, y - 1, x + 257, y + 257], outline=(20, 20, 20, 255), width=3)
        d.text((x, y - 24), '%s  (tile #%d)' % (nm, t), fill=(20, 20, 20), font=font(15, True))
    if not current: d.text((30, TOOL_Y + 280), 'The faint blue diagonal in each square is only a guide for where the handle runs. It is not part of the texture.', fill=(110, 110, 120), font=font(14))
    im.convert('RGB').save(out)
def import_tools(mat, items, path):
    src = Image.open(path).convert('RGBA'); sx, sy = src.width / TW, src.height / TH; a = np.array(src)
    out_path = os.path.join(HERE, 'textures.png'); atlas = Image.open(out_path).convert('RGBA') if os.path.exists(out_path) else Image.new('RGBA', (256, 256), (0, 0, 0, 0))
    for (nm, t), x in zip(tool_tiles(items, mat), TOOL_X):
        y = TOOL_Y; tile = Image.new('RGBA', (16, 16)); tp = tile.load()
        for yy in range(16):
            for xx in range(16):
                x0 = int((x + xx * CELL + 4) * sx); x1 = max(x0 + 1, int((x + xx * CELL + 12) * sx)); y0 = int((y + yy * CELL + 4) * sy); y1 = max(y0 + 1, int((y + yy * CELL + 12) * sy))
                r, g, bb, al = [int(v) for v in np.median(a[y0:y1, x0:x1].reshape(-1, 4).astype(int), axis=0)]
                grey = False
                guide = (abs(r - 150) < 14 and abs(g - 190) < 14 and abs(bb - 235) < 14)
                chk = (abs(r - 228) < 3 and abs(g - 222) < 3 and abs(bb - 240) < 3) or (abs(r - 246) < 3 and abs(g - 242) < 3 and abs(bb - 252) < 3)
                magenta = r > 190 and bb > 190 and g < 120
                tp[xx, yy] = (0, 0, 0, 0) if (al < 100 or grey or guide or chk or magenta) else (r, g, bb, 255)
        atlas.paste(tile, ((t & 15) * 16, (t >> 4) * 16))
    atlas.save(out_path); print('wrote', out_path, 'tools for', mat)
if __name__ == '__main__' and sys.argv[1:2] in (['tools'], ['import-tools']):
    atlas_, blocks_, items_ = load()
    mats = ['Wooden', 'Stone', 'Iron', 'Golden', 'Diamond']
    if sys.argv[1] == 'tools':
        os.makedirs(os.path.join(HERE, 'templates', 'tools'), exist_ok=True)
        for m in mats:
            make_tools(m, items_, atlas_, False, os.path.join(HERE, 'templates', 'tools', m + '-Tools-blank.png')); make_tools(m, items_, atlas_, True, os.path.join(HERE, 'templates', 'tools', m + '-Tools-current.png'))
        print('wrote templates/tools')
    else: import_tools(sys.argv[2], items_, sys.argv[3])
