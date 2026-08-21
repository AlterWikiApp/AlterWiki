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
