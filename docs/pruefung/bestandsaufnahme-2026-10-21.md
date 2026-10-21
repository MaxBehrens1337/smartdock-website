# SMARTDOCK: Bestandsaufnahme und Weg zu main

Stand: 21. Oktober 2026. Grundlage ist [staging d74e084](https://github.com/Thitronik/smartdock-website/commit/d74e08402bc2c4d480296ec1e494c0f25ded2eaf).
Dies ist eine datierte Bestandsaufnahme. Die Bestandszahlen und CSV-Dateien beziehen sich weiterhin auf den ursprünglichen Export. Der neue [Build und Migrationsplan](../migration/aufbau.md) führt die vorbereiteten PRs zusammen; Quellenlinks unten verweisen auf die neuen Ablageorte.

Team: **Marlene, Adrian, Sönke und Max**. Zuständigkeiten und GitHub-Benutzernamen werden noch zugeordnet.

Aufgaben: [Gesamtabnahme #6](https://github.com/Thitronik/smartdock-website/issues/6),
[FAQ #3](https://github.com/Thitronik/smartdock-website/issues/3),
[Konfigurator #5](https://github.com/Thitronik/smartdock-website/issues/5).
Die [Projektgrundlage #2](https://github.com/Thitronik/smartdock-website/pull/2) bleibt der zentrale Einstieg für Ziele und Entscheidungen.

## Prüfstand

- Der vollständige Git-Dateibaum wurde erfasst: 190 Dateien, davon 186 unter dist/.
- Alle 116 HTML-Einstiegspfade sind einzeln verzeichnet und im Browser direkt geöffnet worden (79 Hauptpfade, 37 zusätzliche Einstiege). Geprüft wurden erster Seitenaufbau, Zieladresse, sichtbare Überschriften und Titel; das ist keine vollständige Inhalts- oder Interaktionsabnahme.
- 13 fehlerhafte CH-Weiterleitungen sind in #8 erfasst und in PR #10 korrigiert; 60/60 Regressionfälle bestehen lokal und in GitHub Actions. Die veröffentlichte Vorschau enthält die Korrektur noch nicht.
- Sprachrückfälle und Seitentitel sind in #9 erfasst; ein PDF-Beschriftungsfehler ist in #11 nachgestellt.
- Alle 14 vorhandenen PDFs antworten mit HTTP 200 und PDF-Inhaltstyp; die zehn verknüpften Dateien aus den elf Anleitungsdatensätzen existieren. Inhaltliche Aktualität ist damit nicht bestätigt.
- Die fünf JSON-Datensätze wurden gelesen; die FAQ enthalten 11 Einträge mit Frage und Antwort in allen fünf Sprachen.
- Der Hauptkonfigurator wurde mit acht Preisfällen und einem PDF-Abgleich im Browser geprüft; ein Einstieg über Position Hold und ein Sprachwechsel DE → EN sind enthalten.
- Es erfolgte keine vollständige Browser-, Mobil-, Barrierefreiheits-, Rechts- oder Inhaltsabnahme aller Seiten.
- Formulare wurden nicht abgesendet. Es wurden keine personenbezogenen Testdaten eingegeben.

## Vollständiger Dateibestand

[Dateibestand als CSV](dateibestand-2026-10-21.csv): Pfad, Dateityp, Größe, Blob-SHA und Quell-Commit für alle 190 Dateien des Ausgangsstands.

| Website-Dateien | Anzahl |
|---|---:|
| HTML | 116 |
| JavaScript | 6 |
| CSS | 2 |
| JSON | 5 |
| PNG | 28 |
| JPG | 15 |
| PDF | 14 |
| Summe unter dist/ | 186 |

Die vier übrigen Dateien sind README.md, TEAM-WORKFLOW.md, PAGES-STATUS.md und der Pages-Workflow.
Dieser Snapshot enthält absichtlich den Ausgangsstand vor den neuen Dokumentations- und FAQ-PRs.

## Seiten und Sprachfassungen

[Alle 116 HTML-Pfade als CSV](seitenpfade-2026-10-21.csv) enthalten die abgeleitete Staging-Adresse und einen ausdrücklichen Browser-Prüfstatus.
79 Dateien entsprechen Hauptpfaden; 37 sind zusätzliche Einstiege bzw. Alias-Pfade.
116 HTML-Dateien sind daher nicht 116 unterschiedliche Inhalte.

Die folgenden 16 Seitenfamilien werden übernommen. Pfade sind ohne den GitHub-Pages-Präfix
/smartdock-website angegeben. Quelle: Routentabelle Uf im Hauptbündel; Position Hold besitzt eigene HTML-Einstiege.

| Seitenfamilie | DE | EN | FR | NL | ES |
|---|---|---|---|---|---|
| Startseite | `/` | `/en` | `/fr` | `/nl` | `/es` |
| Produkt | `/produkt` | `/en/product` | `/fr/produit` | `/nl/product` | `/es/producto` |
| Funktionen | `/funktionen` | `/en/features` | `/fr/fonctions` | `/nl/functies` | `/es/funciones` |
| Weitere/ältere Funktionsseite | `/features` | `/en/features-legacy` | `/fr/fonctionnalites` | `/nl/functionaliteiten` | `/es/funciones-legado` |
| Einbau | `/installation` | `/en/installation` | `/fr/installation` | `/nl/installatie` | `/es/instalacion` |
| FAQ | `/faq` | `/en/faq` | `/fr/faq` | `/nl/faq` | `/es/faq` |
| Konfigurator | `/konfigurator` | `/en/smartdock-configurator` | `/fr/configurateur` | `/nl/configurator` | `/es/configurador` |
| Händlersuche | `/haendlerfinder` | `/en/find-retailer` | `/fr/revendeurs` | `/nl/dealers` | `/es/distribuidores` |
| Datenschutz | `/datenschutz` | `/en/privacy` | `/fr/confidentialite` | `/nl/privacy` | `/es/privacidad` |
| Impressum | `/impressum` | `/en/imprint` | `/fr/mentions-legales` | `/nl/colofon` | `/es/aviso-legal` |
| AGB | `/agb` | `/en/terms` | `/fr/cgv` | `/nl/algemene-voorwaarden` | `/es/terminos` |
| Barrierefreiheit | `/barrierefreiheit` | `/en/accessibility` | `/fr/accessibilite` | `/nl/toegankelijkheid` | `/es/accesibilidad` |
| Widerruf | `/widerrufsbelehrung` | `/en/right-of-withdrawal` | `/fr/droit-de-retractation` | `/nl/herroepingsrecht` | `/es/desistimiento` |
| Versand | `/versandbedingungen` | `/en/shipping` | `/fr/livraison` | `/nl/verzending` | `/es/envios` |
| Kontakt / Startseitenformular | `/#kontakt` | `/en/contact` | `/fr/contact` | `/nl/contact` | `/es/contacto` |
| Position Hold | `/positionhold` | `/en/positionhold` | `/fr/positionhold` | `/nl/positionhold` | `/es/positionhold` |

Besonderheiten:

- Kontakt verwendet in Deutsch einen Abschnitt der Startseite. Auch die anderen Kontakt-Routen verwenden die Startseitenkomponente; das genaue Scroll- und Formularverhalten bleibt zu prüfen.
- /ch/, /fr-fr/, ältere englische Rechtsseiten und zusätzliche englische Routen sind im Bestand erfasst.
  Die Browseraufrufe belegen clientseitige Navigation, keine serverseitigen HTTP-Weiterleitungen. 13 CH-Unterseiten mit abschließendem Schrägstrich landen fälschlich auf der Startseite (#8). Die 14 fr-fr-Einstiege führen zu den französischen Zielen; /en/functions/ und /en/dealer-finder/ ebenfalls zu den vorgesehenen aktuellen Zielen.
- Position Hold wird separat ausgeliefert. Der geprüfte Kopf-Button zum Konfigurator führt zurück in den Hauptkonfigurator.
- Italienisch ist keine Ziel-Sprache. Italien als Auslieferungsland im Konfigurator ist davon unabhängig.

## Inhalte, Dateien und Dienste

| Bestandteil | Vorhandene Quelle | Status / Abnahme |
|---|---|---|
| FAQ | [faqs.json](../../content/faqs.json), 11 Einträge | Sechs Schreibfehler sind in PR #4 korrigiert; fachliche Aussagen und Übersetzungen bleiben separat zu prüfen. |
| Übersetzungen | [translation_DE.json](../../content/translation_DE.json), 656 Datensätze; [translation_EN.json](../../content/translation_EN.json), 279 Datensätze; weitere Texte in JavaScript | Datensatzanzahl ist kein Maß für Vollständigkeit. Deutsche Newsletter-Texte auf NL/ES und unvollständige Seitentitel bestätigt (#9); ältere Features-Seiten zeigen englischen Hauptinhalt. |
| Händler | [dealers.json](../../content/dealers.json), 9 Datensätze | Adressen, Auswahl, Karte und Ansprechpartner fachlich prüfen. |
| Anleitungen | [anleitungen.json](../../content/anleitungen.json), 11 Datensätze | Zehn verknüpfte Dateien vorhanden und erreichbar. Titel, Sprache, Aktualität und gewünschte Zugriffsart jeder Anleitung fachlich prüfen. |
| Bilder und PDFs | Dateibestand CSV: 43 Bilddateien und 14 PDFs | Alle 14 PDFs erreichbar; vorhandene Dateien tragen PDF-Kennung. Herkunft, Rechte, Aktualität, Darstellung und Einordnung öffentlich/geschützt offen. |
| Modulzuordnung | [module-allocation.js](../../src/module-allocation.js) plus gebündelter Code | Aktuelle Regeln und ältere Kopie in positionhold.js fachlich abgleichen. |
| Preise und Rabatte | Hauptbündel und positionhold.js | [Prüftabelle](konfigurator-prueftabelle.md); beobachtete Werte sind keine freigegebene Preisliste. |
| Kontakt und Newsletter | Frontend plus [preview.js](../../src/preview.js) | Vorschaumodus; Versand und Backend fehlen als betriebsfähiger Ablauf. |
| Konfigurationsanfragen | Frontend plus preview.js | Browser-Testdaten; Übermittlung an ein produktives Backend noch offen. |
| Anmeldung / private Downloads | Im geprüften Repository nicht funktionsfähig nachgewiesen | Zusätzlicher Zielumfang, noch umzusetzen. PDFs im aktuellen Repository sind öffentlich. |
| Alte API-Anbindung | PocketBase-Client und /hcgi/platform im Export | Serverimplementierung nicht enthalten; vorhandene Konten oder Dienste wurden nicht geprüft. |
| Newsletter / Versand | Brevo als Arbeitsannahme | Im geprüften Code keine Anbindung nachgewiesen. |
| Authentifizierung / Storage | Supabase als Kandidat | Im geprüften Code keine Anbindung nachgewiesen. |
| Externe Ressourcen | Google Fonts in CSS; OpenStreetMap-Kacheln in Händlersuche; player.vimeo.com-Videoeinbettungen auf der Startseite im Browser beobachtet | Netzwerk- und Datenschutzprüfung anhand der tatsächlich geladenen Ressourcen noch offen. |
| Analytics / Einwilligungen | Vorhandene Einwilligungsoberfläche; Analytics-Lader im Vorschaucode deaktiviert | Keine vollständige Prüfung aller Laufzeit-Anfragen erfolgt. |
| Veröffentlichung | [stage-pages.yml](../../.github/workflows/stage-pages.yml) | staging wird auf GitHub Pages veröffentlicht. Keine automatische Produktivveröffentlichung aus main. |

## Abnahmeliste für die übrige Website

Jede Aufgabe braucht eine verantwortliche Person, einen Beleg und ein überprüfbares Ergebnis.
Neue Befunde bekommen eigene Issues; die Liste hier bleibt der Überblick.

- [x] Alle 116 Hauptpfade und zusätzlichen Einstiege direkt im Browser öffnen; ersten Seitenaufbau und Weiterleitungsziele erfassen. Befunde: #8 und #9.
- [ ] Richtige Inhalte und Sprache vollständig abnehmen; direkte Aufrufe mit sämtlichen Navigationswegen vergleichen.
- [ ] Kopf, Fuß, Kontaktanker, App-Links, interne Links und Weiterleitungen prüfen.
- [ ] Inhalte in DE, EN, FR, NL und ES auf fehlende Texte, Rückfälle, Schreibweise und Konsistenz prüfen.
- [ ] Mobile Bedienung, Tastaturbedienung, Fokus, Formularbeschriftungen und Fehlermeldungen prüfen.
- [ ] Händlersuche, Karten, Filter und Händlerauswahl prüfen.
- [ ] Anleitungen und alle PDF-Ziele öffnen; Aktualität, Sprache und gewünschte Zugriffsart bestätigen.
- [ ] Produktangaben, Kompatibilitäten und Sicherheitsversprechen durch Fachverantwortliche prüfen lassen.
- [ ] Impressum, Datenschutz und weitere Rechtstexte an bestätigten Unternehmensangaben und tatsächlichen Diensten prüfen.
- [ ] SEO-Metadaten, Canonical, Sprachverknüpfungen, Sitemap, Robots und URL-Übergänge für den künftigen Produktivbetrieb planen und prüfen.
- [ ] Formularversand, Einwilligungen, Spam-Schutz, Fehlerfälle und Backend später gegen die beschlossene Testumgebung prüfen.

## Was eine brauchbare Arbeitsbasis auf main bedeutet

Ein gemeinsam geprüfter Arbeitsstand darf bekannte Einschränkungen enthalten, wenn sie sichtbar
dokumentiert und als Aufgaben erfasst sind. Er ist damit noch keine Freigabe für einen Produktivbetrieb.

Vorgesehene Reihenfolge:

1. Gemeinsamen Aufbau einschließlich Projektgrundlage/Banner, FAQ-Korrekturen, Prüfbericht und Weiterleitungsfix prüfen.
2. Freigegebenen Stand nach staging übernehmen und die aktualisierte Vorschau nachprüfen.
3. Den dadurch entstandenen exakten Staging-Commit im bestehenden Import-PR #1 nach main prüfen und freigeben.
4. Übernommene Programmpakete schrittweise ersetzen; Backend, CMS-Bedarf und Hosting auf dieser Grundlage entscheiden.

Das ursprüngliche Quellprojekt ist nicht zugänglich. Der eigene Build ersetzt die fehlende Bauanleitung; die vollständige Wiederherstellung lesbarer Anwendungskomponenten ist damit noch nicht abgeschlossen.

Gemeinsame Arbeitsregeln stehen in AGENTS.md; Branchschutz bleibt noch einzurichten.
PR #10 ergänzt die erste automatische Syntax- und Weiterleitungsprüfung; der Lauf auf seinem
Commit fe9fcfa ist erfolgreich (GitHub-Actions-Lauf 39596425055).
Konto- und Schutzregeln sind durch diesen Bericht nicht eingerichtet.
