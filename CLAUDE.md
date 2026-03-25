# Vardark Website

Nettside for Vardark Technologies AS — vardark.no

## Stack
- **Astro 5** (statisk site, `astro build` → `dist/`)
- **Vanilla CSS** med CSS custom properties (se Layout.astro `:root`)
- **TypeScript** config, men komponentene er ren Astro + HTML/CSS
- **Deploy:** Cloudflare Pages via GitHub Actions (`.github/workflows/deploy.yml`)

## Kommandoer
- `npm run dev` — lokal dev server (port 4321)
- `npm run build` — produksjonsbygg
- `npm run preview` — forhåndsvis bygget

## Struktur
```
src/
├── components/   # Nav, Hero, Services, About, Contact, Footer
├── layouts/      # Layout.astro (global CSS variabler + reset)
└── pages/        # index.astro (eneste side)
```

## Design system
- **Fonts:** Space Grotesk (headings), Inter (body)
- **Farger:** Mørkt tema. `--accent: #38bdf8`, `--bg-primary: #070c14`
- **Breakpoint:** 768px (mobil → desktop)
- **Container:** max-width 1140px, padding 1.5rem (mobil) / 2rem (desktop)

## Konvensjoner
- Norsk UI-tekst (`lang="nb"`)
- BEM-lignende CSS i `<style>` scoped per komponent
- Semantisk HTML, ARIA-labels på interaktive elementer
- Mobil først — test alltid responsivt
- Commit-meldinger på engelsk, korte og beskrivende

## Learnings
Les `LEARNINGS.md` — akkumulerte feil og lærdommer fra tidligere økter. Oppdater den etter hver kodeøkt med det du lærte.

## Før push
1. `npm run build` — ingen feil?
2. Test mobil viewport (360px) og desktop
3. Sjekk at Nav fungerer på mobil (hamburger-meny er `position: fixed`)

## Domener
- vardark.no → Cloudflare Pages (denne siden)
- geopolitics.vardark.no → eget repo (geopolitics-vardark)
