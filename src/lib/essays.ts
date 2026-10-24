import { getCollection, type CollectionEntry } from 'astro:content';
import { paths, type Lang } from '../i18n';

const excerpt = (body = '') => {
  const text = body.replace(/https?:\/\/\S+/g, '').replace(/[#*_>\[\]]/g, '').replace(/\s+/g, ' ').trim();
  const cut = text.slice(0, 200);
  return text.length > 200 ? cut.slice(0, cut.lastIndexOf(' ')) + ' …' : text;
};

const meta = (body = '') => {
  const x = excerpt(body).replace(/ …$/, '');
  if (x.length <= 155) return x;
  const cut = x.slice(0, 152);
  return cut.slice(0, cut.lastIndexOf(' ')) + ' …';
};

// Essays på ett språk, nyest først, med adressen til samme essay på det andre språket.
export async function essays(lang: Lang) {
  const nb = await getCollection('essays');
  const en = await getCollection('essaysEn');
  const enByNb = new Map(en.map((e) => [e.data.nb, e]));
  const list = (lang === 'nb' ? nb : en) as (CollectionEntry<'essays'> | CollectionEntry<'essaysEn'>)[];
  return list
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((e) => {
      const nbId = 'nb' in e.data ? e.data.nb : e.id;
      const enEntry = enByNb.get(nbId);
      return {
        entry: e, id: e.id, title: e.data.title, date: e.data.date, linkedin: e.data.linkedin, images: e.data.images ?? [], link: e.data.link,
        excerpt: e.data.summary ?? excerpt(e.body),
        description: e.data.summary ?? meta(e.body),
        url: paths[lang].essay(e.id),
        alt: lang === 'nb' ? (enEntry ? paths.en.essay(enEntry.id) : undefined) : paths.nb.essay(nbId),
      };
    });
}
export type Essay = Awaited<ReturnType<typeof essays>>[number];
