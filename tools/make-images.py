#!/usr/bin/env python3
"""Нарезка мастера в набор для <picture> (AVIF, WebP, JPEG). Исходник никогда не увеличивается.
python3 tools/make-images.py <мастер> <d|m> <имя> <папка>
  d = десктопный мастер (ширины 320/560/1120, минимум 1120 px)
  m = мобильный мастер  (ширины 480/800/1100, минимум 800 px, лучше 1100)
Пример: python3 tools/make-images.py hero-m.png m hero out/   → out/hero-m-480.avif …"""
import sys, pathlib
from PIL import Image
if len(sys.argv) != 5: sys.exit(__doc__)
src, kind, name, out = sys.argv[1], sys.argv[2], sys.argv[3], pathlib.Path(sys.argv[4])
WIDTHS = {'d': [320, 560, 1120], 'm': [480, 800, 1100]}[kind]
MINW = {'d': 1120, 'm': 800}[kind]
im = Image.open(src).convert('RGB'); out.mkdir(parents=True, exist_ok=True)
if im.width < MINW: print(f'ВНИМАНИЕ: мастер {im.width}px уже минимума {MINW}px, на ретине будет мыльно. Нужен файл побольше.')
fmts = [('webp', {'quality': 78, 'method': 6}), ('jpg', {'quality': 80, 'optimize': True, 'progressive': True})]
try:
    Image.new('RGB', (8, 8)).save(out / '_t.avif', 'AVIF'); (out / '_t.avif').unlink(); fmts.insert(0, ('avif', {'quality': 55}))
except Exception: print('AVIF не поддерживается этим Pillow: сделай AVIF через Squoosh или avifenc.')
for w in [w for w in WIDTHS if w <= im.width] or [im.width]:
    r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    for ext, kw in fmts:
        p = out / f'{name}-{kind}-{w}.{ext}'
        r.save(p, 'JPEG' if ext == 'jpg' else ext.upper(), **kw); print(p.name, p.stat().st_size // 1024, 'КБ')
