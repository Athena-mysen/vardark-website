// Lab-prosjektene, brukt av /lab/ og forsiden (begge språk).
export const projects: { name: string; live: boolean; href?: string; nb: { what: string; status: string }; en: { what: string; status: string } }[] = [
  { name: 'Singularity Tracker', live: true, href: 'https://singularity.vardark.no/tracker',
    nb: { what: 'Et observatorium for tempoet i KI-utviklingen: modeller, benchmarks og hendelser på én tidslinje.', status: 'i drift' },
    en: { what: 'An observatory for the pace of AI: models, benchmarks and events on one timeline.', status: 'live' } },
  { name: 'Council', live: false, href: 'https://council.vardark.no',
    nb: { what: 'Et råd av KI-avatarer med egne personligheter og langtidsminne, ledet av et menneske. Selvhostet.', status: 'prototype' },
    en: { what: 'A council of AI avatars with their own personalities and long-term memory, chaired by a human. Self-hosted.', status: 'prototype' } },
  { name: 'Geopolitikk', live: false, href: 'https://geopolitics.vardark.no',
    nb: { what: 'Radar over geopolitiske hendelser med betydning for teknologi og sikkerhet.', status: 'eksperiment' },
    en: { what: 'A radar for geopolitical events that matter for technology and security.', status: 'experiment' } },
  { name: 'Athena', live: true,
    nb: { what: 'Min egen agentplattform med lokale og åpne modeller. Den driver hjemmet vårt og er grunnlaget for det meste her.', status: 'i drift' },
    en: { what: 'My own agent platform on local and open models. It runs our home and underpins most of what is here.', status: 'live' } },
];
