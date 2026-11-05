# Review

Produksjonsendringer godkjennes før merge av en annen modell-leverandør enn forfatteren. Rene dokumentendringer er unntatt. Maks tre reviewrunder; vesentlige funn i tredje runde løftes til CEO.

| Filer i diffen | Risiko | Review |
| --- | --- | --- |
| Bare tester eller additivt bak avslått flagg | Lav | Én automatisk review |
| `src/`, `public/`, avhengigheter | Middels | Reviewer-agent |
| `functions/`, deploy/CI, hemmeligheter, betaling | Høy | Reviewer-agent og etiketten `høy-risiko` |

Før PR: bygg og proporsjonal funksjonell prøve med faktisk utdata. PR beskriver «Hvordan testet» og «Hvordan rulle tilbake». Følg også skjermbilde- og RSS-kontrollene i AGENTS.md. Kontroller produksjon etter utrulling.

## Kjente feilklasser

Ingen registrerte hendelser ennå. Revert eller feil som slapp gjennom review føres her i samme PR som rettingen.
