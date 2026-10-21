# SMARTDOCK: Zusammenarbeit und Veröffentlichung

Ziele, Bestand, offene Entscheidungen und erste Arbeitspakete stehen zentral in der
[Projektübersicht](docs/projektuebersicht.md).

## Arbeitsweise

- main enthält freigegebene Stände. Ein Merge nach main veröffentlicht derzeit nichts automatisch.
- staging trägt die gemeinsame GitHub-Pages-Vorschau. Ein Merge nach staging löst deren Veröffentlichung aus.
- Änderungen erfolgen in eigenen Branches und werden per Pull Request geprüft.
  Neue Änderungen setzen auf dem dafür relevanten aktuellen Stand auf; die vorhandene Website liegt auf staging.
- Vor parallelen Änderungen aktuellen Stand prüfen und fremde Änderungen erhalten.
- Vor jeder Live-Veröffentlichung muss der genaue Quellstand auf GitHub gespeichert sein.
- Zuerst die Vorschau prüfen; die Live-Veröffentlichung erfolgt erst nach ausdrücklicher Freigabe.
- Keine Passwörter, Tokens, Kundendaten oder Datenbankexporte einchecken.

## Ausgangsstand

Die 186 Website-Dateien des SMARTDOCK-Nachbaus Version 7 wurden auf staging importiert.
Der neue [Aufbau](docs/migration/aufbau.md) erzeugt diese Dateien aus getrennten Quellen.
Ursprünglicher Sites-Commit:
dfc2867dbbf38c536b01fe62d02bfe4dc62f6104.

Der importierte Stand ist ein Website-Export, kein ursprünglicher unkompilierter
Hostinger-Projektexport. Da die ursprünglichen Quellen nicht zugänglich sind, ersetzt
ein eigener Build die fehlende Bauanleitung. Die kompilierten Anwendungspakete werden schrittweise abgelöst.

Die [GitHub-Pages-Vorschau](https://thitronik.github.io/smartdock-website/) ist eingerichtet.
Historische Prüfergebnisse stehen in [PAGES-STATUS.md](PAGES-STATUS.md).

## Noch einzurichten oder zu entscheiden

- Teamzugriffe und Zuständigkeiten für Prüfung und Veröffentlichung erfassen.
- Branchschutz und Aufgabenboard einrichten; die Build-Prüfung läuft bereits für PRs unter Windows und Linux.
- Gemeinsame Arbeitsregeln in [AGENTS.md](AGENTS.md) pflegen; `npm run check` vor Commit und PR ausführen.
- Die übernommenen Programmpakete schrittweise durch lesbare Komponenten ersetzen.
- CMS-Bedarf, Backend, Versand und Produktionshosting anhand der Projektanforderungen entscheiden.
- Mit der gewählten Lösung Test- und Produktivbetrieb trennen und einen dokumentierten Rückweg vorsehen.

Hetzner war in früheren Planungsnotizen vorgesehen. Die Hosting-Entscheidung ist noch offen;
es besteht keine automatische Hetzner-Veröffentlichung.

Kontakt und Newsletter versenden in der aktuellen Vorschau keine Nachrichten.
Konfigurationen bleiben Browser-Testdaten, bis der produktive Ablauf implementiert und geprüft ist.
