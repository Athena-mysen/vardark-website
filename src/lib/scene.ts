// Geometrien for nattlandskapet, seedet og deterministisk. Brukes av Vardescene.astro (SVG)
// og /scene.css (posisjoner for de animerte lagene, siden CSP forbyr style-attributter).
export const W = 1600, H = 1000;
export const MAIN_X = 1150;

function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const f = (n: number) => n.toFixed(1);

type Bump = { x: number; h: number; w: number };
type Seat = { x: number; w: number };
function ridge(seed: number, base: number, amp: number, bumps: Bump[], rock = 1, seats: Seat[] = []) {
  const r = rng(seed);
  const oct = [0, 1, 2, 3].map((i) => ({ k: (i + 1) * 1.7 + r(), p: r() * 6.28, a: amp / (i + 1) ** 1.3 }));
  oct.push({ k: 19 + r() * 3, p: r() * 6.28, a: amp * 0.09 * rock }, { k: 43 + r() * 5, p: r() * 6.28, a: amp * 0.05 * rock });
  const y = (x: number) => {
    let v = base;
    for (const o of oct) v -= Math.sin((x / W) * o.k * 6.28 + o.p) * o.a;
    for (const b of bumps) v -= b.h * Math.exp(-(((x - b.x) / b.w) ** 2));
    return v + (r() - 0.5) * amp * 0.12;
  };
  const pts: [number, number][] = [];
  for (let x = -40; x <= W + 40; x += 6) pts.push([x, y(x)]);
  // Et sete for hver varde: en avrundet topp litt bredere enn foten, som glir over i fjellet rundt.
  for (const { x, w } of seats) {
    const top = Math.min(...pts.filter((p) => Math.abs(p[0] - x) < w).map((p) => p[1]));
    for (const p of pts) {
      const dx = Math.abs(p[0] - x);
      const rough = dx > w * 0.6 ? (Math.sin(p[0] * 0.9) * 1.3 + Math.sin(p[0] * 2.3) * 0.7) * (w / 50) : 0; // ujevn fjellkant utenfor foten
      const seat = top + (dx / w) ** 2 * w * 0.12 + rough;
      if (dx < w) p[1] = seat;
      else if (dx < w * 2) { const t = (dx - w) / w; p[1] = seat * (1 - t * t) + p[1] * t * t; }
    }
  }
  const at = (x: number) => pts.reduce((a, p) => (Math.abs(p[0] - x) < Math.abs(a[0] - x) ? p : a))[1];
  return {
    line: pts.map(([x, v], i) => `${i ? 'L' : 'M'}${x} ${f(v)}`).join(' '),
    d: `M-40 ${H} ` + pts.map(([x, v]) => `L${x} ${f(v)}`).join(' ') + ` L${W + 40} ${H}Z`,
    at,
  };
}

export const layers = [
  { fill: '#1a2740', r: ridge(11, 610, 38, [{ x: 700, h: 60, w: 55 }, { x: 1490, h: 75, w: 60 }], 1, [{ x: 700, w: 16 }, { x: 1490, w: 16 }]) },
  { fill: '#121c30', r: ridge(23, 672, 46, [{ x: 860, h: 85, w: 65 }, { x: 1340, h: 70, w: 60 }], 1, [{ x: 860, w: 21 }, { x: 1340, w: 21 }]) },
  { fill: '#0b1322', r: ridge(37, 752, 40, [{ x: 330, h: 40, w: 90 }, { x: 1010, h: 50, w: 70 }], 1.4) },
  { fill: '#05080f', r: ridge(51, 860, 30, [{ x: MAIN_X, h: 215, w: 120 }, { x: 1060, h: 150, w: 90 }, { x: 1255, h: 175, w: 120 }, { x: 1380, h: 90, w: 90 }, { x: 950, h: 70, w: 110 }], 2.6, [{ x: MAIN_X, w: 56 }]) },
];

function stoneAt(r: () => number, x: number, y: number, w: number, h: number, s: number, o: number, rough = 1): Stone {
  const j = () => (r() - 0.5) * 3 * s * rough;
  const tilt = (r() - 0.5) * 4 * s * rough;
  const c = [[x + j(), y + j() + tilt], [x + w + j(), y + j() - tilt], [x + w - 3 * s + j(), y - h + j() - tilt], [x + 3 * s + j(), y - h + j() + tilt]];
  const at = (a: number[], b: number[], t: number) => `${f(a[0] + (b[0] - a[0]) * t)} ${f(a[1] + (b[1] - a[1]) * t)}`;
  let d = `M${at(c[0], c[1], 0.3)}`;
  for (let i = 1; i <= 4; i++) { const a = c[i - 1], b = c[i % 4], nx = c[(i + 1) % 4]; d += ` L${at(a, b, 0.7)} Q${f(b[0])} ${f(b[1])} ${at(b, nx, 0.3)}`; }
  return { d: d + 'Z', g: Math.floor(r() * 3), edge: `M${at(c[3], c[2], 0.18)} L${at(c[3], c[2], 0.82)}`, o };
}

// Varden: smal tørrmur av skjeve, avrundede heller, med bål av kubber på toppen.
export type Stone = { d: string; g: number; edge: string; o: number };
export function cairn(seed: number, cx: number, baseY: number, s = 1, rows = 9, ground?: (x: number) => number) {
  const r = rng(seed);
  const stones: Stone[] = [];
  let y = baseY;
  for (let row = 0; row < rows; row++) {
    const k = row / rows;
    const width = (84 - k * 50 + (r() - 0.5) * 8) * s;
    const h = (13 + r() * 6 - k * 3) * s;
    const base = width > 56 * s ? 3 : width > 30 * s ? 2 : 1;
    const n = row % 2 ? Math.max(1, base - 1) : base; // annenhver rad forskutt, som i en tørrmur
    const ws = Array.from({ length: n }, () => (width / n) * (1 + r() * 0.18));
    let x = cx - (ws.reduce((a, b) => a + b, 0) * 0.93) / 2 + (r() - 0.5) * 3 * s;
    for (const w of ws) {
      stones.push(stoneAt(r, x, y, w, h, s, 0.2 + k * 0.6));
      x += w * 0.93;
    }
    y -= h - s;
  }
  // Bålet: to liggende kubber og tre som lener seg mot hverandre
  const t = y + 2 * s;
  const logs = [
    { x: cx - 17 * s, y: t - 4 * s, w: 34 * s, a: -6 }, { x: cx - 15 * s, y: t - 8 * s, w: 30 * s, a: 7 },
    { x: cx - 13 * s, y: t - 6 * s, w: 24 * s, a: -58 }, { x: cx - 10 * s, y: t - 6 * s, w: 24 * s, a: -122 }, { x: cx - 3 * s, y: t - 6 * s, w: 22 * s, a: -88 },
  ].map((l) => ({ ...l, h: 4.2 * s }));
  // Foten: en jordkant foran de nederste steinene og litt steinur rundt, så varden står i fjellet
  const half = 44 * s;
  const g = ground ?? (() => baseY);
  const lip: string[] = [];
  for (let x = cx - half * 1.35; x <= cx + half * 1.35; x += 3 * s) lip.push(`${f(x)} ${f(g(x) - 1 * s - r() * 1.2 * s * (1 - Math.abs(x - cx) / (half * 1.4)))}`);
  const lipD = `M${f(cx - half * 1.35)} ${f(g(cx - half * 1.35) + 14 * s)} L${lip.join(' L')} L${f(cx + half * 1.35)} ${f(g(cx + half * 1.35) + 14 * s)}Z`;
  const rubble = [-1.18, -0.96, 1.0, 1.22].map((u, i) => {
    const w = (13 + r() * 8) * s, h = (6 + r() * 3) * s, x = cx + u * half - w / 2;
    return stoneAt(r, x, g(x + w / 2) + (i % 2 ? 3.5 : 2.5) * s, w, h, s, 0.5, 0.35);
  });
  return { stones, logs, top: t - 8 * s, s, lip: lipD, rubble };
}

const mainY = layers[3].r.at(MAIN_X);
export const big = cairn(7, MAIN_X, mainY + 3, 1, 9, layers[3].r.at);
export const flame = { x: MAIN_X, y: big.top };

const cr = rng(77);
export const crags = Array.from({ length: 9 }, (_, i) => {
  const side = i % 2 ? 1 : -1;
  let x = MAIN_X + side * (40 + cr() * 90), y = layers[3].r.at(x) + 8 + cr() * 14;
  const pts = [[x, y]];
  for (let k = 0; k < 6; k++) { x += side * (4 + cr() * 14); y += 10 + cr() * 18; pts.push([x, y]); }
  return pts.map(([a, b], k) => `${k ? 'L' : 'M'}${f(a)} ${f(b)}`).join(' ');
});

// Kjeden: to grener ut fra den store varden, østover og vestover.
export const chain = [
  { x: 1340, l: 1, s: 0.36 }, { x: 1490, l: 0, s: 0.27 }, { x: 860, l: 1, s: 0.36 }, { x: 700, l: 0, s: 0.27 },
].map((c, i) => {
  const y = layers[c.l].r.at(c.x);
  return { ...c, i, y, cairn: cairn(31 + i, c.x, y + c.s, c.s, 6, layers[c.l].r.at) };
});

const sr = rng(99);
export const stars = Array.from({ length: 360 }, (_, i) => {
  const band = i % 3 === 0; // tettere langs melkeveien
  const x = sr() * W;
  const y = band ? 80 + x * 0.22 + (sr() - 0.5) * 140 : sr() * 640;
  return { x, y, r: 0.3 + sr() ** 3 * 1.3, o: 0.25 + sr() * 0.75 };
}).filter((s) => s.y < 700);
// Noen få stjerner blinker, i et eget lett lag
export const twinkles = Array.from({ length: 28 }, (_, i) => ({ x: sr() * W, y: sr() * 300, r: 0.9 + sr() * 0.8, c: (i % 5) + 1 }));

const hop = (pts: (readonly [number, number])[]) =>
  pts.map(([x, y], i) => (i === 0 ? `M${x} ${f(y)}` : `Q${f((pts[i - 1][0] + x) / 2)} ${f(Math.min(pts[i - 1][1], y) - 50)} ${x} ${f(y)}`)).join(' ');
const tip = (c: (typeof chain)[number]) => [c.x, c.cairn.top - 6] as const;
export const signal = [hop([[flame.x, flame.y - 26], tip(chain[0]), tip(chain[1])]), hop([[flame.x, flame.y - 26], tip(chain[2]), tip(chain[3])])];

export const pct = (x: number, y: number) => ({ x: `${((x / W) * 100).toFixed(3)}%`, y: `${((y / H) * 100).toFixed(3)}%` });
