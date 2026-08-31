# Feature: Reader (Phase 1 — MVP)

**Status:** Spezifiziert, bereit für Umsetzung **Letzte Aktualisierung:** 2026-08-20 **Bezug:** `docs/ROADMAP.md` Phase 1, `PRINCIPLES.md` (Sicherheit, Barrierefreiheit)

## Ziel

Ein vollständig funktionierender Wikipedia-Reader: suchen, lesen,
navigieren — als stabile Basis für alle späteren Phasen.

## Architekturentscheidung (Kontext für Agenten)

Es wird **keine eigene Wikitext-Parsing-Logik** gebaut. Stattdessen wird
von Wikimedia bereits aufbereitetes HTML über die REST API geladen (genau
der Ansatz, den auch die offizielle Wikipedia-App nutzt), in einer
eigenen App-Oberfläche gerendert und dabei zwingend sanitized. Dadurch
behält die App volle Kontrolle über UI, Navigation, Theme und spätere
Personalisierung — im Gegensatz zu einem reinen Browser-Wrapper, der
Wikipedias eigene Seite 1:1 anzeigen würde.

## Umfang

### Must-have

1. Volltextsuche mit Live-Vorschlägen
2. Artikelanzeige (Text, Bilder, Infoboxen)
3. Interne Wikilink-Navigation (in-App, mit Vor-/Zurück-Verlauf)
4. Sprachauswahl
5. PWA-Grundgerüst (installierbar, App-Shell offline startbar)
6. Dark/Light-Theme, wirkt auch auf gerenderten Artikel-Content

### Should-have

7. **Link-Darstellungs-Demo:** Anzeigeeinstellung für Link-Darstellung im
   Artikel-Content — Farbe (freie Wahl per `<input type="color">` + ein
   paar Presets), Unterstrichen an/aus, oder komplett ohne visuelle
   Linkdarstellung (Text bleibt aber funktional klickbar). Frei
   kombinierbar, **nicht persistiert** (reine Demo/Session-State). Dient
   als kleiner Vorgeschmack auf die Customization-Kernidee der Gesamt-App
   — kein Zufalls-Artikel-Button wie ursprünglich angedacht. Siehe `PRINCIPLES.md` Abschnitt 5 ("Nutzerfreiheit bei Darstellungsoptionen")
   für den zugrunde liegenden Design-Grundsatz: keine geschmacklichen
   Einschränkungen für den Nutzer, aber das Einstellungs-Panel selbst
   muss immer unabhängig von den gewählten Content-Styles bedienbar
   bleiben, und ein "Zurücksetzen" muss immer funktionieren.

**Update 2026-08-26 (Meilenstein 8):** Implementiert als `LinkDisplayPanel`
in der Artikelansicht; State in `src/state/linkDisplay.ts` (session-only).

8. Inhaltsverzeichnis/Sprungmarken im Artikel

**Update 2026-08-26 (Meilenstein 9):** Vertikales Inhaltsverzeichnis links
neben dem Artikel (`TableOfContents.vue`). Einträge aus `h2`–`h6` via
`prepareArticleToc()`; Klick scrollt zur Überschrift. Die Leiste folgt dem
Seiten-Scroll (`position: sticky`) und ist bei Überlänge selbst scrollbar.

## Datenfluss

1. **Suche:** Nutzereingabe → REST-API-Suche (mit Debounce) → Live-Ergebnisliste.
2. **Artikel öffnen:** Klick auf Suchergebnis oder Wikilink → Artikel-Titel
   wird aufgelöst → Content-Request an die API.
3. **Sanitizing:** Antwort-HTML läuft **verpflichtend** durch den
   zentralen Sanitizer-Wrapper (`src/security/`, DOMPurify-basiert) —
   keine Ausnahmen, auch nicht "nur zum Testen".
4. **Rendering:** Sanitizter HTML-Content wird in der `ArticleView`-
   Komponente angezeigt, mit App-eigenem CSS überschrieben (Typografie,
   Farben, Dark/Light-Theme).
5. **Link-Interception:** Klicks auf interne Wikilinks werden abgefangen
   (kein normaler Browser-Linkaufruf), stattdessen In-App-Navigation +
   Eintrag in den eigenen Vor-/Zurück-Verlauf.

## Relevante API-Endpunkte (Ausgangspunkt für die Umsetzung)

| Zweck                                            | Endpunkt (Beispiel enwiki)                                                                                                                     |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Suche (Live-Vorschläge)                          | `GET https://{lang}.wikipedia.org/w/rest.php/v1/search/page?q={query}&limit=…`                                                                 |
| Artikel-Content (aufbereitetes HTML)             | `GET https://{lang}.wikipedia.org/api/rest_v1/page/html/{title}` (siehe `DECISIONS.md` — Wechsel von `mobile-html` wegen PCS-Kollaps-Struktur) |
| Kurzfassung/Vorschau (optional, später nützlich) | `GET https://{lang}.wikipedia.org/api/rest_v1/page/summary/{title}`                                                                            |

Bei jeder Anfrage: `Api-User-Agent`-Header setzen (siehe `PRINCIPLES.md`,
Abschnitt 7). Genaue Parameter/Response-Felder vor Umsetzung anhand der
aktuellen offiziellen Doku verifizieren (`GET .../api/rest_v1/?spec`).

## Sanitizing — Vorgaben

- Erlaubte Tags/Attribute möglichst eng fassen (Standard-Textstruktur,
  Bilder, Links, Tabellen, math/svg wo nötig für Formeln).
- `<script>`, Inline-Event-Handler (`onclick` etc.), `<iframe>` grundsätzlich entfernen.
- Interne Wikilinks (relative hrefs) werden nach dem Sanitizing auf
  In-App-Navigation umgebogen, externe Links öffnen regulär extern.

## Edge Cases (zu berücksichtigen, nicht überspringen)

- **Weiterleitungen:** API löst Redirects i.d.R. selbst auf — verifizieren, nicht annehmen.
- **Begriffsklärungsseiten:** eigene, einfache Darstellung (Liste statt normaler Artikeltext).
- **Artikel nicht gefunden:** klare Fehlermeldung statt leerer Seite/Absturz.
- **Sprachwechsel bei offenem Artikel:** Titel ist nicht 1:1 übersetzbar — ggf. Interwiki-/Langlinks-Info nutzen, sonst zurück zur Startseite der neuen Sprache.
- **Caching:** Wiederholte Anfragen auf denselben Artikel/dieselbe Suche client-seitig cachen (siehe `PRINCIPLES.md`, Abschnitt 7 — Caching-Pflicht).

## Nicht-funktionale Anforderungen

- Barrierefreiheit gemäß `PRINCIPLES.md`, Abschnitt 5 (semantisches HTML,
  Kontrast auch im Dark-Theme, Tastaturbedienbarkeit, Alt-Texte aus der
  API übernehmen).
- Bilder: Lazy Loading, um Ladezeit/Datenverbrauch gering zu halten.
- Kein echtes Offline-Caching von Artikeln im MVP — bei fehlender
  Verbindung reicht eine klare Fehlermeldung. Echtes Offline-Lesen ist
  Phase 3.

## Akzeptanzkriterien (Definition of Done)

- [ ] Suche zeigt Live-Vorschläge während der Eingabe
- [ ] Artikel wird korrekt gerendert (Text, Bilder, Infoboxen)
- [ ] Wikilinks navigieren innerhalb der App, kein Seitenneuladen
- [ ] Vor-/Zurück-Navigation funktioniert wie erwartet
- [ ] Sprachumschaltung funktioniert
- [ ] Dark/Light-Theme wirkt konsistent auch im Artikel-Content
- [ ] Sanitizing nachweislich aktiv (z.B. Test mit absichtlich
  präpariertem Script-Payload schlägt fehl/wird entfernt)
- [ ] Grundlegende Barrierefreiheits-Checks (Lighthouse/axe) bestehen
