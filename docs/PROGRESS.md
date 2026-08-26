# Progress Log

**Status:** Laufender Fortschritts-/Session-Log
**Letzte Aktualisierung:** 2026-08-26

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
- ✅ API-Endpunkt von mobile-html auf page/html gewechselt (PCS-Kollaps-Problem behoben)
- ⚠️ Bekanntes Problem: Interne Wikilink-Klick aktualisiert nur die Überschrift, nicht den Content (Routing-Problem)

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

## Session 2 — 2026-08-25

### Abgeschlossen: Meilenstein 3 (Artikelanzeige) Bugfix + Dokumentation

#### page/html-Endpoint-Fix

- ✅ API-Endpunkt von `mobile-html` auf `page/html` gewechselt
- ✅ Ursache: PCS (Page Content Service) Kollaps-Struktur blendete Sektionen aus
- ✅ Verifiziert: Alle Artikel-Sektionen jetzt vollständig sichtbar
- ✅ Smoke-Test: Berlin Artikel jetzt 1.48MB (vs 0.78MB vorher)
- ✅ Entscheidung in `docs/DECISIONS.md` dokumentiert

#### Sanitizing-Check nach Endpoint-Wechsel

- ✅ DOMPurify-Konfiguration passt zu neuem page/html-Format
- ✅ Keine Edit-Section-Links im page/html-Format (kein Sanitizing-Problem)
- ✅ Script-Payload-Test erstellt (tests/script-payload-test.ts)
- ⚠️ Node.js-Test schlägt fehl (DOMPurify Import-Problem), aber Browser-Sanitizing funktioniert

#### Link-Klick-Bug (Teilfortschritt)

- ⚠️ Bekanntes Problem: Interne Wikilink-Klick aktualisiert nur Überschrift, nicht Content
- ✅ Link-Interception implementiert (ArticleView.vue)
- ✅ Routing-Logik vorhanden, aber Content-Reload fehlt
- 📝 Offen für nächsten Agent: Meilenstein 4 (Interne Navigation)

#### Dokumentation & Repository

- ✅ Alle Doku-Dateien committet: AGENTS.md, PRINCIPLES.md, PROJECT_STRUCTURE.md
- ✅ docs/features/reader.md hinzugefügt
- ✅ docs/IDEAS.md erstellt (lokale Profile, kuratierte Inhalte)
- ✅ docs/DECISIONS.md aktualisiert (mobile-html → page/html, Responsive-Design)
- ✅ LICENSE (AGPLv3) von Remote übernommen
- ✅ GitHub-Remote eingerichtet: https://github.com/AlterWikiApp/AlterWiki.git
- ✅ Alle 17 Commits auf GitHub gepusht

### Architekturentscheidungen

Siehe `docs/DECISIONS.md`

### Hinweise

- Die Tailwind-Warnings (@tailwind directives) sind normal und verschwinden beim Build-Prozess
- npm audit zeigt 5 vulnerabilities (4 moderate, 1 high) — können später adressiert werden
- User-Agent in `wikipediaClient.ts` muss noch mit echten Projekt-Details aktualisiert werden

## Session 3 — 2026-08-25

### Abgeschlossen: Wikilink-Navigation Bugfix (Meilenstein 4 — Interne Navigation)

#### Problem

- Interne Wikilink-Klicks aktualisierten nur die Artikel-Überschrift (`computed` auf `route.params.title`), nicht den Body-Content
- Ursache: `loadArticle()` wurde nur in `onMounted()` aufgerufen; bei Routenwechsel innerhalb derselben Komponente (`/article/:title` → `/article/:title`) wurde `onMounted` nicht erneut ausgelöst

#### Lösung

- `watch()` auf `route.params.title` in `ArticleView.vue` hinzugefügt
- Bei jeder Änderung des Titels: `articleHtml.value = ''` (alten Content sofort leeren) + `loadArticle()` (neuen Content fetchen)
- `window.scrollTo({ top: 0, behavior: 'smooth' })` nach erfolgreichem Laden, damit der Nutzer oben im neuen Artikel landet
- Keine Änderungen am Router oder an anderen Komponenten nötig

#### Dateien geändert

- `src/pages/ArticleView.vue` — `watch`-Import, Watcher auf `route.params.title`, Scroll-to-top
- `docs/PROGRESS.md` — Session 3 dokumentiert

#### Status

- ✅ Meilenstein 4 (Interne Navigation) — Wikilink-Navigation vollständig funktionsfähig
- ⏳ Meilenstein 5: Sprachauswahl
- ⏳ Meilenstein 6: PWA-Grundgerüst
- ⏳ Meilenstein 7: Dark/Light-Theme
- ⏳ Meilenstein 8-9: Should-have Features (Zufälliger Artikel, Inhaltsverzeichnis)
- ⏳ Meilenstein 10: Testing & Politur

## Session 4 — 2026-08-25

### Abgeschlossen: Meilenstein 5 — Sprachauswahl

#### Umgesetzt

- `src/state/language.ts` — Zentraler reaktiver Sprach-State mit localStorage-Persistenz, 10 unterstützte Sprachen (en, de, fr, es, it, pt, ru, ja, zh, ar)
- `src/components/LanguageSelector.vue` — Barrierefreies Dropdown (ARIA-Attribute, Tastaturbedienbarkeit), Dark Mode Support
- `src/api/wikipediaClient.ts` — Alle Methoden nutzen jetzt `currentLanguage.value` als Default statt hardcoded `'en'`
- `src/pages/SearchPage.vue` — LanguageSelector eingebunden, Suche wird bei Sprachwechsel automatisch neu ausgeführt
- `src/pages/ArticleView.vue` — LanguageSelector eingebunden, Artikel wird bei Sprachwechsel neu geladen

#### Technische Details

- `currentLanguage` ist ein Vue-`ref`, der in `localStorage` persistiert wird
- Der `watch` auf `currentLanguage` in `ArticleView.vue` triggert `loadArticle()` bei jeder Sprachänderung
- Der API-Client liest `currentLanguage.value` zur Laufzeit (nicht zur Compile-Zeit), damit Änderungen sofort wirksam werden
- Cache-Invalidierung: Sprachwechsel löst keinen expliziten Cache-Clear aus, aber Cache-Keys enthalten die Sprache, daher werden alte Einträge nicht wiederverwendet

#### Dateien geändert

- **Neu:** `src/state/language.ts`
- **Neu:** `src/components/LanguageSelector.vue`
- Geändert: `src/api/wikipediaClient.ts`
- Geändert: `src/pages/SearchPage.vue`
- Geändert: `src/pages/ArticleView.vue`

#### Status

- ✅ Meilenstein 4 (Interne Navigation) — vollständig funktionsfähig
- ✅ Meilenstein 5 (Sprachauswahl) — vollständig funktionsfähig
- ⏳ Meilenstein 6: PWA-Grundgerüst
- ⏳ Meilenstein 7: Dark/Light-Theme
- ⏳ Meilenstein 8-9: Should-have Features (Zufälliger Artikel, Inhaltsverzeichnis)
- ⏳ Meilenstein 10: Testing & Politur

## Session 5 — 2026-08-26

### Abgeschlossen: Meilenstein 6 — PWA-Grundgerüst

#### Umgesetzt

- `vite.config.ts` — `vite-plugin-pwa` konfiguriert mit Workbox Service Worker, Web-App-Manifest und Runtime-Caching für Wikipedia-API-Antworten
- **Manifest:** Name „AlterWiki“, `display: standalone`, `lang: de`, Theme-Farbe `#3b82f6`, Hintergrund `#f9fafb`
- **Icons:** `public/icons/icon-192.png` und `icon-512.png` (einfaches „AW“-Logo auf Blau)
- **App-Shell offline:** JS/CSS/HTML werden per Workbox precached — App startet ohne Netzwerk
- **Artikel-Cache:** Bereits geladene Artikel (`/api/rest_v1/page/html/…`) werden im Service Worker (`CacheFirst`, max. 100 Einträge, 30 Tage) vorgehalten
- `src/state/online.ts` — reaktiver Online-Status via `navigator.onLine` + Event-Listener
- `src/components/OfflineBanner.vue` — barrierefreier Hinweis „Du bist offline – keine neuen Artikel“ (`role="status"`, `aria-live="polite"`, Dark Mode)
- `src/App.vue` — OfflineBanner global eingebunden
- `src/main.ts` — Service-Worker-Registrierung via `virtual:pwa-register`
- `src/api/wikipediaClient.ts` — offline-aware Fehlermeldungen
- `src/pages/SearchPage.vue` — Suche blockiert bei Offline mit klarer Meldung
- `index.html` — `lang="de"`, Titel/Meta für AlterWiki

#### Technische Details

- **Runtime-Caching-Strategien:**
  - Artikel-HTML: `CacheFirst` (Offline-Lesen bereits besuchter Artikel)
  - Suche: `NetworkFirst` (keine neuen Ergebnisse offline, außer zufällig gecacht)
  - Summary: `CacheFirst`
- **Keine neuen Runtime-Dependencies** — nur `vite-plugin-pwa` als DevDependency (laut Roadmap vorgesehen, fehlte in `package.json`)
- Service Worker: `registerType: 'autoUpdate'` — Updates im Hintergrund

#### Dateien geändert

- **Neu:** `public/icons/icon-192.png`, `public/icons/icon-512.png`
- **Neu:** `src/state/online.ts`
- **Neu:** `src/components/OfflineBanner.vue`
- Geändert: `vite.config.ts`, `index.html`, `src/main.ts`, `src/App.vue`, `src/vite-env.d.ts`
- Geändert: `src/api/wikipediaClient.ts`, `src/pages/SearchPage.vue`
- Geändert: `package.json`, `package-lock.json`

#### Status

- ✅ Meilenstein 4 (Interne Navigation) — vollständig funktionsfähig
- ✅ Meilenstein 5 (Sprachauswahl) — vollständig funktionsfähig
- ✅ Meilenstein 6 (PWA-Grundgerüst) — vollständig funktionsfähig
- ⏳ Meilenstein 7: Dark/Light-Theme
- ⏳ Meilenstein 8-9: Should-have Features (Zufälliger Artikel, Inhaltsverzeichnis)
- ⏳ Meilenstein 10: Testing & Politur

## Session 6 — 2026-08-26

### Abgeschlossen: Meilenstein 7 — Dark/Light-Theme Switcher

#### Umgesetzt

- `src/state/theme.ts` — Zentraler Theme-State mit drei Modi: `system`, `light`, `dark`
- **localStorage-Persistenz** unter Schlüssel `alterwiki-theme` (Default: `system`)
- **System-Preference:** `prefers-color-scheme` wird bei Modus „Automatisch“ genutzt; Listener reagiert auf OS-Wechsel
- `src/components/ThemeToggle.vue` — Modus-Button (Automatisch/Hell/Dunkel) + barrierefreier Switch (`role="switch"`, `aria-checked`)
- `html.dark`-Klasse auf `document.documentElement` — kompatibel mit bestehenden `.dark`-Styles aller Komponenten
- **Übergangsanimation:** `theme-transition`-Klasse auf `<html>` für 300 ms (respektiert `prefers-reduced-motion`)
- **FOUC-Vermeidung:** Inline-Script in `index.html` setzt Theme vor Vue-Mount
- `src/style.css` — Light/Dark-Basisfarben, globale Theme-Transitions
- `src/App.vue` — ThemeToggle global oben rechts

#### Technische Details

- Modus-Button zyklisch: Automatisch → Hell → Dunkel → Automatisch
- Switch toggelt direkt zwischen Hell und Dunkel (explizite Präferenz)
- `meta[name="theme-color"]` passt sich an (#3b82f6 hell, #111827 dunkel)
- Responsive: Modus-Label auf schmalen Viewports ausgeblendet, Icons bleiben sichtbar

#### Dateien geändert

- **Neu:** `src/state/theme.ts`
- **Neu:** `src/components/ThemeToggle.vue`
- Geändert: `src/App.vue`, `src/main.ts`, `src/style.css`, `index.html`

#### Status

- ✅ Meilenstein 4 (Interne Navigation) — vollständig funktionsfähig
- ✅ Meilenstein 5 (Sprachauswahl) — vollständig funktionsfähig
- ✅ Meilenstein 6 (PWA-Grundgerüst) — vollständig funktionsfähig
- ✅ Meilenstein 7 (Dark/Light-Theme) — vollständig funktionsfähig
- ⏳ Meilenstein 8-9: Should-have Features (Link-Darstellungs-Demo, Inhaltsverzeichnis)
- ⏳ Meilenstein 10: Testing & Politur

