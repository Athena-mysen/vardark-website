// Tekster og adresser for de to språkene. Norsk på /, engelsk på /en/.
export type Lang = 'nb' | 'en';
export const other = (l: Lang): Lang => (l === 'nb' ? 'en' : 'nb');

export const paths = {
  nb: { home: '/', lab: '/lab/', about: '/om/', rss: '/rss.xml', essay: (id: string) => `/essays/${id}/` },
  en: { home: '/en/', lab: '/en/lab/', about: '/en/about/', rss: '/en/rss.xml', essay: (id: string) => `/en/essays/${id}/` },
};

export const t = {
  nb: {
    locale: 'nb-NO', og: 'nb_NO', name: 'Norsk', short: 'NO',
    nav: { essays: 'Essays', lab: 'Lab', about: 'Om' },
    skip: 'Til innholdet', home: 'Vardark, til forsiden', mainNav: 'Hovednavigasjon',
    tagline: 'Varsellys for en tid der intelligens blir billig.',
    description: 'Essays av Kristian Høegh Mysen om frontier-modeller, åpne vekter, KI-sikkerhet og geopolitikk, og en lab med prototyper.',
    latest: 'Sist tent', read: 'Les essayet', essays: 'Essays', lab: 'Lab',
    linkedin: 'Først publisert på', all: 'Alle essays', prev: 'Eldre', next: 'Nyere',
    company: 'Selskapet', switchTo: 'Read in English',
  },
  en: {
    locale: 'en-GB', og: 'en_GB', name: 'English', short: 'EN',
    nav: { essays: 'Essays', lab: 'Lab', about: 'About' },
    skip: 'Skip to content', home: 'Vardark, home', mainNav: 'Main navigation',
    tagline: 'Beacons for an age of cheap intelligence.',
    description: 'Essays by Kristian Høegh Mysen on frontier AI models, open weights, AI security and geopolitics, plus a lab of prototypes.',
    latest: 'Latest', read: 'Read the essay', essays: 'Essays', lab: 'Lab',
    linkedin: 'First published in Norwegian on', all: 'All essays', prev: 'Older', next: 'Newer',
    company: 'Company', switchTo: 'Les på norsk',
  },
};

export const fmtDate = (d: Date, l: Lang, o: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }) =>
  d.toLocaleDateString(t[l].locale, o).replace('.', '');
export const iso = (d: Date) => d.toISOString().slice(0, 10);
