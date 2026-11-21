---
title: "Hvem fikser det når KI-en ikke kan?"
date: 2026-11-20
linkedin: "https://www.linkedin.com/feed/update/urn:li:share:7529479596346449921/"
titleBy: kristian
images:
  - { src: "/innlegg/2026-11-20-hvem-fikser-det-nar-ki-en-ikke-kan/1.jpg", alt: "Mørk infografikk om flystansen i USA 13. november 2026, med tall for varighet, berørte flytrafikksentre og fly i luften samt en tekst om fungerende radarer og flygeledernes manuelle arbeid.", w: 1080, h: 1350 }
---
Fredag 13. november sto alle fly i USA på bakken i over fire timer. Nettverket til luftfartsmyndigheten FAA ble oversvømt av data, trolig fra en nyinstallert ruter, og 17 av 22 flytrafikksentre fikk ustabil radar og kommunikasjon. Dagen før gikk Microsofts e-post, Teams og Copilot ned i over et døgn. En feil fra juli, mer trafikk og mindre kapasitet slo til samtidig, og den automatiske tilbakerullingen kunne ikke redde det.

Ingen av delene skyldtes KI. Men se hva som reddet flytrafikken: Noen radiofrekvenser og radarer virket fortsatt, og flygeledere som kunne jobbe uten det vanlige systemet, fikk alle fly trygt ned.

Jeg er full on KI. Agentene mine skriver mer kode enn jeg noen gang kommer til å lese. Men for kritisk infrastruktur, og i ytterste konsekvens atomvåpen, må vi være sikre på at mennesker kan forstå, feilsøke og drifte systemet når KI-en faller bort.

Vi mistet oversikten lenge før KI. Ingen eller svært få forstår hele Linux-kjernen eller bankenes gamle COBOL. Det som redder oss, er at noen forstår sin del, at vi kan rulle tilbake og at det finnes en manuell reserve.

KI endrer fire ting:
- Koden vokser raskere enn noen rekker å lese
- Kompetansen forvitrer. Jo bedre automasjonen er, jo dårligere blir mennesket når den svikter
- Feilene henger sammen. Like modeller gir like blindsoner i mange systemer samtidig
- KI-en som lagde feilen, har ofte samme blindsone når den skal finne den

Det farligste er mennesket som bare er pynt: formelt i loopen, men godkjenner det systemet foreslår. Stanislav Petrov stolte ikke på varslingssystemet i 1983, og han hadde rett. Den skepsisen forsvinner når systemet har hatt rett ti tusen ganger.

Da hackere tok styringen av strømnettet i Ukraina i 2015, var det montører som kjørte ut og koblet manuelt, som fikk strømmen tilbake. Norske kraftselskaper skal ha planer for å styre anleggene manuelt hvis styringssystemet svikter. Den tenkningen må gjelde KI også.

Mitt forslag for kritiske systemer:
1. Mennesker eier spesifikasjonen, ikke nødvendigvis koden
2. Systemet kan gjenopprettes uten KI: kjent fungerende versjon, reservemodus og en testet manuell prosedyre. Som å kunne navigere med kart når GPS-en faller ut.
3. Øv som i luftfarten: Løs hendelser uten KI-hjelp med jevne mellomrom
4. En grense for kompleksitet: Kritisk kode ingen kan forstå, er ikke greit
5. Strengere krav jo verre det kan gå, jo vanskeligere skaden er å reversere og jo raskere den må fikses

KI gjerne til analyse og varsling. Men beslutningen, reserven og forståelsen må være menneskelig, og øvd på.

Spørsmålet jeg ikke helt liker svaret på: Hvor mye av mitt eget KI-bygde oppsett kunne jeg reparert selv? Jeg har valgt fart og funksjonalitet foran oversikt. Det kan jeg gjøre fordi risikoen og konsekvensen er lav.

Og hvor går grensen? Sykehus, betalingssystemer, vannverk?

#KI #Beredskap #KritiskInfrastruktur #Cybersikkerhet
