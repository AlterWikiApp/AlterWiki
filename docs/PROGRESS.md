# Progress Log

**Status:** Laufender Fortschritts-/Session-Log
**Letzte Aktualisierung:** 2026-08-20

## Session 1 — 2026-08-20

### Abgeschlossen: Phase 0 (Projekt-Setup) + Meilenstein 1 (Wikipedia-API-Client)

#### Phase 0 — Projekt-Setup
- ✅ Repository-Struktur korrigiert (`scr` → `src`)
- ✅ Vite + Vue 3 + TypeScript Projekt eingerichtet
- ✅ Tailwind CSS installiert und konfiguriert (inkl. Dark Mode)
- ✅ ESLint + Prettier für Linting/Formatting konfiguriert
- ✅ Verzeichnisstruktur gemäß `PROJECT_STRUCTURE.md` erstellt:
  - `src/api/` — Wikimedia-API-Anbindung
  - `src/components/` — UI-Komponenten
  - `src/pages/` — Ansichten/Routen
  - `src/state/` — Lokaler State
  - `src/security/` — Sanitizing-Wrapper
  - `src/styles/` — Themes

#### Meilenstein 1 — Wikipedia-API-Client
- ✅ Zentraler Wikipedia-Client (`src/api/wikipediaClient.ts`) implementiert
- ✅ `User-Agent`/`Api-User-Agent` Header gemäß Wikimedia-Policy gesetzt
- ✅ Einfaches In-Memory-Caching (5 Minuten TTL) implementiert
- ✅ API-Methoden implementiert:
  - `search()` — Suche mit Live-Vorschlägen
  - `getArticle()` — Artikel-Content (mobile-html)
  - `getRandomArticle()` — Zufälliger Artikel
  - `getSummary()` — Kurzfassung/Vorschau
- ✅ Caching-Logik integriert (Cache-Key basierend auf Endpoint + Params)

### Technische Details
- **Package Manager:** npm
- **Dependencies:** vue@^3.4.0
- **DevDependencies:** vite, @vitejs/plugin-vue, typescript, tailwindcss, postcss, autoprefixer, eslint, prettier
- **Build-Tool:** Vite
- **Framework:** Vue 3 mit TypeScript
- **Styling:** Tailwind CSS

### Offene Punkte / Nächste Schritte
- ⏳ Meilenstein 2: Such-UI implementieren
- ⏳ Meilenstein 3: Artikelanzeige mit Sanitizing-Integration
- ⏳ Meilenstein 4: Interne Navigation
- ⏳ Meilenstein 5: Sprachauswahl
- ⏳ Meilenstein 6: PWA-Grundgerüst
- ⏳ Meilenstein 7: Dark/Light-Theme
- ⏳ Meilenstein 8-9: Should-have Features (Zufälliger Artikel, Inhaltsverzeichnis)
- ⏳ Meilenstein 10: Testing & Politur

### Architekturentscheidungen
- **Datum:** 2026-08-20
- **Entscheidung:** Vue 3 + TypeScript + Vite + Tailwind CSS als Tech-Stack
- **Begründung:** Moderne, performante Stack-Kombination; gute TypeScript-Unterstützung; Vite für schnelles Development; Tailwind für effizientes Styling mit Dark Mode Support
- **Caching-Strategie:** In-Memory-Caching mit 5-Minuten-TTL als MVP-Lösung; später ggf. IndexedDB für persistenteres Caching

### Hinweise
- Die Tailwind-Warnings (@tailwind directives) sind normal und verschwinden beim Build-Prozess
- npm audit zeigt 5 vulnerabilities (4 moderate, 1 high) — können später adressiert werden
- User-Agent in `wikipediaClient.ts` muss noch mit echten Projekt-Details aktualisiert werden
