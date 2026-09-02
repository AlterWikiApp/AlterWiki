# Projekt-Briefing für neue Claude-Instanz

**Zweck:** Dies ist **kein** Ersatz für die Repo-Dokumentation
(`PRINCIPLES.md`, `AGENTS.md`, `ROADMAP.md`, `docs/features/*.md` etc.) —
die beschreiben *das Projekt*. Dieses Dokument beschreibt die
**Zusammenarbeit** zwischen dem User und mir (Claude), die sich aus der
reinen Projekt-Doku nicht erschließt.

*(Aktualisiert am 22.08.2026, basierend auf einer Vorversion vom
22.08.2026, 01:00. Änderungen: Repo ist live auf GitHub, README
existiert jetzt, Kimi hat die Hauptarbeit übernommen, Link-Bug
gelöst, neuer offener Punkt: Cross-Browser-Bug + lokale Modelle als
Thema.)*

## 1. Wichtiger erster Schritt für die neue Instanz

Ich (die vorherige Claude-Instanz) habe **keinen Live-Zugriff** auf das
GitHub-Repo ([github.com/AlterWikiApp/AlterWiki](https://github.com/AlterWikiApp/AlterWiki),
öffentlich einsehbar, aber ich kann es nicht automatisch aktuell mitverfolgen).
**Bitte den User bitten, die aktuellen Versionen von `PRINCIPLES.md`,
`AGENTS.md`, `ROADMAP.md`, `DECISIONS.md`, `PROGRESS.md`, `IDEAS.md`
und den relevanten `docs/features/*.md` hochzuladen**, bevor inhaltlich
tief eingestiegen wird. Der Stand in Abschnitt 6 ist nur eine
Momentaufnahme und mit hoher Wahrscheinlichkeit veraltet.

## 2. Rollenverteilung

- **User (Dominik):** technisch passabel, aber wenig Coding-Erfahrung.
  Zuständig für Feature-/Visual-Design, Entscheidungen, Repo-/GitHub-
  Verwaltung, reicht Prompts an Coding-Agenten weiter und bringt deren
  Output zurück.
- **Claude (diese Rolle):** Planung & Projektmanagement, Doku-Entwürfe,
  Diagnose von Bugs anhand von Logs/Screenshots, Formulierung
  *konkreter, kopierfertiger Prompts* für Coding-Agenten, kritisches
  Review von deren Output (nicht nur bestätigen), Recherche (z.B.
  Wikimedia-/F-Droid-Policies).
- **Coding-Agenten:** Windsurf (initiale Grundstruktur), **Kimi**
  (aktuell die Hauptarbeit — großzügigere Free-Tier-Limits als die
  Alternativen), Devin und Cursor (beide getestet, funktionieren
  grundsätzlich, aber engere Free-Tier-Limits). Kein Budget für
  kostenpflichtige Abos — User erwägt zusätzlich ein **lokales LLM**
  auf eigener Hardware, um Cloud-Limits zu schonen (Hardware-Details
  ggf. noch offen/nachzufragen — siehe Abschnitt 7).

## 3. Etablierter Workflow

1. Ich formuliere einen präzisen, engen Prompt für den Coding-Agenten.
2. User gibt ihn weiter, Agent arbeitet.
3. User bringt Progress-Log/Screenshots/Fehlermeldungen zurück.
4. Ich bewerte kritisch, diagnostiziere, schreibe den nächsten Prompt.

**Wichtig:** Nicht pauschal loben. Aktiv nach Doku-Drift, übersehenen
Punkten oder vorschnell abgetanen Problemen suchen. Bewährt hat sich
außerdem: bei mehreren unabhängigen Bugs die Prompts **aufteilen**
statt bündeln (siehe Abschnitt 5).

## 4. Was dem User wichtig ist

- Privatsphäre/Anonymität, Sicherheit, Barrierefreiheit, F-Droid-/AUR-
  Tauglichkeit — nicht verhandelbar, immer gegenprüfen.
- Schlanker Scope, kein Feature-Creep — lieber fertig als umfangreich
  (Editieren/Bearbeiten wurde deshalb bewusst komplett gestrichen;
  ebenso werden neue Ideen wie "lokale Profile" oder "Kuratierung" in
  `IDEAS.md` geparkt statt sofort die Roadmap zu ändern).
- Gute Doku, die auch neue Mitwirkende/Agenten ohne Rückfragen verstehen.
- Kostenlos bleiben — keine kostenpflichtigen Abos, bei Tool-Empfehlungen
  sensibel bleiben.
- Möchte Begründungen, nicht nur Anweisungen — direkte, aber
  konstruktive Kritik ist ausdrücklich erwünscht, kein reines
  Schulterklopfen.
- Deutschsprachig, freundlicher "Du"-Ton.
- Begrenzte Zeitfenster pro Session (60–90 Min. typisch) und begrenzte
  Free-Tier-Limits bei den Coding-Agenten — Prompts entsprechend eng und
  effizient formulieren, nicht mit Diskussion Zeit verschwenden, wenn
  reiner Fortschritt gefragt ist.

## 5. Gelernte Lektionen / worauf achten

- Doku kann "existieren", ohne dass ein Agent sie tatsächlich liest —
  immer prüfen, ob eine Datei in `AGENTS.md`/`PROJECT_STRUCTURE.md` als
  Pflichtlektüre gelistet ist. (War schon einmal ein reales Problem:
  `01_MVP_Plan.md` wurde nie von Agenten gelesen.)
- Browser-Unterschiede sind real relevant (Chromium verzeiht z.B.
  verbotene Header wie `User-Agent` stillschweigend, Firefox/WebKitGTK
  nicht) — bei Bugs grundsätzlich in mehreren Browsern testen lassen.
  **Aktuell offen:** App funktioniert nur in Brave zuverlässig, nicht in
  Firefox/Midori — noch nicht gefixt (siehe Abschnitt 6).
- "Das Problem hat sich von selbst gelöst" ist keine Diagnose, sondern
  ein Warnsignal — nachhaken, nicht akzeptieren.
- Bei Debugging-Aufgaben lohnt es sich oft, mehrere unabhängige Bugs in
  separate Prompts aufzuteilen, statt sie zu bündeln.
- Vor jedem Agent-/Tool-Wechsel (z.B. Devin → Kimi): explizit prüfen
  lassen, ob wirklich alles auf GitHub gepusht ist — das wurde einmal
  fast vergessen und war beim zweiten Mal auch nicht trivial
  (git-Historie-Konflikt "unrelated histories" beim ersten echten Push).
- Devin hat sich bei einer sauberen Übergabe (Doku aktualisieren, pushen,
  verifizieren) grundsätzlich gut anweisen lassen — funktioniert also
  als Muster für Tool-Wechsel.
  
  
  

## 6. Stand zum Zeitpunkt dieses Dokuments (Momentaufnahme, siehe Abschnitt 1!)

- **Repo:** [github.com/AlterWikiApp/AlterWiki](https://github.com/AlterWikiApp/AlterWiki),
  öffentlich, AGPL-3.0, ~17+ Commits, README existiert jetzt.
- **Tech-Stack:** Vue 3 + TypeScript + Vite + Tailwind CSS +
  vite-plugin-pwa, npm. PWA-first, später Tauri (Linux) + Capacitor
  (Android/F-Droid).
- **Architektur:** Kein eigenes Wikitext-Parsing — Rendering über
  Wikimedia-REST-API. **Wichtig:** Endpunkt wurde von `mobile-html` auf
  `page/html` gewechselt (mobile-html nutzt Wikimedias PCS-Kollaps-
  Struktur, die Inhalte nach der ersten Unterüberschrift versteckte —
  siehe `docs/DECISIONS.md`).
- **Phase 1 (MVP), Meilenstein-Stand:**
  - Meilenstein 1 (API-Client) fertig
  - Meilenstein 2 (Such-UI) fertig
  - Meilenstein 3 (Artikelanzeige): Inhalt wird korrekt und vollständig
    angezeigt (page/html-Fix erfolgreich verifiziert), interne
    Wikilink-Navigation funktioniert jetzt ebenfalls (von Kimi gefixt).
    **Noch offen:** App läuft nur zuverlässig in Brave, nicht in
    Firefox/Midori — Ursache vermutlich ähnlich zum früheren
    User-Agent-Header-Bug (verbotene/nicht standardkonforme
    Header-Behandlung), aber noch nicht diagnostiziert.
- **Editieren/Bearbeiten** wurde komplett aus der Roadmap gestrichen,
  siehe `docs/DECISIONS.md`. Höchstens ein simpler Link zur echten
  Wikipedia-Edit-Seite ist noch angedacht.
- **Neue Doku-Dateien seit letzter Version:** `README.md`,
  `docs/IDEAS.md` (Sammelstelle für spätere Ideen wie lokale Profile
  und bewusst kleine Kuratierung).
  
  
  
  ### 6.1 Stand — Ergänzungen seit dem 22.08.
  
  **Meilenstein 4 (Interne Navigation):** Vollständig abgeschlossen (Session 3, Kimi). `watch()` auf `route.params.title` in `ArticleView.vue` sorgt dafür, dass bei internen Wikilink-Klicks sowohl Überschrift als auch Body-Content neu geladen werden. Scroll-to-top nach Navigation implementiert.
  
  **Meilenstein 5 (Sprachauswahl):** Grundsätzlich abgeschlossen (Session 4–6, Kimi + User).
  - `src/state/language.ts`: Zentraler reaktiver State mit `localStorage`-Persistenz, 10 Sprachen (en, de, fr, es, it, pt, ru, ja, zh, ar)
  
  - `src/components/LanguageSelector.vue`: Barrierefreies Dropdown, Dark Mode Support
  
  - `src/api/wikipediaClient.ts`: Nutzt `currentLanguage.value` statt hardcoded `'en'`
  
  - Sprachauswahl auf Such- **und** Artikelseite verfügbar
  
  - Suche funktioniert in allen 10 Sprachen
  
  - **Bekanntes Problem (in Arbeit):** 404-Fehler bei nicht-existierendem Artikel in Zielsprache. `NOT_FOUND_MESSAGES`-Dictionary existiert, aber `wikipediaClient.ts` wirft HTTP-404 noch nicht als sauberen Error. `watch(currentLanguage)` in `ArticleView.vue` wurde korrekt platziert (außerhalb von `loadArticle`).
  
  **UI-Polish:**
  
  - "No results found"-Box auf Startseite entfernt — erscheint nur noch nach tatsächlicher Suche ohne Ergebnisse (`results !== null` statt `[]`)
  
  **Cross-Browser-Bug (Firefox/Midori):** Custom `User-Agent` und `Api-User-Agent` Header aus `fetchWithHeaders` entfernt. Wikimedia-Policy erlaubt Browser-Clients ohne Custom-UA. Noch nicht final in Firefox/Midori verifiziert.

## 7. Offene Nebenthemen

- User möchte prüfen, ob ein **lokales LLM** auf eigener Hardware
  sinnvoll als Ergänzung zu Cloud-Coding-Agenten läuft (v.a. um
  Free-Tier-Limits zu schonen). Aktuelles System (Laptop, i3-8130U,
  keine dedizierte GPU) ist dafür ungeeignet. Ein potenzieller
  Zweit-PC mit RTX 2060 Super (8 GB VRAM) wäre brauchbar für 7B-Modelle
  — aber die restlichen Specs dieses PCs (u.a. angegebene CPU "i5-750"
  
  + DDR4-RAM) sind widersprüchlich/unplausibel (Sockel-1156-CPUs
    unterstützen kein DDR4) und noch nicht verifiziert. **Bei Bedarf beim
    User nachfragen, ob die Specs inzwischen geklärt/verifiziert wurden.**

- **Geplanter Umstieg auf Cline/Roo Code + Kimi-API — ab Anfang des
  Monats, sobald Budget (10–20 €/Monat) verfügbar ist.** Hintergrund:
  Kimi wird aktuell nur über den kostenlosen Web-Chat genutzt (kein
  Dateizugriff — User muss Codeänderungen manuell copy-pasten, was
  fehleranfällig ist). Mit einem Kimi-API-Key + Cline (kostenlose
  VS-Code-Erweiterung) bekäme Kimi echten Dateizugriff wie ein "echter"
  Agent. Geschätzte Kosten grob 3–8 €/Monat bei bisherigem
  Nutzungstempo — Budget sollte reichen. **Vor dem Umstieg unbedingt:**
  Spending Cap im Kimi-Platform-Dashboard setzen (verhindert
  unbeabsichtigt hohen Verbrauch durch autonome Agent-Loops). Erste
  Woche als Testphase behandeln, tatsächlichen Verbrauch beobachten.
  **Falls diese Konversation den Monatswechsel erreicht: aktiv
  nachfragen, ob der Umstieg schon ansteht/gewünscht ist**, statt
  darauf zu warten, dass der User von selbst darauf zurückkommt.



### 7.1 Offene Nebenthemen — Ergänzungen

- **Kimi-API + Cline/Roo Code Umstieg:** Noch nicht umgesetzt. User arbeitet aktuell mit manuellem Copy-Paste aus Kimi-Web-Chat. Umstieg auf API-Key + Cline steht weiterhin auf der Agenda sobald Budget verfügbar (Anfang des Monats). **Wichtig:** Spending Cap setzen, erste Woche als Testphase.



## 8. Nächste Schritte (Stand jetzt)

1. **404-Handling final fixen:** `wikipediaClient.ts` muss `response.ok` bzw. `response.status === 404` prüfen und sauberen Error werfen, damit `ArticleView.vue` die übersetzte `NOT_FOUND_MESSAGES`-Meldung anzeigt.

. **Cross-Browser-Verifikation:** In Firefox und Midori testen, ob das Entfernen der Custom Headers das Problem gelöst hat.

. **Doku & Commit:** `PROGRESS.md` aktualisieren (Session 6 abschließen), alle Änderungen auf GitHub pushen.

. **Meilenstein 6 (PWA-Grundgerüst):** `vite-plugin-pwa` einrichten, Manifest, Service Worker, installierbar machen.
