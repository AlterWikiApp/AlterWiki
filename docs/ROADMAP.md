# Roadmap

**Status:** Lebendes Dokument – wird laufend angepasst
**Letzte Aktualisierung:** 2026-08-20

## Annahmen für die Zeitschätzungen

- **~5 Stunden/Woche**, regelmäßig (deine Angabe: "ein paar Stunden/Woche").
- Coding wird von KI-Agenten übernommen (Windsurf/Kimi), du übernimmst
  Review, Feature-/Visual-Design, ich übernehme Planung.
- Schätzungen sind **grobe Richtwerte, keine Zusagen** – bei
  KI-Agenten-gestützter Entwicklung schwankt der tatsächliche Aufwand
  stärker als bei erfahrenen menschlichen Entwicklern (mal sehr schnell,
  mal mehr Nacharbeit nötig). Nach jedem abgeschlossenen Meilenstein lohnt
  sich ein kurzer Realitätscheck: Schätzung noch plausibel oder anpassen?
- Tech-Stack: TypeScript + Vue 3 + Vite + Tailwind CSS + vite-plugin-pwa.

## Phase 0 — Projekt-Setup

| Aufgabe                                                                  | Aufwand |
| ------------------------------------------------------------------------ | ------- |
| Repo anlegen, Grundstruktur (siehe `PROJECT_STRUCTURE.md`)               | 1–2 h   |
| Vite + Vue 3 + TypeScript + Tailwind aufsetzen                           | 1–2 h   |
| Linting/Formatting-Grundkonfiguration                                    | 1 h     |
| `AGENTS.md`, `PRINCIPLES.md` etc. ins Repo, erste Agenten-Session testen | 1 h     |

**Zwischensumme: ca. 4–6 h (~1 Woche)**

#### Phase 1 — MVP

| Meilenstein                               | Beschreibung                                                                                                                                                                                                                                                                                                                                        | Aufwand |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 1. Wikipedia-API-Client                   | Anbindung Search/Suggest + Artikel-API, `User-Agent`-Header, einfaches Caching                                                                                                                                                                                                                                                                      | 4–6 h   |
| 2. Such-UI                                | Eingabefeld mit Live-Vorschlägen, Ergebnisliste                                                                                                                                                                                                                                                                                                     | 3–5 h   |
| 3. Artikelanzeige                         | Rendering von Text/Bildern/Infoboxen **inkl. Sanitizing-Integration** (sicherheitskritisch, siehe `PRINCIPLES.md`)                                                                                                                                                                                                                                  | 6–10 h  |
| 4. Interne Navigation                     | Wikilinks in-App klickbar, Vor-/Zurück-Verlauf                                                                                                                                                                                                                                                                                                      | 3–5 h   |
| 5. Sprachauswahl                          | Wechsel zwischen Wikipedia-Sprachversionen                                                                                                                                                                                                                                                                                                          | 2–3 h   |
| 6. PWA-Grundgerüst                        | Manifest, Service Worker via vite-plugin-pwa, installierbar                                                                                                                                                                                                                                                                                         | 3–5 h   |
| 7. Dark/Light-Theme                       | Umschalter, Tailwind Dark Mode, Einstellung persistiert lokal                                                                                                                                                                                                                                                                                       | 2–4 h   |
| 8. *(Should-have)* Link-Darstellungs-Demo | Anzeigeeinstellung für Link-Darstellung im Artikel: Farbe (freie Wahl + Presets), Unterstrichen an/aus, oder gar keine Linkdarstellung (Text bleibt klickbar) — frei kombinierbar, nicht persistiert, dient als kleine Vorschau auf die Customization-Kernidee der App. Siehe `PRINCIPLES.md` Abschnitt 5 (Nutzerfreiheit bei Darstellungsoptionen) | 3–4 h   |
| 9. *(Should-have)* Inhaltsverzeichnis     | Sprungmarken innerhalb langer Artikel                                                                                                                                                                                                                                                                                                               | 2–4 h   |
| 10. Testing & Politur                     | Bugfixing, Barrierefreiheits-Check (Lighthouse/axe), Feinschliff                                                                                                                                                                                                                                                                                    | 4–6 h   |

**Zwischensumme: ca. 30–50 h**

**→ Bei ~5 h/Woche: grob 6–10 Wochen, realistisch mit Puffer eher 2–3 Monate bis zum fertigen MVP.**

**Nach Abschluss Phase 1 werden Phasen 2–4 neu evaluiert und angepasst.**

## Phase 2 — Kuratierte Startseite & besseres Entdecken *(grober Ausblick)*

Wird detailliert geplant, sobald Phase 1 abgeschlossen ist. Grobe Themen:
kuratierte Startseite, bessere Portale-Einbindung, Discovery über
Fotos/Karten. Geschätzter Rahmen: **mehrere Wochen bis ~2 Monate**,
abhängig davon, wie viel aus Phase 1 wiederverwendet werden kann.

## Phase 3 — Personalisierung *(grober Ausblick)*

Custom Startseite, Lesezeichen (inkl. Klärung Login/Sync-Frage),
Sammlungen, intelligente Leselisten, Offline-Speicherung, Verlauf &
Statistiken. Vermutlich die aufwändigste Phase – wird in Teilschritte
zerlegt, sobald sie ansteht.

## Phase 4 — Bearbeiten *(PHASE FÄLLT WEG - FUNKTIONEN ZUM BEARBEITEN SIND AUS DER FEATURELIST GESTRICHEN)*

~~Login via Wikimedia-OAuth, Artikel-Bearbeitung/-Erstellung. Technisch und
regelkonform anspruchsvollste Phase (Wikipedia-Bearbeitungsregeln,
Konfliktbehandlung) — wird separat vertieft geplant.~~

## Nächste konkrete Schritte

1. ⏳ Meilensteine 8-9: Should-have Features (Linkanzeige, Inhaltsverzeichnis) bauen
2. MVP bugfixing und polish
