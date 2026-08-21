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

#### Meilenstein 2 — Such-UI
- ✅ SearchInput-Komponente mit Debounce (300ms) erstellt
- ✅ SearchResults-Komponente für Ergebnisliste erstellt
- ✅ SearchPage als zentrale Such-Seite implementiert
- ✅ Vue Router 4 für Routing eingerichtet
- ✅ App.vue auf router-view umgestellt
- ✅ Barrierefreiheit: semantisches HTML, Tastaturbedienbarkeit, ARIA-Labels
- ✅ Dark Mode Support in allen Komponenten
- ✅ Live-Suche mit Wikipedia-API-Integration getestet

#### Meilenstein 3 — Artikelanzeige mit Sanitizing-Integration
- ✅ DOMPurify für HTML-Sanitizing installiert
- ✅ Zentraler Sanitizer-Wrapper (src/security/sanitizer.ts) erstellt
- ✅ ArticleView-Komponente mit sanitizing implementiert
- ✅ Artikel-Route zum Router hinzugefügt
- ✅ SearchPage navigiert bei Klick auf Ergebnis zur Artikelansicht
- ✅ Interne Wikilinks werden abgefangen und auf In-App-Navigation umgebogen
- ✅ Externe Links öffnen regulär extern
- ✅ Barrierefreiheit: semantisches HTML, Tastaturbedienbarkeit, ARIA-Labels
- ✅ Dark Mode Support für Artikel-Content
- ✅ Artikelanzeige mit echtem Wikipedia-Content getestet

### Technische Details
- **Package Manager:** npm
- **Dependencies:** vue@^3.4.0, vue-router@^4.0.0, dompurify
- **DevDependencies:** vite, @vitejs/plugin-vue, typescript, tailwindcss, postcss, autoprefixer, eslint, prettier, tsx, @types/node
- **Build-Tool:** Vite
- **Framework:** Vue 3 mit TypeScript
- **Routing:** Vue Router 4
- **Styling:** Tailwind CSS
- **Security:** DOMPurify für HTML-Sanitizing (verpflichtend)

### Offene Punkte / Nächste Schritte
- ✅ Meilenstein 2: Such-UI implementieren
- ✅ Meilenstein 3: Artikelanzeige mit Sanitizing-Integration
- ⏳ Meilenstein 4: Interne Navigation
- ⏳ Meilenstein 5: Sprachauswahl
- ⏳ Meilenstein 6: PWA-Grundgerüst
- ⏳ Meilenstein 7: Dark/Light-Theme
- ⏳ Meilenstein 8-9: Should-have Features (Zufälliger Artikel, Inhaltsverzeichnis)
- ⏳ Meilenstein 10: Testing & Politur

### Roadmap-Änderungen
- **2026-08-21:** Phase 4 (Bearbeiten) aus Roadmap entfernt
- **2026-08-21:** Editing-Funktionen komplett aus Feature-Liste gestrichen
- Projektumfang reduziert auf reinen Reader-Anwendung

### Architekturentscheidungen
Siehe `docs/DECISIONS.md`

### Hinweise
- Die Tailwind-Warnings (@tailwind directives) sind normal und verschwinden beim Build-Prozess
- npm audit zeigt 5 vulnerabilities (4 moderate, 1 high) — können später adressiert werden
- User-Agent in `wikipediaClient.ts` muss noch mit echten Projekt-Details aktualisiert werden
