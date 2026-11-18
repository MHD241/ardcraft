"""Convert a large, hand-drawn villager skin into Ard's exact 64x64 template.
Finds each part, then the black outlines between its faces, and samples every face on its own grid.
Usage: python3 import_skin.py source.jpg out.png"""
import sys, json
import numpy as np
from PIL import Image
from collections import deque
src, out = sys.argv[1], sys.argv[2]
a = np.asarray(Image.open(src).convert("RGB")).astype(int)
H, W, _ = a.shape
sat = a.max(axis=2) - a.min(axis=2)
bgmask = (a.min(axis=2) > 224) & (sat < 12)
checker = ((a.min(axis=2) > 226) & (a.min(axis=2) < 242) & (sat < 6)).mean() > 0.03   # grey squares present
ink = ~bgmask if checker else a.min(axis=2) < 225
line = a.max(axis=2) < 48           # outline ink, darker than any paint
lab = np.zeros((H, W), int); comps = []
for sy in range(0, H, 3):
    for sx in range(0, W, 3):
        if ink[sy, sx] and not lab[sy, sx]:
            n = len(comps) + 1; q = deque([(sy, sx)]); lab[sy, sx] = n; x0 = x1 = sx; y0 = y1 = sy; cnt = 0
            while q:
                y, x = q.popleft(); cnt += 1
                x0, x1, y0, y1 = min(x0, x), max(x1, x), min(y0, y), max(y1, y)
                for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
                    yy, xx = y + dy, x + dx
                    if 0 <= yy < H and 0 <= xx < W and ink[yy, xx] and not lab[yy, xx]: lab[yy, xx] = n; q.append((yy, xx))
            if cnt > 2000: comps.append((x0, y0, x1, y1))
PARTS = [("head", 0, 0, 8, 8, 8), ("hat", 32, 0, 8, 8, 8), ("body", 0, 16, 9, 10, 6), ("lower", 32, 16, 8, 10, 6), ("armR", 0, 34, 2, 10, 3), ("armL", 12, 34, 2, 10, 3)]
hatc = [c for c in comps if (c[0] + c[2]) / 2 > W * 0.5 and (c[1] + c[3]) / 2 < H * 0.3]
loose_hat = len(hatc) > 1
used = set(comps.index(c) for c in hatc) if loose_hat else set(); match = {}
for p in PARTS:
    if loose_hat and p[0] == "hat": continue
    u, v, w, h, d = p[1:]; cx, cy = (u + d + w) / 64, (v + (d + h) / 2) / 64; best = None
    for i, (x0, y0, x1, y1) in enumerate(comps):
        if i in used: continue
        dd = ((x0 + x1) / 2 / W - cx) ** 2 + ((y0 + y1) / 2 / H - cy) ** 2
        if best is None or dd < best[0]: best = (dd, i)
    used.add(best[1]); match[p[0]] = comps[best[1]]
def clusters(profile, thr, lo):
    idx = [i for i, v in enumerate(profile) if v > thr]; cl = []
    for i in idx:
        if cl and i - cl[-1][1] <= 2: cl[-1][1] = i
        else: cl.append([i, i])
    return [(s + lo, e + lo) for s, e in cl]
def spans(lines, n, lo, hi):
    """turn outline clusters into n face intervals (inner edges); fall back to equal split"""
    if len(lines) >= n + 1:
        lines = sorted(lines)
        # keep the n+1 lines that best match an even spread
        step = (hi - lo) / n; pick = []
        for k in range(n + 1):
            t = lo + k * step; pick.append(min(lines, key=lambda l: abs((l[0] + l[1]) / 2 - t)))
        return [(pick[k][1] + 1, pick[k + 1][0] - 1) for k in range(n)]
    step = (hi - lo) / n; return [(int(lo + k * step), int(lo + (k + 1) * step)) for k in range(n)]
def sample(x, y, r):
    x, y = int(round(x)), int(round(y)); patch = a[max(0, y - r):y + r + 1, max(0, x - r):x + r + 1].reshape(-1, 3)
    return tuple(int(v) for v in np.median(patch, axis=0))
res = Image.new("RGBA", (64, 64), (0, 0, 0, 0)); px = res.load(); meta = {}
def is_bg(c): return checker and min(c) > 224 and max(c) - min(c) < 12
for name, u, v, w, h, d in PARTS:
    if loose_hat and name == "hat":
        tops = sorted(sorted(hatc, key=lambda c: c[1])[:2], key=lambda c: c[0])
        sides = [c for c in hatc if c not in tops]
        sx0, sy0, sx1, sy1 = min(c[0] for c in sides), min(c[1] for c in sides), max(c[2] for c in sides), max(c[3] for c in sides)
        sw = (sx1 - sx0 + 1) / 4
        faces = [(u + d, v, w, d, (tops[0][0], tops[0][2]), (tops[0][1], tops[0][3])), (u + d + w, v, w, d, (tops[1][0], tops[1][2]), (tops[1][1], tops[1][3]))]
        faces += [(fx, v + d, fw, h, (sx0 + k * sw, sx0 + (k + 1) * sw - 1), (sy0, sy1)) for k, (fx, fw) in enumerate([(u, d), (u + d, w), (u + d + w, d), (u + 2 * d + w, w)])]
        for fx, fy, fw, fh, (ax0, ax1), (ay0, ay1) in faces:
            cw, ch = (ax1 - ax0 + 1) / fw, (ay1 - ay0 + 1) / fh; r = max(1, int(min(cw, ch) * 0.2))
            for j in range(fh):
                for i in range(fw):
                    c = sample(ax0 + (i + 0.5) * cw, ay0 + (j + 0.5) * ch, r)
                    px[fx + i, fy + j] = (0, 0, 0, 0) if is_bg(c) else c + (255,)
        meta["capRows"] = 8; continue
    x0, y0, x1, y1 = match[name]
    # rows of outline that run across most of the part: top and bottom of the side-face strip
    rows = clusters((line[y0:y1 + 1, x0:x1 + 1]).mean(axis=1), 0.75, y0)
    side_top = min((r for r in rows if r[0] > y0 + (y1 - y0) * 0.2), key=lambda r: r[0], default=(int(y0 + (y1 - y0) * d / (d + h)),) * 2)
    bot = clusters((line[side_top[1] + 5:y1 + 1, x0:x1 + 1]).mean(axis=1), 0.45, side_top[1] + 5)
    bot = [c for c in bot if c[0] > y1 - (y1 - y0) * 0.08]
    side = (side_top[1] + 1, (bot[-1][0] - 1) if bot else y1)
    top = (y0, side_top[0] - 1)
    sl = clusters((line[side[0]:side[1] + 1, x0:x1 + 1]).mean(axis=0), 0.75, x0)
    sf = spans(sl, 4, x0, x1)
    tl = clusters((line[top[0] + 3:top[1] - 2, x0:x1 + 1]).mean(axis=0), 0.75, x0)
    tl = [l for l in tl if sf[0][1] - 4 <= l[0] <= x1]
    tf = spans(tl, 2, sf[1][0], sf[2][1]) if len(tl) >= 3 else [sf[1], sf[2]]
    # the top/bottom strip: find its own top outline
    tr = clusters((line[y0:side_top[0], tf[0][0]:tf[1][1] + 1]).mean(axis=1), 0.6, y0)
    ttop = (tr[0][1] + 1) if tr else y0
    unit = (sf[1][1] - sf[1][0]) / w
    srows = h
    if name == "hat":
        srows = max(1, min(h, round((side[1] - side[0]) / unit))); meta["capRows"] = srows
    def top_rows(c):
        cl = clusters((line[y0:side_top[0], c[0]:c[1] + 1]).mean(axis=1), 0.6, y0)
        cl = [r for r in cl if r[1] < side_top[0] - 5]
        return ((cl[0][1] + 1) if cl else y0, side_top[0] - 1)
    faces = [(u + d, v, w, d, tf[0], top_rows(tf[0])), (u + d + w, v, w, d, tf[1], top_rows(tf[1])),
             (u, v + d, d, srows, sf[0], side), (u + d, v + d, w, srows, sf[1], side), (u + d + w, v + d, d, srows, sf[2], side), (u + 2 * d + w, v + d, w, srows, sf[3], side)]
    for fx, fy, fw, fh, (ax0, ax1), (ay0, ay1) in faces:
        cw, ch = (ax1 - ax0 + 1) / fw, (ay1 - ay0 + 1) / fh; r = max(1, int(min(cw, ch) * 0.2))
        for j in range(fh):
            for i in range(fw):
                px[fx + i, fy + j] = sample(ax0 + (i + 0.5) * cw, ay0 + (j + 0.5) * ch, r) + (255,)
    meta[name] = {"side": sf, "top": tf, "rows": rows, "side_y": side, "ttop": ttop, "side_top": side_top}
res.save(out)
json.dump({"capRows": meta.get("capRows", 8)}, open(out.replace(".png", ".json"), "w"))
print(json.dumps({k: v for k, v in meta.items()}, default=str))
