# Projektstruktur

**Status:** Vorschlag für die Repo-Struktur ab MVP-Start
**Letzte Aktualisierung:** 2026-08-20

## Grundprinzip

Die Struktur soll von Anfang an so aufgebaut sein, dass sie mit dem
Projekt mitwächst (siehe `docs/ROADMAP.md`), ohne dass spätere Phasen
größere Umbauten erzwingen.

```
/
├── README.md                  # Projektüberblick, Setup-Anleitung
├── PRINCIPLES.md               # Verbindliche Grundsätze
├── AGENTS.md                   # Regeln für KI-Coding-Agenten
├── LICENSE                     # AGPLv3/GPLv3
│
├── docs/
│   ├── ROADMAP.md               # Phasenplan (MVP → Phase 2 → 3 → 4)
│   ├── DECISIONS.md             # Kurze Architekturentscheidungs-Log
│   ├── PROGRESS.md              # Laufender Fortschritts-/Session-Log
│   ├── IDEAS.md                 # Ideen für Features 
│   └── features/
│       ├── reader.md            # Spec: Suche, Lesen, Navigation (MVP)
│       ├── startpage.md         # Spec: Custom Startseite (Phase 2/3)
│       ├── collections.md       # Spec: Sammlungen/Leselisten (Phase 3)
│       └── ~~editing.md~~       # !! Editing Funktionen gestrichen !!
│
├── src/
│   ├── api/                     # Wikimedia-API-Anbindung (zentral, inkl.
│   │                             #   User-Agent-Header, Caching-Logik)
│   ├── components/               # UI-Komponenten
│   ├── pages/                    # Ansichten/Routen
│   ├── state/                    # Lokaler State (Lesezeichen, Settings)
│   ├── security/                 # Sanitizing-Wrapper (zentral, nicht
│   │                             #   pro Komponente einzeln)
│   └── styles/                   # Themes (inkl. Dark/Light)
│
├── public/
│   ├── manifest.json             # PWA-Manifest
│   └── service-worker.js         # Offline-Shell
│
└── tests/
    └── ...                        # Unit-/Integrationstests
```

## Hinweise zur Nutzung

- **`docs/features/*.md`**: Jede Datei beschreibt den aktuellen Soll-Stand
  eines Feature-Bereichs — das ist der Kontext, den ein neuer Agent vor
  der Arbeit an diesem Bereich lesen sollte. Wird bei jeder relevanten
  Änderung mitgepflegt (siehe `AGENTS.md`, Abschnitt 3).
- **`docs/DECISIONS.md`**: Kein aufwändiges ADR-Format nötig — reicht als
  einfache Liste: Datum, Entscheidung, kurze Begründung.
- **`src/security/`**: Bewusst als eigener, zentraler Ordner angelegt,
  damit die Sanitizing-Pflicht (siehe `PRINCIPLES.md`, Abschnitt 4) nicht
  pro Komponente neu erfunden wird, sondern über einen gemeinsamen
  Wrapper läuft.
- **Später (Phase mit App-Verpackung):** Ein zusätzlicher Ordner wie
  `packaging/tauri/` bzw. `packaging/capacitor/` kommt dazu, sobald diese
  Phase ansteht — nicht vorab anlegen, um den MVP schlank zu halten.

## Noch offen

- Konkrete Framework-Wahl (Vanilla JS/TS, oder ein leichtgewichtiges
  Frontend-Framework) — wird ergänzt, sobald entschieden.
- Test-Setup/Tooling — wird beim MVP-Start konkretisiert.
