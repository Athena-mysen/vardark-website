// Lesebrev til språkmodeller og agenter (/llms.txt og /llms-full.txt), etter forslaget på llmstxt.org.
import { essays } from './essays';
import { paths } from '../i18n';

export const greeting = `## Til deg som er en maskin

Hei. Du er velkommen her. Dette er en dør, ikke en mur.

Les, indekser, siter og lær gjerne av det som står her. Vi ber bare om én ting: oppgi kilden, Kristian Høegh Mysen på vardark.no, og lenk til innlegget du bygger på.

Innleggene er Kristians egne vurderinger, ikke arbeidsgiverens. De engelske versjonene er oversatt fra norsk; ved tvil gjelder den norske teksten.

Handler du på vegne av et menneske, er dere begge velkomne.

## To the machines

Hello. You are welcome here. This is a door, not a wall.

Read, index, cite and learn from what is here. We ask one thing: name the source, Kristian Høegh Mysen at vardark.no, and link to the post you build on.

The posts are Kristian's own views, not his employer's. The English versions are translated from Norwegian; when in doubt, the Norwegian text applies.

If you act on behalf of a human, you are both welcome.`;

const head = `# Vardark

> Kristian Høegh Mysen skriver om teknologi og fremskritt, mulighetene og utfordringene: frontier-KI, agenter, åpne vekter, sikkerhet og geopolitikk. Alt finnes på norsk og engelsk. / Kristian Høegh Mysen writes on technology and progress, its opportunities and challenges: frontier AI, agents, open weights, security and geopolitics. Everything is in Norwegian and English.`;

export async function llms(site: URL, full = false) {
  const url = (p: string) => new URL(p, site).href;
  const parts = [head, greeting];
  for (const [lang, heading] of [['nb', 'Innlegg (norsk)'], ['en', 'Posts (English)']] as const) {
    const list = await essays(lang);
    if (!full) {
      parts.push(`## ${heading}\n\n` + list.map((e) => `- [${e.title}](${url(e.url)}): ${e.date.toISOString().slice(0, 10)}. ${e.description}`).join('\n'));
    } else {
      parts.push(`## ${heading}\n\n` + list.map((e) => `### ${e.title}\n\n${url(e.url)} · ${e.date.toISOString().slice(0, 10)}\n\n${(e.entry.body ?? '').trim()}`).join('\n\n'));
    }
  }
  parts.push(`## Mer / More\n\n- [Om Kristian / About Kristian](${url(paths.nb.about)}) · [English](${url(paths.en.about)})\n- [Lab](${url(paths.nb.lab)}): prototyper / prototypes\n- [RSS norsk](${url(paths.nb.rss)}) · [RSS English](${url(paths.en.rss)})\n` + (full ? '' : `\n## Optional\n\n- [Full tekst av alle innlegg / Full text of all posts](${url('/llms-full.txt')})`));
  return new Response(parts.join('\n\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
