import { getCollection } from 'astro:content';

// Essays nyest først, med lesetid og første setninger som utdrag (til forsideretningene).
export async function essays() {
  const all = await getCollection('essays');
  return all
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((e) => {
      const text = (e.body ?? '').replace(/[#*_>\[\]]/g, '').replace(/\(http[^)]*\)/g, '').replace(/\s+/g, ' ').trim();
      const cut = text.slice(0, 190);
      return {
        id: e.id,
        title: e.data.title,
        date: e.data.date,
        words: text.split(' ').length,
        minutes: Math.max(1, Math.round(text.split(' ').length / 220)),
        excerpt: text.length > 190 ? cut.slice(0, cut.lastIndexOf(' ')) + ' …' : text,
      };
    });
}

export const fmtDate = (d: Date) => d.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' }).replace('.', '');
export const iso = (d: Date) => d.toISOString().slice(0, 10);
