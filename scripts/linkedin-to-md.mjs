// Konverterer LinkedIn-eksportens Shares-CSV til markdown-essays i src/content/essays/.
// Bruk: node scripts/linkedin-to-md.mjs <Shares.csv>
// Eksisterende filer overskrives ikke (redigeringer er trygge). Innlegg under 400 tegn hoppes over.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const src = process.argv[2];
if (!src) { console.error('bruk: node scripts/linkedin-to-md.mjs <Shares.csv>'); process.exit(1); }
const outDir = new URL('../src/content/essays/', import.meta.url).pathname;

// Titler for innlegg uten egen tittellinje, satt av Claude 2026-10-20. Kristian kan endre fritt i fila.
const TITLES = {
  '2022-06-30': 'Første steg mot skalert smidig i program Mime',
  '2024-04-06': 'Ny langtidsplan for Forsvaret',
  '2026-01-29': 'Tilbake til koden',
  '2026-02-17': 'Ukraina som inkubator',
  '2026-02-24': '2028 Global Intelligence Crisis',
  '2026-03-07': 'En vanlig lørdag',
  '2026-03-16': 'OpenClaw Meetup: claws som gir verdi',
  '2026-04-14': 'Senker leverandørene kvaliteten?',
  '2026-04-20': 'Palantirs budskap',
  '2026-04-21': 'NATO om motstandernes språkmodeller',
  '2026-05-06': 'Colossus til leie',
  '2026-06-13': 'Da Fable og Mythos forsvant',
};
const SKIP = new Set(['2024-05-28']); // stillingsannonse

function parseCsv(text) {
  const rows = []; let row = []; let field = ''; let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [head, ...rest] = rows;
  return rest.filter((r) => r.length === head.length).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}

const slugify = (s) => s.toLowerCase().replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

const rows = parseCsv(readFileSync(src, 'utf8'));
let written = 0, skipped = 0;
for (const r of rows) {
  const date = (r.Date || '').slice(0, 10);
  let body = (r.ShareCommentary || '').replace(/"\n""\n"/g, '\n\n').replace(/"\n"/g, '\n\n').replace(/^"|"$/g, '').trim();
  if (!date || body.length < 400 || SKIP.has(date)) { skipped++; continue; }
  const paras = body.split(/\n\n+/)
    .filter((p) => !/^(#\S+\s*)+$/.test(p.trim()))      // rene hashtag-linjer droppes
    .map((p) => p.replace(/^#/, '\\#'));                 // ellers ville # bli overskrift
  let title = TITLES[date]; let titleBy = 'claude';
  if (!title && paras[0].length <= 60 && !/[.]$/.test(paras[0])) { title = paras[0].replace(/^"|"$/g, ''); paras.shift(); titleBy = 'kristian'; }
  if (!title) { title = paras[0].slice(0, 60).replace(/\s+\S*$/, '') + '…'; }
  const file = join(outDir, `${date}-${slugify(title)}.md`);
  if (existsSync(file)) { skipped++; continue; }
  const fm = [
    '---', `title: ${JSON.stringify(title)}`, `date: ${date}`,
    r.ShareLink ? `linkedin: ${JSON.stringify(r.ShareLink)}` : null,
    titleBy === 'claude' ? 'titleBy: claude' : null,
    r.SharedUrl ? `sharedUrl: ${JSON.stringify(r.SharedUrl)}` : null,
    '---', '',
  ].filter((l) => l !== null).join('\n');
  writeFileSync(file, fm + paras.join('\n\n') + '\n');
  written++;
}
console.log(`skrev ${written}, hoppet over ${skipped}`);
