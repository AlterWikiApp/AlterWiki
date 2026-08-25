# Projektprinzipien

**Status:** Verbindlich für alle Beiträge (Menschen wie KI-Agenten)
**Letzte Aktualisierung:** 2026-08-20

Diese Prinzipien sind Leitplanken. Jede Feature-Entscheidung, jeder Pull
Request und jede Architekturwahl wird an ihnen gemessen. Im Zweifel hat
dieses Dokument Vorrang vor einzelnen Feature-Wünschen.

## 1. Vision

Eine offene, freie Wikipedia-App (Browser/PWA, später ggf. native
Verpackung für Linux/Android) mit deutlich mehr Funktionsumfang als
bestehende schlanke Reader — bei gleichzeitig höchstem Anspruch an
Privatsphäre, Sicherheit und Zugänglichkeit.

## 2. Lizenz & Offenheit

- Die App ist **Open Source** und **frei** — kein Teil des Codes wird
  jemals proprietär oder closed-source.
- Empfohlene Lizenz: **AGPLv3 oder GPLv3** (kompatibel mit F-Droid- und
  AUR-Anforderungen, verhindert proprietäre Forks).
- Wikipedia-Inhalte selbst stehen unter **CC BY-SA** (teils zusätzlich
  GFDL). Bei jeder Form von Speicherung, Offline-Cache oder Export muss
  die Lizenz-Attribution erhalten bleiben.
- Es wird **niemals** eine Partnerschaft mit der Wikimedia Foundation
  suggeriert (z.B. "wir haben mit Wikipedia partnered"). Korrekt ist:
  "Diese App nutzt Inhalte von Wikipedia."

## 3. Anonymität & Datensparsamkeit

- **Keine Datensammlung ohne Opt-in.** Standardmäßig wird nichts erfasst.
  Wenn eine Funktion (z.B. Statistiken) Daten sammelt, ist sie:
  - standardmäßig **ausgeschaltet**,
  - für den Nutzer **klar erklärt**, bevor er sie aktiviert,
  - jederzeit wieder deaktivier- und löschbar.
- **Local-first:** Persönliche Daten (Lesezeichen, Verlauf, Einstellungen)
  werden primär lokal auf dem Gerät gespeichert. Ein Server-Account ist
  nie Voraussetzung für die Kernfunktionen.
- **Kein Tracking, keine Analytics-Dienste, keine Werbung.** Auch keine
  "kostenlosen" Analytics-SDKs Dritter (z.B. Google Analytics, Firebase) —
  diese sind zudem mit F-Droid nicht kompatibel (siehe Abschnitt 6).
- Falls später ein Wikipedia-Account verknüpft werden kann (Sync):
  ausschließlich über offizielles **Wikimedia OAuth**, nie über
  ein selbstgebautes Login-System, das Zugangsdaten verwaltet.

## 4. Sicherheit

- **Sanitizing-Pflicht:** Wikipedia-Artikel-HTML enthält von Templates
  generierten Code und darf **niemals ungefiltert** ins DOM eingefügt
  werden (XSS-Risiko). Jede Stelle, die Wiki-Content rendert, muss eine
  etablierte Sanitizing-Bibliothek (z.B. DOMPurify) verwenden — technisch
  erzwungen, nicht nur als Empfehlung.
- Kein `innerHTML`/`dangerouslySetInnerHTML` mit ungeprüftem Content ohne
  Sanitizer-Wrapper. Falls ein Linter/Test dafür eingerichtet werden kann,
  ist das anzustreben.
- API-Kommunikation: aussagekräftiger `User-Agent`/`Api-User-Agent`-Header
  gemäß Wikimedia-Policy, Caching wo möglich, um Wikimedia-Infrastruktur
  nicht unnötig zu belasten.
- Bei OAuth/Login-Funktionen: Standard-Sicherheitspraktiken (kein
  Speichern von Tokens im Klartext, keine eigenen Krypto-Experimente).

## 5. Barrierefreiheit

- Semantisches HTML (echte `<button>`, `<nav>`, korrekte
  Überschriften-Hierarchie) statt reiner `<div>`-Konstruktionen.
- Ausreichender Farbkontrast — auch im Dark-Theme.
- Vollständige Tastaturbedienbarkeit.
- Alt-Texte für Bilder (Wikipedia liefert diese meist über die API mit —
  müssen übernommen werden, nicht verworfen).
- ARIA-Labels wo nötig, Screenreader-Kompatibilität.
- Automatisierte Prüfung anstreben (z.B. Lighthouse, axe) als Teil der
  Qualitätssicherung.

## 6. F-Droid- & AUR-Konformität

- Keine proprietären Abhängigkeiten (Google Play Services, Firebase,
  Crashlytics, proprietäre Ad-/Tracking-SDKs) — auch nicht "nur" für ein
  Feature-Flag.
- Native Build-Abhängigkeiten (relevant erst bei späterer
  Capacitor/Tauri-Verpackung) nur aus von F-Droid anerkannten
  Repositories (Maven Central, Google Maven Repo, OSS Sonatype, OSS
  JFrog, JitPack.io, Clojars) oder aus Quellkompilierung.
- Keine automatischen Downloads von ausführbarem Code zur Laufzeit.
- Öffentliches Source-Repository (Git), durchgehend aktuell gehalten.

## 7. Wikimedia-Regel-Konformität

- Aussagekräftiger `User-Agent`/`Api-User-Agent`-Header bei jeder
  API-Anfrage.
- Rate Limits respektieren, Caching nutzen wo sinnvoll.
- Keine Sublizenzierung/Weitergabe von API-Zugriff an Dritte.
- Klare Trennung: Wikimedia-Marken (Name/Logo) unterliegen eigenen
  Lizenzbedingungen — die App darf nicht den Eindruck erwecken, offizielle
  Wikimedia-Software zu sein.
