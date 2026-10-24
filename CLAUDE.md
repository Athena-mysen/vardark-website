# Vardark

Kristian Høegh Mysens personlige side — vardark.no. Essayblogg (fra LinkedIn-innlegg) og en lab-liste over prototyper. Bygget om 2026-10-20 etter designbriefet i `athenatech-planlegging/utkast/nettsider-athenatech-vardark.md`. Vardark var aldri et selskap; selskapet er AthenaTech AS (athenatech.no, eget repo `athenatech-site`).

## Stack
- **Astro 7** med content collections (`src/content/essays/*.md`, skjema i `src/content.config.ts`); Node >=22.12
- **Vanlig CSS** med tokens i `src/layouts/Layout.astro` `:root` (lys) og `@media (prefers-color-scheme: dark)` (mørk)
- **Selvhostede fonter** via fontsource: Source Serif 4 (brødtekst 19 px), JetBrains Mono (metadata), Fjalla One (bare logotypen). CSP tillater ikke eksterne fonter.
- **RSS** på `/rss.xml` (`@astrojs/rss`), sitemap via `@astrojs/sitemap`
- **Deploy:** Cloudflare Pages via GitHub Actions. `main` → produksjon (vardark.no). Grenen `blogg` → forhåndsvisning (`--branch=blogg`, URL `blogg.vardark-website.pages.dev`).

## Kommandoer
- `npm run dev` / `npm run build` / `npm run preview`
- `node scripts/linkedin-to-md.mjs <Shares.csv>` — konverterer LinkedIn-eksporten til essays. Overskriver aldri eksisterende filer; innlegg under 400 tegn og rene hashtag-linjer droppes. Titler for innlegg uten tittellinje står i `TITLES` i scriptet og i `titleBy: claude` i frontmatter; Kristian kan endre fritt i fila.

## Struktur
```
src/
├── components/   # Masthead (logo + 3 lenker + RSS), Footer, Cairn (merket)
├── content/essays/  # ett markdown-essay per innlegg, YYYY-MM-DD-slug.md
├── layouts/      # Layout.astro
└── pages/        # index (krønike), essays/[id], lab, om, rss.xml.ts
```

## Designsystem (norrøn undertone: struktur og materiale, aldri ornament)
- **Kaldt mørke, ett varmt lys.** Lys modus: `--bg #f6f6f3`, `--text #0f1c2e`, `--muted #4b5565`, `--line #d5d7d2`, `--ember #b8651c`. Mørk: `--bg #0b1220`, `--text #e6e3dc`, `--muted #9aa3b2`, `--line #22304a`, `--ember #f0a24b`.
- **Ravgul (`--ember`) brukes bare til understreker, merkets lys og fokus.** Aldri som liten tekst på lys bakgrunn (for lav kontrast).
- **Lest først:** ingen hero, ingen kort, ingen sidekolonne, ingen «les også». Maks linjelengde 68 tegn, innholdsbredde 46 rem.
- **Krøniken:** år som mono-delskiller, dato i mono, tittel i serif. Det er saga-strukturen; ingen runer, ravner, hammere eller knutemønster.
- **Merke:** varden (`Cairn.astro`, `public/favicon.svg`): tre steiner og ett lys over én horisont.
- **Forbudt:** stock-foto, gradienter, sporing, kommentarfelt, karuseller.

## Konvensjoner
- Norsk bokmål, `lang="nb"`. Essayene gjengis ordrett slik Kristian skrev dem; rett aldri innhold uten beskjed.
- Nye essays: skriv markdown her først, post utdrag med lenke på LinkedIn etterpå. `linkedin:` i frontmatter peker på originalen.
- Commit-meldinger på engelsk, korte.

## Domener
- vardark.no → Cloudflare Pages-prosjekt `vardark-website` (denne siden)
- singularity.vardark.no, council.vardark.no, geopolitics.vardark.no → egne repo/tjenester, listet på /lab
- presentasjoner.vardark.no → flyttes til presentasjoner.athenatech.no (pakke 4 i briefet); gammel adresse skal videresende

## Før push
1. `npm run build` — ingen feil
2. Skjermbilder 390 px og 1280 px, lys og mørk, av endrede sider; se på dem
3. `/rss.xml` validerer

## Learnings
Les `LEARNINGS.md`; oppdater etter hver økt.

## Publisering fra LinkedIn (fra 2026-10-25)
- Hvert nytt LinkedIn-innlegg Kristian publiserer, blir et innlegg her på norsk og engelsk. Athena eier rutinen (skill `vardark-blogg` i Athenas workspace).
- `node scripts/publiser-innlegg.mjs <kvittering.json>` lager `src/content/essays/<id>.md`, `src/content/essays-en/<id>.md` og bilder i `public/innlegg/<id>/`. Kvitteringsformatet står øverst i skriptet. Samme LinkedIn-URL to ganger gjør ingenting.
- Deretter `npm run build`, commit og push til `main` (deploy skjer automatisk). Ingen `linkedin-to-md.mjs` for nye innlegg; den var for engangsimporten.

## Roboter og kommentarer (fra 2026-10-25)
- Roboter og KI-agenter er velkomne (Kristian: «Vi ønsker dem inn!»). `public/robots.txt` hilser og ber pent om sitering; `/llms.txt` og `/llms-full.txt` (src/lib/llms.ts) er lesebrevet. Cloudflare: Bot Fight Mode og KI-blokkering er av, og Cloudflare styrer ikke robots.txt.
- Kommentarer: `functions/api/kommentarer.ts` (Pages Function) + D1 `vardark-kommentarer` (binding `DB`). POST lagres som `pending`; bare `approved` vises. Nøkkelen er alltid den norske adressen (`/kommentar-nokler.json`), så nb og en deler kommentarer. Klienten er `public/scripts/kommentarer.js`. Athena modererer daglig (skill `vardark-blogg`, punkt 6).
- Lokal test: kopier `dist` og `functions` til en tom mappe med en midlertidig `wrangler.toml` (D1-binding, compatibility_date ≤ wranglers støtte) og kjør `npx wrangler@4.112.0 pages dev`. Ikke commit `wrangler.toml`; bindingene ligger i Pages-prosjektet.
