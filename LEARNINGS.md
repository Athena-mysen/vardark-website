# Learnings — vardark-website

Oppdateres etter hver kodeøkt. Leses ved oppstart.

## 2026-10-20 (ombygging til blogg)
- **LinkedIn-eksportens tekstformat:** avsnitt i `ShareCommentary` er kodet som `"\n""\n"` (tomt avsnitt) og `"\n"` (linjeskift). Begge byttes til `\n\n`. Linjer som bare er hashtags må droppes, og avsnitt som begynner med `#` må escapes, ellers blir de markdown-overskrifter.
- **zsh og `[id].astro`:** `cat > src/pages/essays/[id].astro` feiler i zsh med «no matches found». Sett filnavnet i anførselstegn.
- **Fontsource-filnavn:** Source Serif 4 har `opsz.css`, JetBrains Mono `wght.css`, Fjalla One (ikke-variabel) `latin.css`.
- **Grenforhåndsvisning på Pages:** `wrangler pages deploy --branch=<gren>` på et annet navn enn produksjonsgrenen gir en forhåndsvisning uten å røre vardark.no. Workflowen kjører nå for `main` og `blogg`.
- **Playwright på Mac:** bruk `executable_path` til Google Chrome; Python-Playwright mangler riktig Chromium.

## Eldre (fra selskapssiden, fortsatt gyldig)
- Alltid `npm run build` før push.
- For `script-src 'self'` uten `unsafe-inline`: legg JavaScript i `public/scripts/` og last med `<script is:inline src>`. (Bloggen har per nå ingen JavaScript.)
- Hold `engines`, GitHub Actions og lokal CI på samme Node-minimum; `npm audit --omit=dev --audit-level=high` er deploy-gate.
- Sett `wranglerVersion` eksplisitt i `cloudflare/wrangler-action`.
