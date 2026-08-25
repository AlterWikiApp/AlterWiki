# AlterWiki

Ein hochgradig anpassbarer Reader für Wikipedia-Inhalte — Open Source
und frei, mit Fokus auf Privatsphäre, Sicherheit und Barrierefreiheit.

> ⚠️ **Früher Entwicklungsstand.** Diese App ist noch nicht
> benutzungsreif. Coding wird durch KI-Agenten unterstützt.

## Vision

Anders als die meisten schlanken Wikipedia-Reader soll AlterWiki mehr
bieten: eine individuelle Startseite, kuratierte Sammlungen und ein
UI, das sich an die eigenen Lesegewohnheiten anpassen lässt — bei
gleichzeitig striktem Fokus auf Anonymität, Sicherheit und
Zugänglichkeit. Details siehe `PRINCIPLES.md`.

## Aktueller Stand

Phase 1 (MVP: Suchen, Lesen, Navigieren) ist in aktiver Entwicklung.
Den genauen Fortschritt und die geplanten nächsten Schritte gibt's in `docs/ROADMAP.md` und `docs/PROGRESS.md`.

## Tech-Stack

- [Vue 3](https://vuejs.org/) + TypeScript
- [Vite](https://vitejs.dev/) als Build-Tool
- [Tailwind CSS](https://tailwindcss.com/) für Styling (inkl. Dark Mode)
- PWA (Progressive Web App) — später ggf. zusätzlich als natives Paket
  über Tauri (Linux) und Capacitor (Android/F-Droid)
- Wikimedia REST API für Inhalte, kein eigenes Wikitext-Parsing

## Lokal starten

```bash
npm install
npm run dev
```

Die App läuft danach unter `http://localhost:5173` (Standard-Vite-Port).

Smoke-Test für den API-Client:

```bash
npm run test:smoke
```

## Mitwirken

Dieses Projekt ist offen für Beiträge. Bevor du loslegst, lies bitte:

- `PRINCIPLES.md` — verbindliche Grundsätze
  (Sicherheit, Anonymität, Barrierefreiheit, Lizenzen)
- `AGENTS.md` — Arbeitsregeln (gilt für menschliche
  Beiträge genauso wie für KI-Coding-Agenten)
- `docs/PROJECT_STRUCTURE.md` — Aufbau
  des Repos

## Lizenz

AGPL-3.0 — frei nutzbar, veränderbar und weitergebbar,
unter den Bedingungen der AGPL.

## Hinweis

AlterWiki steht in keiner Verbindung zur Wikimedia Foundation und wird
nicht von ihr unterstützt. Die App nutzt öffentlich zugängliche
Wikipedia-Inhalte über die offizielle API.
