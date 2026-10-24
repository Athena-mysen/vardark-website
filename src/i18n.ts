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
    tagline: 'Fra varden ser vi langt.',
    lede: 'Om teknologi og fremskritt: mulighetene, og utfordringene som følger med.',
    description: 'Essays av Kristian Høegh Mysen om teknologi og fremskritt, mulighetene og utfordringene: frontier-KI, åpne vekter, sikkerhet og geopolitikk.',
    latest: 'Sist tent', read: 'Les essayet', essays: 'Essays', lab: 'Lab',
    linkedin: 'Først publisert på', all: 'Alle essays', prev: 'Eldre', next: 'Nyere',
    company: 'Selskapet', switchTo: 'Read in English',
  },
  en: {
    locale: 'en-GB', og: 'en_GB', name: 'English', short: 'EN',
    nav: { essays: 'Essays', lab: 'Lab', about: 'About' },
    skip: 'Skip to content', home: 'Vardark, home', mainNav: 'Main navigation',
    tagline: 'From the beacon, we see far.',
    lede: 'On technology and progress: the opportunities, and the challenges that come with them.',
    description: 'Essays by Kristian Høegh Mysen on technology and progress, its opportunities and challenges: frontier AI, open weights, security and geopolitics.',
    latest: 'Latest', read: 'Read the essay', essays: 'Essays', lab: 'Lab',
    linkedin: 'First published in Norwegian on', all: 'All essays', prev: 'Older', next: 'Newer',
    company: 'Company', switchTo: 'Les på norsk',
  },
};

export const fmtDate = (d: Date, l: Lang, o: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }) =>
  d.toLocaleDateString(t[l].locale, o).replace('.', '');
export const iso = (d: Date) => d.toISOString().slice(0, 10);
