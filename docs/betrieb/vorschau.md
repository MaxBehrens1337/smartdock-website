# Vorschau und übernommene Arbeitsbasis

Adresse: [SMARTDOCK auf GitHub Pages](https://thitronik.github.io/smartdock-website/).

## Nachgewiesener Stand vom 21. Oktober 2026

Die eigenständig baubare Arbeitsbasis wurde über PR #12 nach `staging` und über
PR #1 nach `main` übernommen. Die jeweiligen Commits sind dauerhafte Prüfpunkte;
neuere Veröffentlichungen stehen in den [Workflow-Läufen](https://github.com/Thitronik/smartdock-website/actions/workflows/stage-pages.yml).

| Nachweis | Stand |
|---|---|
| Staging | `ab02627a40b032ce42cc19a5e67664fa07c20d0e` |
| Main | `fbc4d9d994fa6a23247c3181dc6c2a67cd43511b` |
| Dateibaum beider Stände | `7a76d01ff70b0a82148052727f57d99bb90cfc10` |
| Veröffentlichung | [Build und Deployment erfolgreich](https://github.com/Thitronik/smartdock-website/actions/runs/39610409597) |
| Prüfung nach Main-Übernahme | [Windows und Linux erfolgreich](https://github.com/Thitronik/smartdock-website/actions/runs/39610915736) |

Nach der Veröffentlichung geprüft: drei korrigierte FAQ-Antworten, CH-FAQ mit
Query/Hash, CH-Produkt und Konfigurator, eigenständiges CH-Position-Hold und der
Übergang in den Konfigurator. Der einfache Fall Deutschland/eine Ankerwinde/kein
Einbau zeigt weiterhin ACU und 1.450,00 €. Das ist keine fachliche Preisfreigabe.
Die veröffentlichten FAQ-Daten und fünf JS-Dateien unter `assets/` stimmten
bytegenau mit dem geprüften Build überein.

Der frühere Importlauf vom 20. Oktober 2026 ist unter
[39431463725](https://github.com/Thitronik/smartdock-website/actions/runs/39431463725)
nachvollziehbar. Die Ausgangsdateien und Stichproben bleiben in der
[datierten Bestandsaufnahme](../pruefung/bestandsaufnahme-2026-10-21.md) erhalten.

## Wie veröffentlicht wird

Der [Pages-Workflow](../../.github/workflows/stage-pages.yml) baut `staging` mit
Node 24, führt `npm run check` aus und veröffentlicht ausschließlich `_site/`.
`dist/` und `_site/` sind erzeugte Ausgaben und werden nicht versioniert.
Eine manuelle Ausführung dieses Workflows baut ebenfalls `staging`.

Pull Requests führen die [CI-Prüfung](../../.github/workflows/pruefen.yml) unter
Windows und Linux aus und liefern ein Pages-Artefakt. Sie ändern die veröffentlichte
Vorschau nicht. Ein Merge nach `main` prüft den Stand erneut, veröffentlicht aber
keine Produktionsseite.

Bei einem Fehler den verursachenden Commit und Workflow-Lauf festhalten, eine
Korrektur oder gezielte Rücknahme als PR prüfen und erneut über staging veröffentlichen.
Keine fremden Commits durch einen Reset überschreiben.

## Grenzen

Vorschauhinweis und `noindex` bleiben aktiv. Kontakt und Newsletter versenden keine
Nachrichten; Konfigurationen sind lokale Browser-Testdaten. Die PDFs sind öffentlich
erreichbar; ein geschützter Downloadbereich fehlt. Produktionshosting, Backend,
Zuständigkeiten und technische Schutzregeln sind noch zu entscheiden bzw. einzurichten.
Die [Gesamtabnahme #6](https://github.com/Thitronik/smartdock-website/issues/6) bleibt offen.
