# Architekturentscheidungen

**Status:** Kurze Architekturentscheidungs-Log
**Letzte Aktualisierung:** 2026-08-20

## 2026-08-20 — Tech-Stack Auswahl

**Entscheidung:** Vue 3 + TypeScript + Vite + Tailwind CSS als Tech-Stack

**Begründung:**
- Moderne, performante Stack-Kombination
- Gute TypeScript-Unterstützung
- Vite für schnelles Development
- Tailwind für effizientes Styling mit Dark Mode Support

## 2026-08-20 — Caching-Strategie

**Entscheidung:** In-Memory-Caching mit 5-Minuten-TTL als MVP-Lösung

**Begründung:**
- Einfache Implementierung für MVP
- Später ggf. IndexedDB für persistenteres Caching 
