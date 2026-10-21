# Genererer Urnes-ornamentet: én rapport (240x64) tegnet med Bézier, gjort om til
# tilspissede bånd (fylte stier) slik at «dyret» sveller og «ormen» smalner mot rankene.
# Kjør: python3 docs/designrunde-2/urnes.py  -> skriver src/components/Urnes.astro
import numpy as np
from pathlib import Path

U, H = 240, 64

def cubic(p0, p1, p2, p3, n=22):
    t = np.linspace(0, 1, n)[:, None]
    return (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3 * p3

def chain(segs):
    return np.vstack([cubic(*map(np.array, s)) for s in segs])

def ribbon(pts, w):
    d = np.gradient(pts, axis=0); n = np.hypot(d[:, 0], d[:, 1])[:, None]
    nrm = np.c_[-d[:, 1], d[:, 0]] / n
    L, R = pts + nrm * w[:, None] / 2, (pts - nrm * w[:, None] / 2)[::-1]
    return 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in np.r_[L, R]) + 'Z'

# Dyret: langsom bølge, sveller på oppturen
beast = chain([((0, 44), (60, 44), (80, 12), (120, 12)), ((120, 12), (160, 12), (180, 44), (240, 44))])
s = np.linspace(0, 1, len(beast))
w_beast = 2.4 + 4.2 * np.sin(np.pi * (s * 2 + 0.15)) ** 2

# Ormen: åttetallsløkke rundt toppen, samme tangent inn og ut av rapporten
worm = chain([((0, 22), (20, 18), (60, 56), (112, 50)), ((112, 50), (158, 44), (160, 8), (126, 9)),
              ((126, 9), (100, 10), (96, 34), (140, 46)), ((140, 46), (180, 57), (220, 26), (240, 22))])
s = np.linspace(0, 1, len(worm))
w_worm = 1.1 + 1.3 * np.sin(np.pi * s * 4) ** 2

# Ranker: korte spiraler festet til ormen
def curl(x, y, sign, scale=1):
    th = np.linspace(0, 2.6 * np.pi, 40)
    r = 8 * scale * (1 - th / (2.9 * np.pi))
    pts = np.c_[x + sign * r * np.cos(th + np.pi), y - r * np.sin(th + np.pi) * 0.85]
    pts += np.array([x, y]) - pts[0]
    return ribbon(pts, 0.3 + 1.4 * (1 - th / th[-1]))

def unit(o):
    off = np.array([o, 0])
    return dict(a=ribbon(beast + off, w_beast), b=ribbon(worm + off, w_worm),
                c=curl(o + 126, 9, 1, 1.5) + " " + curl(o + 112, 50, -1, 1.2))

if __name__ == '__main__':
    n = 6
    parts = [unit(i * U) for i in range(n)]
    a = ' '.join(p['a'] for p in parts); b = ' '.join(p['b'] for p in parts); c = ' '.join(p['c'] for p in parts)
    comp = f'''---
// Urnes-inspirert ornamentlinje (generert av docs/designrunde-2/urnes.py; ikke rediger stiene for hånd).
// Dyret og ormen flettes: ormen får en «glorie» i bakgrunnsfargen der den krysser over.
interface Props {{ class?: string }}
const {{ class: cls = '' }} = Astro.props;
---
<svg class={{`urnes ${{cls}}`}} viewBox="0 -8 {n * U} {H + 16}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <path class="urnes__beast" d="{a}" />
  <path class="urnes__halo" d="{b}" />
  <path class="urnes__worm" d="{b} {c}" />
</svg>
<style>
  .urnes {{ display: block; width: 100%; height: clamp(2.5rem, 5vw, 4rem); }}
  .urnes__beast, .urnes__worm {{ fill: currentColor; }}
  .urnes__halo {{ fill: none; stroke: var(--urnes-bg, #f6f6f3); stroke-width: 4; stroke-linejoin: round; }}
</style>
'''
    Path(__file__).resolve().parents[2].joinpath('src/components/Urnes.astro').write_text(comp)
    print('skrev src/components/Urnes.astro', len(comp) // 1024, 'kB')
