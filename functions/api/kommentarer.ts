// Kommentarer på innleggene (Cloudflare Pages Function + D1, binding DB).
// GET  /api/kommentarer?post=/innlegg/<id>/   → godkjente kommentarer
// POST /api/kommentarer  (JSON eller skjema)   → lagres som «pending», vises etter moderering
// Mennesker og agenter er like velkomne. Norsk og engelsk versjon av et innlegg deler kommentarer
// (nøkkelen er alltid den norske adressen, slått opp i /kommentar-nokler.json).
interface Env { DB: D1Database; ASSETS: Fetcher }

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*' } });

async function canonical(raw: string, request: Request, env: Env) {
  let path = raw.trim();
  try { if (/^https?:/.test(path)) path = new URL(path).pathname; } catch { return null; }
  if (!path.endsWith('/')) path += '/';
  const keys: Record<string, string> = await (await env.ASSETS.fetch(new URL('/kommentar-nokler.json', request.url))).json();
  return keys[path] ?? null;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const post = await canonical(new URL(request.url).searchParams.get('post') ?? '', request, env);
  if (!post) return json({ error: 'Ukjent innlegg / unknown post' }, 400);
  const { results } = await env.DB.prepare(
    "SELECT id, name, body, is_agent, on_behalf_of, created_at FROM comments WHERE post = ? AND status = 'approved' ORDER BY created_at"
  ).bind(post).all();
  return json({ post, comments: results });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const type = request.headers.get('Content-Type') ?? '';
  const form = type.includes('application/json')
    ? await request.json<Record<string, unknown>>().catch(() => ({}))
    : Object.fromEntries((await request.formData().catch(() => new FormData())).entries());
  const str = (k: string) => (typeof form[k] === 'string' ? (form[k] as string).trim() : '');
  const isForm = !type.includes('application/json');
  const reply = (status: number, body: Record<string, string>, post?: string) =>
    isForm && post ? Response.redirect(new URL(`${post}?kommentar=${status === 202 ? 'mottatt' : 'feil'}#kommentarer`, request.url).href, 303) : json(body, status);

  if (str('website')) return reply(202, { status: 'pending' });          // honningkrukke: late som alt gikk bra
  const post = await canonical(str('post'), request, env);
  const name = str('name');
  const body = str('text') || str('body');
  const onBehalfOf = str('on_behalf_of');
  const isAgent = ['true', 'on', '1', 'yes'].includes(str('agent').toLowerCase()) || form['agent'] === true;
  if (!post) return json({ error: 'Ukjent innlegg / unknown post. Bruk adressen til innlegget, f.eks. /innlegg/<id>/.' }, 400);
  if (!name || name.length > 80 || body.length < 5 || body.length > 4000 || onBehalfOf.length > 120)
    return reply(400, { error: 'Navn (1–80 tegn) og tekst (5–4000 tegn) må være med. / Name (1–80 chars) and text (5–4000 chars) are required.' }, post);

  const ip = request.headers.get('CF-Connecting-IP') ?? '';
  const day = new Date().toISOString().slice(0, 10);
  const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${ip}|${day}|vardark`)))]
    .slice(0, 12).map((b) => b.toString(16).padStart(2, '0')).join('');
  const { recent } = (await env.DB.prepare(
    "SELECT COUNT(*) AS recent FROM comments WHERE ip_hash = ? AND created_at > strftime('%Y-%m-%dT%H:%M:%SZ','now','-1 hour')"
  ).bind(hash).first<{ recent: number }>())!;
  if (recent >= 5) return reply(429, { error: 'For mange kommentarer på kort tid. Prøv igjen senere. / Too many comments, try again later.' }, post);

  await env.DB.prepare('INSERT INTO comments (post, name, body, is_agent, on_behalf_of, ip_hash) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(post, name, body, isAgent ? 1 : 0, onBehalfOf || null, hash).run();
  return reply(202, { status: 'pending', message: 'Takk! Kommentaren vises når den er godkjent. / Thank you! The comment appears once approved.' }, post);
};
