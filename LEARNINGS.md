# Learnings — vardark-website

Automatisk oppdatert etter kodeøkter. Leses ved oppstart av ny økt.

## 2026-03-25
- **Hamburger-meny:** `.nav__mobile` MÅ være `position: fixed; top: 68px` — ikke i header-flowet. Ellers vokser headeren og tar 1/3 av skjermen ved scroll på mobil.
- **External lenker i nav:** Bruk `target="_blank"` + `rel="noopener noreferrer"` for lenker utenfor vardark.no.
- **Alltid `npm run build` før push** — Cloudflare Pages bygger uansett, men feil lokalt = raskere feedback.
- **node_modules mangler etter kloning** — husk `npm install` først.
- **Astro nav-array med external flag:** Legg til `external: true` i navLinks-arrayet, bruk conditional attributes i template.
