# AGENTS.md — Regeln für KI-Coding-Agenten

Dieses Dokument ist für **jeden neuen KI-Agenten** gedacht, der an diesem
Projekt arbeitet (egal ob Windsurf, Kimi, Claude oder ein anderes Tool).
Bitte dieses Dokument **immer zuerst lesen**, bevor du Code schreibst.

## 0. Pflichtlektüre vor der ersten Aufgabe

1. `PRINCIPLES.md` — nicht verhandelbare Grundsätze (Sicherheit,
   Anonymität, Barrierefreiheit, Lizenzen). Jede Umsetzung muss dazu
   konform sein.
2. `docs/features/` — die Spezifikation des Feature-Bereichs, an dem du
   gerade arbeitest.
3. Diese Datei.

Wenn eine Anforderung im Auftrag den Prinzipien widerspricht: **nachfragen
statt einfach umsetzen.**

## 1. Projekt-Kontext (kurz)

- Open-Source Wikipedia-App, Web-basiert (PWA), später ggf. Verpackung
  für Linux (Tauri) und Android (Capacitor, Ziel: F-Droid + AUR).
- Aktuelle Phase: siehe `docs/ROADMAP.md`.
- Zielgruppe: alle Wikipedia-Leser, mit Fokus auf Privatsphäre und
  Zugänglichkeit.

## 2. Tech-Stack

- Frontend: Web-Technologien (HTML/CSS/JS bzw. TS), lauffähig als PWA.
- Datenquelle: Wikimedia REST API / MediaWiki Action API.
- Persistenz: client-seitig (IndexedDB/localStorage), kein Server-Backend
  in der aktuellen Phase.
- *(Wird ergänzt, sobald konkrete Framework-Entscheidungen getroffen
  sind — bis dahin hier nachschlagen, nicht selbstständig ein neues
  Framework einführen.)*

## 3. Arbeitsweise

- **Kleine, nachvollziehbare Änderungen.** Lieber mehrere kleine Commits
  als einen riesigen.
- **Aussagekräftige Commit-Messages**: kurzer Titel + kurze Begründung,
  auf welches Feature/Issue sich die Änderung bezieht.
- **Nach jeder abgeschlossenen Aufgabe:** relevante Doku aktualisieren
  (Feature-Spec in `docs/features/`, ggf. `README.md`). Eine Aufgabe gilt
  erst als fertig, wenn die Doku dazu passt — nicht nur der Code.
- Bei Unsicherheit über Scope oder Architekturentscheidung: **fragen,
  nicht raten.**

## 4. Sicherheit & Qualität (siehe auch PRINCIPLES.md)

- Kein ungefiltertes Einfügen von Wikipedia-HTML ins DOM — immer über
  Sanitizer (z.B. DOMPurify).
- Keine proprietären/Non-FOSS-Abhängigkeiten (siehe PRINCIPLES.md,
  Abschnitt 6) — auch nicht "nur zum Testen", das verschleppt sich sonst.
- Kein Tracking-/Analytics-Code, auch nicht auskommentiert oder als
  Platzhalter.
- API-Aufrufe an Wikimedia: aussagekräftiger `User-Agent`/
  `Api-User-Agent`-Header, Caching wo sinnvoll.
- Neue UI-Elemente: an Barrierefreiheits-Grundregeln halten (semantisches
  HTML, Tastaturbedienbarkeit, Kontrast, Alt-Texte).

## 5. Umgang mit Kontextverlust zwischen Tools/Sessions

Da an diesem Projekt mit wechselnden Tools und begrenzten Chat-Kontexten
gearbeitet wird:

- Verlasse dich **nicht** auf vorherige Chat-Historie — der aktuelle
  Stand steht immer in `docs/` und im Code selbst.
- Wenn du eine Architekturentscheidung triffst, die nicht schon
  dokumentiert war: kurz in `docs/DECISIONS.md` festhalten (was, warum,
  Datum) — das erspart dem nächsten Agenten, dieselbe Frage neu zu
  klären.
- Am Ende einer Session: kurze Zusammenfassung, was gemacht wurde und was
  als Nächstes ansteht (z.B. als Kommentar im Task/Issue oder in
  `docs/PROGRESS.md`).

## 6. Was du NICHT tun sollst

- Kein neues Framework/keine neue Kernbibliothek einführen, ohne das kurz
  zu begründen (Kommentar/Doku reicht, keine Rückfrage nötig, aber es
  muss nachvollziehbar sein).
- Keine Features aus späteren Phasen "schon mal vorbereiten", die nicht
  beauftragt wurden — das bläht den MVP unnötig auf (siehe
  `docs/ROADMAP.md`).
- Keine Abkürzungen bei Sicherheit/Sanitizing "weil es schneller geht".
