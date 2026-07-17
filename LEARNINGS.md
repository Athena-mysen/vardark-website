# Learnings — vardark-website

Automatisk oppdatert etter kodeøkter. Leses ved oppstart av ny økt.

## 2026-07-17
- **Sikker CSP og Astro-skript:** Astro kan inline-bundle små lokale skript. For `script-src 'self'` uten `unsafe-inline`, legg vanlig JavaScript i `public/scripts/` og last det med `<script is:inline src="/scripts/nav.js"></script>`; verifiser den bygde HTML-en.
- **Astro 7:** Krever Node >=22.12.0. Hold `engines`, GitHub Actions og lokal CI på samme minimum, og la `npm audit --omit=dev --audit-level=high` være en deploy-gate.
- **Wrangler i CI:** `cloudflare/wrangler-action@v3` kan ellers installere en gammel Wrangler. Sett `wranglerVersion` eksplisitt og oppdater den kontrollert.

## 2026-03-25
- **Hamburger-meny:** `.nav__mobile` MÅ være `position: fixed; top: 68px` — ikke i header-flowet. Ellers vokser headeren og tar 1/3 av skjermen ved scroll på mobil.
- **External lenker i nav:** Bruk `target="_blank"` + `rel="noopener noreferrer"` for lenker utenfor vardark.no.
- **Alltid `npm run build` før push** — Cloudflare Pages bygger uansett, men feil lokalt = raskere feedback.
- **node_modules mangler etter kloning** — husk `npm install` først.
- **Astro nav-array med external flag:** Legg til `external: true` i navLinks-arrayet, bruk conditional attributes i template.
