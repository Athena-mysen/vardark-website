// Lab-prosjektene, brukt av /lab/ og forsiden (begge språk).
export type Project = {
  name: string; live: boolean; href?: string;
  img?: string; // skjermbilde under public/lab/ (1280 bred); Athena har ingen flate, bare varden
  nb: { what: string; status: string; story: string };
  en: { what: string; status: string; story: string };
};
export const projects: Project[] = [
  { name: 'Lomma', live: true, href: 'https://lomma.vardark.no', img: '/lab/lomma.webp',
    nb: { what: 'Flomvakt for Lomma i 3D: målt vannføring, prognose med sannsynligheter og hvor vannet når i Lommedalen. Oppdateres hvert kvarter.', status: 'i drift',
      story: 'Bygget på én kveld, 25. oktober 2026, mens Lomma gikk over sine bredder. NVE-målingen, MET sitt værensemble og Kartverkets terreng møtes i nettleseren, så naboene kan se hvor vannet kommer før det kommer.' },
    en: { what: 'A 3D flood watch for the river Lomma: measured flow, a probabilistic forecast and where the water reaches in Lommedalen. Updated every 15 minutes.', status: 'live',
      story: 'Built in one evening, 25 October 2026, while the Lomma burst its banks. The NVE gauge, MET’s weather ensemble and the national terrain model meet in the browser, so neighbours can see where the water will go before it gets there.' } },
  { name: 'Singularity Tracker', live: true, href: 'https://singularity.vardark.no/tracker', img: '/lab/singularity.webp',
    nb: { what: 'Et observatorium for tempoet i KI-utviklingen: modeller, benchmarks og hendelser på én tidslinje.', status: 'i drift',
      story: 'Regnekraft, energi, agenter og brikkeforsyning som målte kurver med kilder og usikkerhet, ikke som meninger. Et sted å sjekke om det faktisk går så fort som det føles.' },
    en: { what: 'An observatory for the pace of AI: models, benchmarks and events on one timeline.', status: 'live',
      story: 'Compute, energy, agents and chip supply as measured curves with sources and uncertainty, not as opinions. A place to check whether it really is moving as fast as it feels.' } },
  { name: 'Council', live: false, href: 'https://council.vardark.no', img: '/lab/council.webp',
    nb: { what: 'Et råd av KI-avatarer med egne personligheter og langtidsminne, ledet av et menneske. Selvhostet.', status: 'prototype',
      story: 'Flere modeller med hver sin rolle rundt samme bord, og et menneske i enden som bestemmer. Selvhostet, så både rådet og minnet er mitt eget.' },
    en: { what: 'A council of AI avatars with their own personalities and long-term memory, chaired by a human. Self-hosted.', status: 'prototype',
      story: 'Several models, each with a role, around the same table, and a human at the head who decides. Self-hosted, so both the council and its memory are my own.' } },
  { name: 'Geopolitikk', live: false, href: 'https://geopolitics.vardark.no', img: '/lab/geopolitics.webp',
    nb: { what: 'Radar over geopolitiske hendelser med betydning for teknologi og sikkerhet.', status: 'eksperiment',
      story: 'Daglige tall fra en konflikt, samlet fra åpne kilder mens den pågikk. Et eksperiment i å følge en hendelse med tall i stedet for overskrifter, med kildene bevart.' },
    en: { what: 'A radar for geopolitical events that matter for technology and security.', status: 'experiment',
      story: 'Daily figures from a conflict, gathered from open sources while it ran. An experiment in following an event with numbers rather than headlines, sources preserved.' } },
  { name: 'Athena', live: true,
    nb: { what: 'Min egen agentplattform med lokale og åpne modeller. Den driver hjemmet vårt og er grunnlaget for det meste her.', status: 'i drift',
      story: 'Ingen nettside, bare et nærvær: hun leser kalenderen, svarer familien, holder vakt over jobbene om natten og publiserer det som står på denne siden. Alt det andre i laben er bygget med henne.' },
    en: { what: 'My own agent platform on local and open models. It runs our home and underpins most of what is here.', status: 'live',
      story: 'No website, just a presence: she reads the calendar, answers the family, keeps watch over the night jobs and publishes what is on this site. Everything else in the lab was built with her.' } },
];
