# Learnings — vardark-website

Automatisk oppdatert etter kodeøkter. Leses ved oppstart av ny økt.

## 2026-08-10
- **Observatoriet fra hovedsiden:** Singularity Observatory har kanonisk adresse `singularity.vardark.no`. Lenken ligger i footernavigasjonen, som tåler flere produktlenker uten å presse den allerede fulle toppnavigasjonen.
- **DNS for Observatory:** Sites-hostnavnet krever en DNS-only CNAME til `custom-domains.chatgpt.site` og de to verifikasjonspostene Sites oppgir. Den manuelle GitHub-workflowen gjør oppsettet idempotent med repoets eksisterende Cloudflare-token.

## 2026-07-30
- **Toppnavigasjon med Council:** Seks navigasjonslenker og CTA får ikke plass ved det gamle 768 px-breakpointet. Bruk mobilmenyen til 1023 px og full toppnavigasjon fra 1024 px; verifisert visuelt ved begge bredder.

## 2026-07-28
- **Plassering av produktlenker:** Hovednavigasjonen er allerede tett ved 768 px, mens footernavigasjonen har `flex-wrap`. Små produkt-snarveier kan derfor legges diskret i `Footer.astro` uten å presse headeren eller endre mobilmenyen.
- ✅ **Mønster — Sharp/SVGO-sikkerhetsoppdateringer:** Når transitive bildeavhengigheter oppdateres for å klarere audit-gaten, sammenlign hele `dist/` og bildehashene mot en før-build, og kjør en faktisk Sharp-transformasjon før push. En grønn Astro-build alene beviser ikke at native bildekode fungerer.

## 2026-07-17
- **Sikker CSP og Astro-skript:** Astro kan inline-bundle små lokale skript. For `script-src 'self'` uten `unsafe-inline`, legg vanlig JavaScript i `public/scripts/` og last det med `<script is:inline src="/scripts/nav.js"></script>`; verifiser den bygde HTML-en.
- **Astro 7:** Krever Node >=22.12.0. Hold `engines`, GitHub Actions og lokal CI på samme minimum, og la `npm audit --omit=dev --audit-level=high` være en deploy-gate.
- **Wrangler i CI:** `cloudflare/wrangler-action@v3` kan ellers installere en gammel Wrangler. Sett `wranglerVersion` eksplisitt og oppdater den kontrollert.
- **Interne Vardark-lenker:** Presentasjonsrommet er et eget subdomene, men en del av samme brukerreise. La det åpne i samme fane fra hovednavigasjonen, slik at nettleserens passorddialog kommer med én gang.

## 2026-03-25
- **Hamburger-meny:** `.nav__mobile` MÅ være `position: fixed; top: 68px` — ikke i header-flowet. Ellers vokser headeren og tar 1/3 av skjermen ved scroll på mobil.
- **External lenker i nav:** Bruk `target="_blank"` + `rel="noopener noreferrer"` for lenker utenfor vardark.no.
- **Alltid `npm run build` før push** — Cloudflare Pages bygger uansett, men feil lokalt = raskere feedback.
- **node_modules mangler etter kloning** — husk `npm install` først.
- **Astro nav-array med external flag:** Legg til `external: true` i navLinks-arrayet, bruk conditional attributes i template.
