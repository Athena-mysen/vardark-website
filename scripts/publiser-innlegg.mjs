// Gjør et publisert LinkedIn-innlegg om til et blogginnlegg på norsk og engelsk.
// Bruk: node scripts/publiser-innlegg.mjs <kvittering.json>
// Kvitteringen lages av Athena etter verifisert publisering (se skillen vardark-blogg):
// {
//   "date": "YYYY-MM-DD", "url": "https://www.linkedin.com/feed/update/urn:li:share:…",
//   "title": "valgfri, ellers første linje i teksten", "text": "hele den publiserte teksten",
//   "images": [{ "path": "/abs/sti.jpg", "alt_nb": "…", "alt_en": "…" }],
//   "shared_url": "lenke hvis innlegget delte en artikkel, ellers null",
//   "card_alt_nb": "…", "card_alt_en": "…",
//   "en": { "title": "…", "text": "…" }
// }
// Skriver src/content/essays/<id>.md, src/content/essays-en/<id>.md og bilder i public/innlegg/<id>/.
// Gjør ingenting hvis innlegget (samme LinkedIn-URL) allerede finnes. Bygg, commit og push gjøres etterpå.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const nbDir = join(root, 'src/content/essays');
const enDir = join(root, 'src/content/essays-en');
const r = JSON.parse(readFileSync(process.argv[2], 'utf8'));
for (const k of ['date', 'url', 'text']) if (!r[k]) throw new Error(`kvitteringen mangler ${k}`);
if (!r.en?.title || !r.en?.text) throw new Error('kvitteringen mangler engelsk tittel og tekst');

const all = readdirSync(nbDir).map((f) => readFileSync(join(nbDir, f), 'utf8'));
if (all.some((t) => t.includes(r.url))) { console.log(JSON.stringify({ skipped: 'finnes allerede', url: r.url })); process.exit(0); }

const slug = (s) => s.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')
  .normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60).replace(/-$/, '');
const q = (s) => JSON.stringify(s);
const md = (s) => s.replace(/\r/g, '').split('\n').map((l) => l.trimEnd().replace(/^• /, '- ')).join('\n').replace(/\n{3,}/g, '\n\n').trim();

let text = r.text.trim();
let title = r.title;
if (!title) { const [first, ...rest] = text.split('\n'); title = first.trim(); text = rest.join('\n'); }
title = title.replace(/\.$/, '');
const id = `${r.date}-${slug(title)}`;
const enId = `${r.date}-${slug(r.en.title)}`;
const pub = join(root, 'public/innlegg', id);

// Bilder: JPEG, maks 1600 px på lengste side (sips finnes på macOS)
const jpeg = (src, dst) => {
  mkdirSync(pub, { recursive: true });
  const dims = (f) => execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', f]).toString();
  const big = Math.max(...[...dims(src).matchAll(/pixel(?:Width|Height): (\d+)/g)].map((m) => +m[1])) > 1600;
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '84', ...(big ? ['-Z', '1600'] : []), src, '--out', dst], { stdio: 'ignore' });
  const out = dims(dst);
  return { w: +out.match(/pixelWidth: (\d+)/)[1], h: +out.match(/pixelHeight: (\d+)/)[1] };
};
const fm = { nb: [], en: [] };
if (r.images?.length) {
  fm.nb.push('images:'); fm.en.push('images:');
  r.images.forEach((im, i) => {
    const { w, h } = jpeg(im.path, join(pub, `${i + 1}.jpg`));
    for (const [lang, alt] of [['nb', im.alt_nb], ['en', im.alt_en]]) fm[lang].push(`  - { src: "/innlegg/${id}/${i + 1}.jpg", alt: ${q(alt)}, w: ${w}, h: ${h} }`);
  });
}

// Lenkekort for delte artikler: tittel, nettsted og forhåndsvisningsbilde fra Open Graph
if (r.shared_url) {
  const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
  let html = '';
  try { html = await (await fetch(r.shared_url, { headers: { 'User-Agent': UA } })).text(); } catch {}
  const og = (k) => html.match(new RegExp(`<meta[^>]+(?:property|name)="og:${k}"[^>]+content="([^"]*)"`))?.[1]
    ?? html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:property|name)="og:${k}"`))?.[1];
  const dec = (s) => s?.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  const cardTitle = dec(og('title')) ?? r.shared_url;
  const site = dec(og('site_name')) ?? new URL(r.shared_url).hostname.replace(/^www\./, '');
  let img = null;
  const imgUrl = dec(og('image'));
  if (imgUrl && r.card_alt_nb) {
    try {
      const tmp = join(root, '.kort.tmp');
      writeFileSync(tmp, Buffer.from(await (await fetch(imgUrl, { headers: { 'User-Agent': UA } })).arrayBuffer()));
      img = jpeg(tmp, join(pub, 'lenke.jpg'));
      execFileSync('rm', [tmp]);
    } catch { img = null; }
  }
  for (const [lang, alt] of [['nb', r.card_alt_nb], ['en', r.card_alt_en]]) {
    fm[lang].push('link:', `  url: ${q(r.shared_url)}`, `  title: ${q(cardTitle)}`, `  site: ${q(site)}`);
    if (img) fm[lang].push(`  image: { src: "/innlegg/${id}/lenke.jpg", alt: ${q(alt)}, w: ${img.w}, h: ${img.h} }`);
  }
}

const head = (t, extra, lines) => `---\ntitle: ${q(t)}\ndate: ${r.date}\nlinkedin: ${q(r.url)}\n${extra}${lines.length ? lines.join('\n') + '\n' : ''}---\n`;
const nbFile = join(nbDir, `${id}.md`);
const enFile = join(enDir, `${enId}.md`);
if (existsSync(nbFile) || existsSync(enFile)) throw new Error(`filnavnet finnes allerede: ${id}`);
writeFileSync(nbFile, head(title, 'titleBy: kristian\n', fm.nb) + md(text) + '\n');
writeFileSync(enFile, head(r.en.title.replace(/\.$/, ''), `nb: ${q(id)}\n`, fm.en) + md(r.en.text) + '\n');
console.log(JSON.stringify({ nb: `/innlegg/${id}/`, en: `/en/posts/${enId}/`, files: [nbFile, enFile] }));
