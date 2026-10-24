# Genererer bildematerialet for designrunde 2: nattlandskap med varde, lys basalt, stjernefelt.
# Alt er prosedyrisk; ingen eksterne bilder. Kjør: python3 docs/designrunde-2/materiale.py
import numpy as np
from pathlib import Path
from PIL import Image, ImageDraw
from scipy.ndimage import gaussian_filter

OUT = Path(__file__).resolve().parents[2] / 'public' / 'material'
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(11)


def noise(h, w, scale, sx=1.0):
    gh, gw = max(2, int(h / scale)), max(2, int(w / (scale * sx)))
    small = Image.fromarray(rng.random((gh, gw)).astype(np.float32), 'F')
    return np.asarray(small.resize((w, h), Image.BICUBIC), dtype=np.float32)


def fbm(h, w, scale, octaves=5, sx=1.0):
    acc, amp, tot = np.zeros((h, w), np.float32), 1.0, 0.0
    for i in range(octaves):
        acc += amp * noise(h, w, scale / 2 ** i, sx)
        tot += amp
        amp *= 0.5
    return acc / tot


def mix(a, b, t):
    t = np.asarray(t)[..., None]
    return a * (1 - t) + b * t


def save(arr, name, q=80):
    Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).save(OUT / name, quality=q, method=6)
    print(name, (OUT / name).stat().st_size // 1024, 'kB')


def ridge(w, base, rough, seed_amp, n=10):
    """1D midtpunktforskyvning: fjellrygg som y-verdi per kolonne."""
    pts = np.array([base + rng.normal(0, seed_amp), base + rng.normal(0, seed_amp)])
    amp = seed_amp
    for _ in range(n):
        mid = (pts[:-1] + pts[1:]) / 2 + rng.normal(0, amp, len(pts) - 1)
        out = np.empty(len(pts) * 2 - 1)
        out[0::2], out[1::2] = pts, mid
        pts, amp = out, amp * rough
    return np.interp(np.linspace(0, len(pts) - 1, w), np.arange(len(pts)), pts)


def night(h, w, cx, top, hz=1.0):
    """Nattlandskap: lag av fjellrygger i dis, en varde på nærmeste rygg, ett ravgult lys."""
    y = np.mgrid[0:h, 0:w][0].astype(np.float32)
    sky = mix(np.array([6, 9, 16.]), np.array([20, 30, 46.]), (y / h) ** 1.6)
    stars = (rng.random((h, w)) > 0.9993) * rng.random((h, w)) ** 3 * 160
    img = sky + gaussian_filter(stars, 0.5)[..., None] * 1.6 * (1 - y / h)[..., None]
    layers = (  # (grunnlinje, ruhet, amplitude, farge, dis)
        (0.60, 0.55, 150, (30, 41, 58), 1.6),
        (0.70, 0.55, 110, (17, 25, 38), 1.0),
        (0.82, 0.58, 60, (6, 9, 15), 0.0),
    )
    cols = np.arange(w)
    for i, (b, r, a, col, haze) in enumerate(layers):
        line = ridge(w, b * hz * h, r, a)
        if i == 2:  # nærmeste rygg løftes mot varden, så den står på en topp
            line -= np.exp(-((cols - cx) / (w * 0.10)) ** 2) * h * 0.08
            line[cx - 40:cx + 40] = line[cx - 40:cx + 40].min()  # flatt platå under varden
            peak = line[cx]
        m = (y > line[None, :]).astype(np.float32)
        if haze:
            m = gaussian_filter(m, haze)
        img = mix(img, np.array(col, np.float32), m)
        # dis langs foten av hver rygg
        fog = np.exp(-((y - line[None, :] - 40) / 40) ** 2) * 0.10 * (i < 2)
        img = mix(img, np.array([60, 72, 92.]), fog)

    # Varden: tørrmurt tårn av flate heller i skift, svakt avsmalnende
    mask = Image.new('L', (w, h), 0)
    edge_img = Image.new('L', (w, h), 0)
    d, de = ImageDraw.Draw(mask), ImageDraw.Draw(edge_img)
    yy = peak + 8
    course_h = top * 0.034
    n_courses = int(top * 0.5 / course_h)
    for c in range(n_courses):
        t = c / n_courses
        width = top * (0.34 - 0.14 * t) * (1 - 0.45 * t ** 5) + rng.normal(0, top * 0.006)
        x = cx - width / 2
        hh = course_h * rng.uniform(0.6, 1.4)
        while x < cx + width / 2 - 2:
            sw = min(rng.uniform(0.18, 0.42) * top * 0.3, cx + width / 2 - x)
            j = rng.normal(0, 2.2, 4)
            sh = hh * rng.uniform(0.7, 1.15)
            poly = [(x + 1 + j[0], yy - sh + j[1]), (x + sw - 1 + j[2], yy - sh + j[3]),
                    (x + sw - 1, yy), (x + 1, yy)]
            d.polygon(poly, fill=255)
            de.polygon(poly, outline=255)
            x += sw
        yy -= hh
    peak_top = yy
    flame_y = peak_top - top * 0.03
    m = np.asarray(mask, np.float32) / 255
    edges = np.asarray(edge_img, np.float32) / 255
    hgt = gaussian_filter(m, 2.5) - gaussian_filter(edges, 1.0) * 0.5
    gy, gx = np.gradient(hgt * 14)
    yv, xv = np.mgrid[0:h, 0:w].astype(np.float32)
    lx, ly, lz = cx - xv, flame_y - yv, np.full_like(xv, 30.)
    ln = np.sqrt(lx ** 2 + ly ** 2 + lz ** 2)
    nz = 1 / np.sqrt(gx ** 2 + gy ** 2 + 1)
    lam = np.clip((-gx * lx - gy * ly + lz) * nz / ln, 0, 1)
    fall = 1 / (1 + (ln / (top * 0.075)) ** 2.6)
    stone = np.array([8, 10, 16.]) + (lam * fall + fall * 0.25)[..., None] * np.array([235, 130, 55.]) * 1.15
    stone *= (1 - gaussian_filter(edges, 0.7)[..., None] * 0.55)
    img = mix(img, stone, gaussian_filter(m, 0.7))

    # Lyset: kjerne, glød og svakt skjær på ryggen rundt
    r2 = ((xv - cx) ** 2 + ((yv - flame_y) * 1.3) ** 2)
    core = np.exp(-r2 / (top * 0.012) ** 2)
    glow = np.exp(-r2 / (top * 0.05) ** 2) * 0.6 + np.exp(-r2 / (top * 0.35) ** 2) * 0.12
    img += core[..., None] * np.array([255, 230, 190.]) + glow[..., None] * np.array([240, 150, 70.])
    img += (rng.random((h, w, 1)) - 0.5) * 7  # filmkorn
    return img


def basalt(h, w):
    tone = fbm(h, w, 500, 5)
    mottle = fbm(h, w, 36, 3)
    out = mix(np.array([229, 229, 224.]), np.array([204, 205, 200.]), np.clip(tone * 1.2 - 0.15 + (mottle - 0.5) * 0.5, 0, 1))
    grain = rng.random((h, w))
    out = mix(out, np.array([120, 124, 128.]), np.clip((grain - 0.93) * 6, 0, 0.45))
    out = mix(out, np.array([245, 245, 242.]), np.clip((0.04 - grain) * 12, 0, 0.4))
    return out + (rng.random((h, w, 1)) - 0.5) * 6


def starfield(h, w):
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    img = mix(np.array([4, 6, 12.]), np.array([9, 13, 24.]), y / h)
    band = np.exp(-(((x / w) * 0.55 + (y / h) - 0.75) / 0.22) ** 2)  # svakt melkeveibånd
    dust = fbm(h, w, 380, 6) * band
    img = mix(img, np.array([40, 50, 70.]), np.clip(dust * 0.55, 0, 1))
    img = mix(img, np.array([3, 4, 8.]), np.clip((fbm(h, w, 120, 4) - 0.55) * 3, 0, 1) * band * 0.8)
    for density, size, bright in ((0.996, 0.5, 120), (0.9993, 0.8, 220), (0.99993, 1.4, 255)):
        s = (rng.random((h, w)) > density + (1 - density) * (1 - band) * 0.6) * rng.random((h, w))
        img += gaussian_filter(s * bright, size)[..., None] * np.array([1.0, 1.0, 1.05]) * (3 if size > 1 else 1.6)
    fade = np.clip((y / h - 0.62) / 0.38, 0, 1) ** 1.5  # nederste tredjedel tones til bakgrunnsfargen
    img = mix(img, np.array([5, 7, 13.]), fade)
    return img + (rng.random((h, w, 1)) - 0.5) * 4 * (1 - fade[..., None])


if __name__ == '__main__':
    save(night(1300, 2400, cx=1700, top=1000), 'natt-varde.webp', q=82)
    save(night(1700, 900, cx=470, top=560, hz=0.6), 'natt-varde-mobil.webp', q=82)
    b = basalt(800, 800)
    b = np.concatenate([b, b[:, ::-1]], 1)
    save(np.concatenate([b, b[::-1]], 0), 'basalt.webp')  # speilet: sømløs flis
    save(starfield(1600, 2400), 'stjernefelt.webp')
