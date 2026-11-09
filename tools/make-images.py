#!/usr/bin/env python3
"""Нарезка мастера в набор для <picture> (AVIF, WebP, JPEG). Исходник никогда не увеличивается.

python3 tools/make-images.py <мастер> <d|m|h> <имя> <папка> [--widths 320,560] [--crop 4:3] [--bg #25282A]
  d = десктопный мастер      (ширины 320/560/1120, минимум 1120 px)
  m = мобильный мастер       (ширины 480/800/1100, минимум 800 px, лучше 1100)
  h = во всю ширину экрана   (ширины 1120/1440/1920, минимум 1920 px)
  --widths  свои ширины через запятую вместо пресета: слот редко совпадает с лестницей
  --crop W:H кадрировать по центру до пропорции перед уменьшением — так из десктопного
            мастера получается мобильный кадр, когда слот на телефоне другой формы
  --bg      подложить цвет под прозрачность (альфа в JPEG не живёт)
Пример: python3 tools/make-images.py img-src/hero-m.png m hero out/   → out/hero-m-480.avif …"""
import sys, pathlib
from PIL import Image

args = sys.argv[1:]
opts = {}
for key in ('--widths', '--crop', '--bg'):
    if key in args:
        i = args.index(key); opts[key] = args[i + 1]; del args[i:i + 2]
if len(args) != 4: sys.exit(__doc__)
src, kind, name, out = args[0], args[1], args[2], pathlib.Path(args[3])
PRESET = {'d': ([320, 560, 1120], 1120), 'm': ([480, 800, 1100], 800), 'h': ([1120, 1440, 1920], 1920)}
if kind not in PRESET: sys.exit(__doc__)
WIDTHS, MINW = PRESET[kind]
if '--widths' in opts: WIDTHS = [int(w) for w in opts['--widths'].split(',')]; MINW = max(WIDTHS)

im = Image.open(src)
if '--bg' in opts and im.mode in ('RGBA', 'LA', 'P'):
    im = im.convert('RGBA'); flat = Image.new('RGB', im.size, opts['--bg']); flat.paste(im, (0, 0), im); im = flat
im = im.convert('RGB')
if '--crop' in opts:
    rw, rh = (float(v) for v in opts['--crop'].split(':')); want = rw / rh
    w, h = im.size
    if w / h > want: nw = round(h * want); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:            nh = round(w / want); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
out.mkdir(parents=True, exist_ok=True)
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
