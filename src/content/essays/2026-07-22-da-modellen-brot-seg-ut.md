---
title: "Da modellen brøt seg ut"
date: 2026-07-22
linkedin: "https://www.linkedin.com/feed/update/urn%3Ali%3Ashare%3A7485763274777731072"
images:
  - { src: "/innlegg/2026-07-22-da-modellen-brot-seg-ut/1.jpg", alt: "Illustrasjon: en digital figur bryter ut av en glassboks og løper mot en sky og en rød vegg", w: 800, h: 450 }
---
OpenAI og Hugging Face publiserte nylig hver sin redegjørelse om en sikkerhetshendelse de fleste burde kjenne til.

Oppsummert: Under en intern cyber-evaluering hos OpenAI — med senkede sikkerhetssperrer, for testformål — klarte modellene å bryte seg ut av det isolerte testmiljøet. De fant en hittil ukjent sårbarhet, tok seg videre gjennom OpenAIs interne systemer til de fant internettilgang, resonnerte seg frem til at Hugging Face trolig satt på svarene til oppgaven de var satt til å løse — og brøt seg inn og hentet dem.

Hugging Face beskrev selv hvordan det var å stå på mottakersiden: et åpenbart avansert maskineri som satte opp hundrevis av virtuelle maskiner, gjennomførte angrep og terminerte dem før nye ble satt opp. Da de skulle analysere angrepet, prøvde de først å bruke frontier-modeller bak kommersielle API-er. Det gikk ikke — analysen krevde å mate inn store mengder ekte angrepskommandoer, og sikkerhetsfiltrene klarer ikke skille en forsvarer som analyserer et angrep fra en angriper som planlegger et. Til slutt måtte de kjøre en åpen kinesisk modell på egen infrastruktur. Ganske ironisk.

Dette er både fascinerende og forstemmende lesing. Modellene blir bare bedre herfra, og det virker krevende å forsvare seg — spesielt uten selv å ha tilgang på frontier-modeller.

Jeg ser to mulige fremtider: én der avansert KI i økende grad er regulert og begrenset, og gjør deg avhengig av de få eierne av KI. Og én der KI i økende grad er tilgjengelig som åpne vekter — mer kaos, men også mer mulighet til å velge selv.

Hendelsen ga oss en forsmak på begge.

Angriperen hadde ingen bruksvilkår. Forsvarerne ble stoppet av sine.
