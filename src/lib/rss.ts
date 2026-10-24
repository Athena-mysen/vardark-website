import rss from '@astrojs/rss';
import { essays } from './essays';
import { t, type Lang } from '../i18n';

export async function feed(lang: Lang, site: URL) {
  const list = await essays(lang);
  return rss({
    title: lang === 'nb' ? 'Vardark' : 'Vardark (English)',
    description: t[lang].description,
    site,
    items: list.map((e) => ({ title: e.title, pubDate: e.date, link: e.url, description: e.excerpt })),
    customData: `<language>${lang === 'nb' ? 'nb' : 'en'}</language>`,
  });
}
