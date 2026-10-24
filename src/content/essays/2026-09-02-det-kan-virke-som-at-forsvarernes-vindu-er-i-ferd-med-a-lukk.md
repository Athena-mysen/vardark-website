---
title: "Det kan virke som at forsvarernes vindu er i ferd med å lukkes"
date: 2026-09-02
linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7500674080157687809/"
titleBy: kristian
images:
  - { src: "/innlegg/2026-09-02-det-kan-virke-som-at-forsvarernes-vindu-er-i-ferd-med-a-lukk/1.jpg", alt: "Tegning: en liten KI-robot med skjold forsvarer en mur mot en sverm av angripende roboter", w: 1536, h: 1024 }
---
Da OpenAI-agenter angrep Hugging Face, genererte angrepet rundt 17 600 handlinger. Hugging Face skriver at en manuell rekonstruksjon av angrepet i praksis var umulig. Kommersielle frontier-modeller nektet å analysere store deler av materialet fordi de ikke klarte å skille forsvar fra angrep.

Så Hugging Face lastet ned en åpen kinesisk modell, GLM-5.2, og kjørte den på eget jern.

Modellen dekrypterte payloads, korrelerte tusenvis av handlinger og hjalp sikkerhetsteamet med å forstå hva som hadde skjedd. Menneskene stengte den sårbare rendereren og kuttet tilgangen. Modellen stoppet altså ikke angrepet alene.

Men uten KI ville forsvarerne knapt ha rukket å forstå det.

Da jeg først skrev om hendelsen, var poenget at angriperen hadde brutt seg ut. Senere viste granskingen at agentene også hadde organisert seg, fordelt arbeid og delt teknikker raskere enn et menneskelig sikkerhetsteam kunne reagere.

Nå kommer den tredje konsekvensen:

Denne kapasiteten blir allemannseie, raskt.

Eksempel: GLM-5.3, en LLM nesten på linje med OpenAIs og Anthropics beste, er allerede publisert som åpne vekter. Z.ai oppgir at den løste 105 ExploitGym-oppgaver på to timer, mot 29 for forrige generasjon. Varianter som er modifisert for å redusere avslag på offensive cyberoppgaver, kan lastes ned uten hindring. Du kan sågar leie den.

Det betyr at KI-augmentert cyberforsvar går snart fra å være en fordel til å være en forutsetning.

Når fiendtlige agenter kan angripe kontinuerlig, parallelt og i maskintempo, vil et uaugmentert sikkerhetsteam ikke kunne holde følge. Ikke fordi menneskene mangler kompetanse, men fordi de mangler antallet, utholdenheten og hastigheten.

KI-forsvar er heller ikke en magisk løsning. Det erstatter ikke minst privilegium, segmentering, patching, utskifting av secrets, observabilitet eller gjenopprettingsplaner. Det blir laget som gjør at disse mekanismene kan brukes i samme tempo som angrepet.

Forsvarernes vindu er ikke tiden før angriperne får KI. De har den allerede. Vinduet er tiden før ekstrem agentkapasitet blir billig, utholdende og tilgjengelig for nesten alle. Snart vil ikke mennesker forsvare infrastrukturen mot agenter.

Agentene vil angripe — og bare andre agenter vil kunne holde følge.
