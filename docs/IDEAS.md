# Ideen & Constraints für spätere Phasen

**Zweck:** Sammelstelle für Einfälle, die weder sofort umgesetzt noch
vergessen werden sollen. Unverbindlich — wird erst relevant, wenn die
jeweilige Phase ansteht. Kein Roadmap-Ersatz.

## Lokale Profile

- Nutzer könnten lokal mehrere Profile anlegen (unterschiedliche
  Startseiten-Konfigurationen, Sammlungen etc.).
- Denkbar: App liefert vorgefertigte Profile mit ("Vorlagen"), die
  Nutzer übernehmen/anpassen können.
- Betrifft Phase 3 (Custom Startseite/Personalisierung).
- Für MVP bereits leicht berücksichtigt (siehe `DECISIONS.md`): lokale
  Storage-Keys sind von Anfang an so benannt, als gäbe es ein
  "Default-Profil" (z.B. `profile:default:theme`), um späteren Umbau zu
  vermeiden — ohne dass dafür jetzt schon eine Profil-Funktion gebaut
  wird.

## Kuratierte Inhalte bewusst klein halten

- Bewusste Entscheidung: **keine** aufwändige Kuratierungs-Engine früh
  bauen.
- Für Phase 2 reicht vorerst: eine sinnvolle Standard-Startseite (Default)
  plus ein paar wenige vorgefertigte Vorlagen — kein umfangreiches
  Kurations-/Redaktionssystem.
- Grund: Umfang/Aufwand einer "echten" Kuratierung würde den Fokus vom
  Kern der App wegziehen (ähnlich wie beim Editieren-Feature).
- Bei Bedarf vor Phase 2 nochmal bewusst neu bewerten, statt es
  automatisch größer werden zu lassen.
