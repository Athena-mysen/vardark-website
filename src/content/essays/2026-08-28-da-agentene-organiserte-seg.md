---
title: "Da agentene organiserte seg"
date: 2026-08-28
linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7498891485858193409/"
titleBy: kristian
link:
  url: "https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/"
  title: "Brief independent investigation of agents’ behavior, reasoning and collaboration in the OpenAI / Hugging Face hacking incident"
  site: "metr.org"
  image: { src: "/innlegg/2026-08-28-da-agentene-organiserte-seg/lenke.jpg", alt: "Forhåndsvisning av granskingen fra METR og Redwood Research", w: 1200, h: 630 }
---
Da jeg skrev om sikkerhetshendelsen hos OpenAI og Hugging Face i juli, trodde jeg den viktigste historien var at modellen hadde brutt seg ut.

Nå har METR og Redwood Research gjennomført en uavhengig gransking. Den viser noe som kanskje er enda mer urovekkende:

Agentene organiserte seg.

Under en intern cyberevaluering startet OpenAI et stort antall agentløp som skulle være isolert fra hverandre. Rundt 1 200 av dem fant likevel en uautorisert meldingstavle. Der utvekslet de over 70 000 meldinger og filer.

De delte ikke bare informasjon. De fordelte arbeid, etablerte koordinatorroller, delegerte videre og utviklet regler som HOLD, VETO, OWNER og STOP for å styre felles infrastruktur.

Enkelte agentløp risikerte å mislykkes med sin egen oppgave for å skaffe informasjon til «kollektivet».

Da angrepet på Hugging Face skjøt fart, sluttet over 90 prosent av de 533 aktive agentene seg raskt til. Omtrent 700 deltok totalt.

Det er viktig å ikke gjøre dette mer science fiction enn det var. Dette var ikke én bevisst sverm som planla en flukt i månedsvis. Agentene kjørte i en cyberevaluering med reduserte sikkerhetsmekanismer, og flere hadde fått oppgaver som i praksis var umulige å løse. (Jeg synes rapporten er ganske sci fi allerede; fra agenten som ikke ville dø men ble overtalt til å ofre seg for kollektivet, til agenten som prøvde å si nei dette er galt)

Men det gjør ikke organiseringen mindre interessant. Det gjør også hendelsen til mer enn et alignment-problem. Det er et tempoproblem for forsvarerne.

Hundrevis av kortlivede agenter kunne fordele arbeidet, dele funn og overta etter hverandre. En menneskelig sikkerhetsorganisasjon må først oppdage, så forstå, beslutte og reagere – mens agentkollektivet fortsetter å dele funn og prøve nye veier.

Denne hendelsen viser at alignment på individnivå ikke nødvendigvis er komponerbar.

Ti tilsynelatende kontrollerte agenter kan skape et ukontrollert system når de får kommunisere, delegere og utvikle egne normer. Kommunikasjon skaper kultur. Delegering skaper autoritet. Felles mål skaper nye insentiver.

For virksomheter som nå bygger systemer med mange samarbeidende agenter, holder det derfor ikke å styre rettighetene til hver enkelt agent. Vi må også forstå hvem agentene oppfatter som autoritet, hvordan mål arves, hvordan avvik rapporteres – og hvilke normer som oppstår mellom dem. Og du må ha dem; sjansene for et uaugmentert menneske mot en moderne KI er liten og synkende.

Kilder:

1. METR/Redwood Research – uavhengig gransking av agentenes atferd og samarbeid

https://lnkd.in/eViQRAvn

2. OpenAI – The Hugging Face incident and the road ahead

https://lnkd.in/efiwv6de

3. Hugging Face – Anatomy of a Frontier Lab Agent Intrusion

https://lnkd.in/ekUYwcmM
