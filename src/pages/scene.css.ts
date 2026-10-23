// Posisjonene til de animerte lagene i nattlandskapet, regnet ut fra samme geometri som SVG-en.
// Eget stilark fordi CSP-en (style-src 'self') stopper style-attributter.
import { flame, chain, pct } from '../lib/scene';

export function GET() {
  const p = pct(flame.x, flame.y);
  const vars = [`--fx:${p.x}`, `--fy:${p.y}`, ...chain.flatMap((c) => { const q = pct(c.x, c.cairn.top); return [`--c${c.i + 1}x:${q.x}`, `--c${c.i + 1}y:${q.y}`]; })];
  return new Response(`.scene{${vars.join(';')}}\n`, { headers: { 'Content-Type': 'text/css; charset=utf-8' } });
}
