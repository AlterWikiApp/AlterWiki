# Architekturentscheidungen

**Status:** Kurze Architekturentscheidungs-Log
**Letzte Aktualisierung:** 2026-08-21

## 2026-08-20 — Tech-Stack Auswahl

**Entscheidung:** Vue 3 + TypeScript + Vite + Tailwind CSS als Tech-Stack
**Gefällt durch:** Devin (AI)
**Begründung:**

- Moderne, performante Stack-Kombination
- Gute TypeScript-Unterstützung
- Vite für schnelles Development
- Tailwind für effizientes Styling mit Dark Mode Support

## 2026-08-20 — Caching-Strategie

**Entscheidung:** In-Memory-Caching mit 5-Minuten-TTL als MVP-Lösung
**Gefällt durch:** Devin (AI)
**Begründung:**

- Einfache Implementierung für MVP
- Später ggf. IndexedDB für persistenteres Caching

## 2026-08-21 — Phase 4 (Bearbeiten) entfernt

**Entscheidung:** Phase 4 (Bearbeiten) komplett aus Roadmap entfernt
**Gefällt durch:** Dominik
**Begründung:**

- Bearbeitungsfunktionen aus Feature-Liste gestrichen
- Fokus auf reinen Reader-Anwendung
- Reduktion des Projektumfangs für schnelleres MVP

## 2026-08-21 — Editing-Funktionen aus der Featurelist gestrichen

**Entscheidung:** Alle Schreib/Editing-Funktionen werden aus der Featurelist gestrichen. Es müssen im Code keine Grundlagen für Edit-Features implementiert werden.
**Gefällt durch:** Dominik
**Begründung:**

- Zu komplex und Umfangreich: Ein Großer Aufwand wäre nötig um eine zufriedenstellende Edit-Funktion einzubauen
- Lässt sich leicht durch Direktlinks zum Editor auf Wikipedia ersetzen

## 2026-08-23 — API-Endpunkt für Artikel-Content gewechselt

**Entscheidung:** Wechsel von `mobile-html` zu `page/html` Endpunkt für Artikelabruf
**Gefällt durch:** Devin (AI)
**Begründung:**
- `mobile-html` Endpunkt nutzt PCS (Page Content Service) mit Kollaps-Struktur
- PCS blendet Sektionen standardmäßig aus (für Wikimedias Einklapp-Funktionalität)
- `page/html` liefert Wikipedia-HTML ohne PCS-Struktur, alle Sektionen sichtbar
- Kein Editieren im MVP, daher keine PCS-Funktionalität nötig

## 2026-08-21 — Responsive statt getrennte Mobile-/Desktop-Version

**Entscheidung:** Eine einzige, responsive Codebasis (Tailwind-Breakpoints,
mobile-first) statt getrennter Versionen/Codepfade für Android und Linux.

**Begründung:**

- Customization (Startseite, Widgets) ist eine Frage von Datenstruktur/
  State, nicht von Plattform — dieselbe Konfiguration lässt sich auf
  schmalen wie breiten Bildschirmen unterschiedlich anordnen.
- Tailwind CSS (bereits im Stack) ist genau für dieses Muster gebaut.
- Vermeidet doppelte Pflege von UI-Logik für zwei "Versionen".
- Einzige absehbare Ausnahme: Drag-and-Drop-Anordnung von Widgets
  (falls später gewünscht) braucht bei Touch vs. Maus etwas
  Zusatzsorgfalt — ist aber innerhalb derselben Codebasis lösbar, keine
  Rechtfertigung für getrennte Apps.

**Konsequenz für die Umsetzung:** MVP-Komponenten von Anfang an
mobile-first mit Tailwind-Breakpoints bauen, nicht nachträglich von
Desktop auf Mobile umbauen.
