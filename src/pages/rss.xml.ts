import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const essays = (await getCollection('essays')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: 'Vardark',
    description: 'Essays av Kristian Høegh Mysen om frontier-modeller, åpne vekter, sikkerhet og geopolitikk.',
    site: context.site!,
    items: essays.map((e) => ({
      title: e.data.title,
      pubDate: e.data.date,
      link: `/essays/${e.id}/`,
      description: e.data.summary ?? e.body.slice(0, 300).replace(/\s+/g, ' '),
    })),
    customData: '<language>nb</language>',
  });
}
