# SMARTDOCK Stage

GitHub-Pages-Vorschau: https://thitronik.github.io/smartdock-website/

Die 186 Website-Dateien aus Version 7 werden im neuen Aufbau nach `dist/` erzeugt.
Die Pages-Version mit Präfix und `.nojekyll` wird nach `_site/` gebaut.
Quellen und Prüfungen stehen im [Migrationsplan](docs/migration/aufbau.md).
Dieser Aufbau ist zunächst ein PR-Stand; die veröffentlichte Stage ändert sich erst nach Merge.

Am 20. Oktober 2026 erfolgreich geprüft: Import-Prüfsumme, Pages-Build, JavaScript-Syntax, Datenpfade unter dem GitHub-Projektpfad, Startseite, Konfigurator, Position Hold und Rückweg zum Konfigurator. Der Workflow-Lauf 39431463725 wurde erfolgreich veröffentlicht.

Änderungen auf `staging` lösen die Pages-Veröffentlichung aus. Die Umgebung `github-pages` erlaubt gezielt `main` und `staging`. Hetzner wird nicht automatisch aktualisiert.

Newsletter und Kontakt versenden weiterhin keine Nachrichten; Konfigurationen sind lokale Browser-Testdaten. Team-Einladungen und Branchschutz sind noch offen.
