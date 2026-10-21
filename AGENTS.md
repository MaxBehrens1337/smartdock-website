# Arbeitsregeln für SMARTDOCK

Dieses Repository gehört zur SMARTDOCK-Website. Es ist unabhängig von Campus Online.
Team: Marlene, Adrian, Sönke und Max. Fachliche Zuständigkeiten stehen noch aus.

- Vor Änderungen aktuellen Remote-Stand und offene PRs prüfen. Auf `codex/…` oder `claude/…` arbeiten und Änderungen als PR vorlegen. Max übernimmt den Merge.
- `npm ci` und `npm run check` sind der gemeinsame Einstieg. Node 24 verwenden.
- `src/` enthält Seitenhülle, Routen und ausgelöste Funktionen; `content/` die öffentlichen JSON-Inhalte; `public/` Bilder und PDFs. Diese Pfade bearbeiten.
- `vendor/website/` enthält übernommene kompilierte Pakete, keine wiedergewonnenen Originalkomponenten. Änderungen dort klein halten, begründen und mit Regression absichern. Ersatz komponentenweise nach dem [Migrationsplan](docs/migration/aufbau.md).
- `dist/` und `_site/` werden gebaut und nie eingecheckt. `package-lock.json` wird eingecheckt. Die historischen Prüf-CSV beziehen sich weiter auf den ursprünglichen Export.
- Vor Commit und PR muss `npm run check` bestehen. Bei Build-/Pfadänderungen Root und Pages im Browser prüfen. `npm run verify:reference` ist nur der historische Migrationsvergleich; gewollte spätere Inhalte dürfen davon abweichen.
- Bestehende Staging-Inhalte und DE/EN/FR/NL/ES erhalten. Italienisch ist nicht im Umfang. Fachliche Preise, Produktregeln und Rechtstexte nicht aus Vermutungen ändern.
- Ein Merge nach `staging` veröffentlicht die Vorschau. `main` veröffentlicht nicht automatisch. Produktivveröffentlichung braucht eine ausdrückliche Freigabe.
- Vorschauhinweis, noindex und fehlender echter Formularversand bleiben bis zum geplanten Backend erhalten. Keine Zugangsdaten oder Kundendaten einchecken.
- Browserbefunde von Vermutungen trennen und offene Fehler in GitHub nachhalten. Keine vollständige Freigabe aus wenigen Stichproben ableiten.

Die [Projektübersicht](docs/projektuebersicht.md) und die [Bestandsprüfung](docs/pruefung/bestandsaufnahme-2026-10-21.md) erklären Umfang und offene Aufgaben.
