# SMARTDOCK: Projektübersicht

Stand: 21. Oktober 2026. Status: Projektgrundlage und eigenständig baubarer Übergangsstand zur gemeinsamen Prüfung.

**Aktueller Aufbau:** Die Originalquellen sind laut Max nicht verfügbar. Der eigene [Build und Migrationsplan](migration/aufbau.md) ersetzt diese Abhängigkeit. Die folgende Bestandstabelle beschreibt weiterhin den datierten Ausgangsstand.

## Ziel und verbindlicher Umfang

Wir entwickeln die SMARTDOCK-Website gemeinsam über dieses Repository weiter.
GitHub ist der zentrale Ort für Quellcode, Aufgaben, Prüfungen und nachvollziehbare Entscheidungen.
Zum Team gehören **Marlene, Adrian, Sönke und Max**: insgesamt vier Personen.
Fachliche Zuständigkeiten und GitHub-Benutzernamen werden gemeinsam zugeordnet.

Die vollständige bestehende [Staging-Vorschau](https://thitronik.github.io/smartdock-website/)
ist unsere fachliche und gestalterische Ausgangsbasis. Alle dort vorhandenen Seiten,
Inhalte und Funktionen werden erfasst und bei der Weiterentwicklung berücksichtigt.
Kleine Arbeitspakete dienen der sicheren Umsetzung; sie verkleinern den Gesamtumfang nicht.
Bekannte oder vermutete Fehler werden geprüft und korrigiert, nicht ungeprüft übernommen.

Die Zielsprachen sind **Deutsch, Englisch, Französisch, Spanisch und Niederländisch**.
Italienisch gehört nicht zum Umfang.

Zusätzlich zum vorhandenen Staging-Stand gehört ein geschützter Bereich für Unterlagen
und Downloads zum beschriebenen Ziel. Seine Zugangsregeln und technische Umsetzung sind offen.

## Was bereits vorhanden ist

Die Befunde beziehen sich auf den geprüften
[Staging-Commit d74e084](https://github.com/Thitronik/smartdock-website/commit/d74e08402bc2c4d480296ec1e494c0f25ded2eaf).
Sie beschreiben den Repository-Stand, nicht sämtliche Konten oder die bisherige Live-Infrastruktur.
„Vorhanden“ bedeutet nicht „fachlich freigegeben“ oder „produktionsbereit“.

| Bereich | Belegter Stand | Nächster Prüfpunkt |
|---|---|---|
| Website und Gestaltung | 186 Website-Dateien in [dist/](https://github.com/Thitronik/smartdock-website/tree/d74e08402bc2c4d480296ec1e494c0f25ded2eaf/dist/): HTML, CSS, JavaScript, Bilder und PDFs. Ausgangspunkt ist der SMARTDOCK-Nachbau Version 7. | Vollständiges Seiten-, Funktions- und Medienverzeichnis als Abnahmeliste anlegen. |
| Seiten und Funktionen | Produktinformationen, Funktionen, Einbau, FAQ, Händlersuche, Konfigurator, Position Hold, Downloads, Kontakt und Rechtstexte sind im Export vorhanden. | Jeden Ablauf einschließlich mobiler Darstellung, Fehlermeldungen und Sprachwechsel erfassen. |
| Sprachen | DE, EN, FR, ES und NL sind angelegt. Inhalte liegen teils in JavaScript, teils in [JSON-Dateien](../content/). | Tatsächlich verwendete Texte, Navigation, Metadaten und URLs je Sprache prüfen. Vorhandene Sprachfassungen sind noch kein Vollständigkeitsnachweis. |
| Inhalte und Medien | Texte, Bilder, PDFs sowie Daten für FAQ, Händler und Anleitungen liegen vor. | Aktualität, Nutzungsrechte, Herkunft und fachliche Zuständigkeiten dokumentieren. |
| Konfigurator | Auswahl, Modulzuordnung, Preise, Berechnungen und PDF-Ausgabe sind enthalten. [module-allocation.js](../src/module-allocation.js) enthält einen Teil der Regeln; weitere Logik liegt in den JavaScript-Bündeln. | Regeln und Preise fachlich bestätigen, gemeinsame Datenquelle festlegen und erwartete Ergebnisse als Prüffälle erfassen. |
| Kontakt und Newsletter | Oberflächen vorhanden. [preview.js](../src/preview.js) verhindert den regulären Versand in der Vorschau. Konfigurationen bleiben dort Browser-Testdaten. | Empfänger, Zustellung, Einwilligungen, Spam-Schutz und Fehlerbehandlung festlegen. |
| Backend | Der Export enthält einen PocketBase-Client und Zugriffe auf die bisherige Schnittstelle unter /hcgi/platform. Eine betreibbare Serverimplementierung ist im Repository nicht enthalten. | Bestehende Dienste erfassen und benötigte Serverfunktionen aus den Nutzerabläufen ableiten. |
| Anmeldung und Downloads | PDFs sind im Repository und über die statische Vorschau öffentlich erreichbar. Eine funktionsfähige Anmeldung mit serverseitigem Downloadschutz wurde nicht gefunden. | Öffentliche und geschützte Unterlagen unterscheiden; Vergabe und Entzug von Zugängen definieren. |
| CMS | Ein eingerichtetes redaktionelles CMS ist im Repository nicht nachgewiesen. | Typische Inhalts- und Übersetzungsänderungen mit dem Team durchspielen und den Bedarf daran bewerten. |
| Hosting | Die Vorschau wird über [GitHub Actions](../.github/workflows/stage-pages.yml) auf GitHub Pages veröffentlicht. Eine automatische Veröffentlichung auf Hetzner ist nicht eingerichtet. | Produktionshosting, Domainverwaltung, E-Mail-Dienste, Kosten und Betriebsverantwortung erfassen und bewerten. |
| Rechtstexte | Impressum, Datenschutz und weitere Rechtstext-Seiten sind enthalten. Ihre inhaltliche Richtigkeit wurde nicht bestätigt. | Unternehmensangaben und tatsächliche Datenverarbeitung prüfen; fachliche Freigabe organisieren. |
| Bearbeitbarer Quellcode | Der Export enthält bereits gebündelten React-Code. Ein vollständiges Quellprojekt mit package.json, ursprünglichen Komponenten und reproduzierbarem Anwendungsbau fehlt im geprüften Stand. | Eigener Build und Quellstruktur sind umgesetzt; übernommene kompilierte Pakete schrittweise durch lesbare Komponenten ersetzen. |
| GitHub und Qualität | main enthält bisher nur die README. staging trägt die Vorschau. Der Pages-Workflow prüft JavaScript-Syntax; eine umfassende PR-Prüfung fehlt. Branchschutz ist noch nicht eingerichtet. | Kleine PRs, Verantwortliche, Prüfungen und Schutzregeln vorbereiten. Das bewusst kleine main ist kein Fehler. |

Die vorhandenen Statusberichte stehen in [PAGES-STATUS.md](../PAGES-STATUS.md).
Dort dokumentierte frühere Prüfungen sind keine neue vollständige Abnahme.
Bisherige Experimente in anderen Repositories gehören erst nach ausdrücklicher Auswahl zur Quelle dieses Projekts.

## Arbeitsannahmen und offene Entscheidungen

Astro, Netlify, Hostinger, Hetzner, Supabase und Brevo sind **keine gemeinsam beschlossene Gesamtarchitektur**.
Frühere Vorschläge und Anbieter-Erwähnungen werden als Ausgangspunkte untersucht.
Auch ein CMS ist weder beschlossen noch ausgeschlossen.

Aus dem ursprünglichen Briefing stammen folgende zu prüfende Arbeitsannahmen:

- Inhalte und Übersetzungen könnten zunächst als Dateien mit GitHub-Freigabe gepflegt werden.
- Produktdaten, Kompatibilitäten und Preise sollen versioniert und fachlich freigegeben sein.
  Eine automatische Warenwirtschaftsanbindung ist bisher nicht eingeplant.
- Supabase ist als Kandidat für Anmeldung und private Downloads im Gespräch.
- Brevo ist für Newsletter und Anfragen vorgesehen, im geprüften Repository aber nicht angebunden.
- Die Domain soll nach bisheriger Annahme bei Hostinger bleiben; die tatsächliche Kontosituation ist noch zu erfassen.

Codex bereitet die technischen Entscheidungsvorlagen vor. Das Team erhält jeweils eine
begründete Empfehlung mit Alternativen, laufenden Kosten, Wartungsaufwand, Risiken
und einem überprüfbaren Nachweis. Es muss keine Anbieterauswahl ohne diese Vorarbeit treffen.

| ID | Entscheidung | Benötigte Grundlage / Ergebnis | Status |
|---|---|---|---|
| E01 | Wie kommen wir zu wartbarem Quellcode? | Eigener reproduzierbarer Build um den Export, danach schrittweiser Komponenten-Ersatz; siehe [Migrationsplan](migration/aufbau.md). | Workaround von Max beauftragt; Build zur Prüfung umgesetzt, Komponenten-Ersatz offen |
| E02 | Brauchen wir ein CMS? | Bearbeitung einer typischen Seite und FAQ in fünf Sprachen durchspielen: Entwurf, Bilder, Vorschau, Prüfung, Veröffentlichung und Rücknahme. Danach Pflege über GitHub und CMS vergleichen. | Offen |
| E03 | Welches Backend benötigen wir? | Abläufe für Anfragen, Konfigurationen, Anmeldung und private Downloads; Daten, Rechte, Aufbewahrung und Wiederherstellung bestimmen. Danach eine Lösung empfehlen. | Offen |
| E04 | Wie funktionieren Newsletter und Anfragen? | Newsletter-Anmeldung und einzelne Beratungsanfragen getrennt beschreiben; Empfänger, Versand, Einwilligungen, Fehlerfälle und vorhandene E-Mail-Konten erfassen. | Offen |
| E05 | Wo betreiben wir Website und Dienste? | Anforderungen aus E01–E04; vorhandene Verträge; Vorschauen, Zugangsschutz, Teamkosten, Betriebsaufwand und Rückweg bei Fehlern vergleichen. | Offen |
| E06 | Wer prüft und veröffentlicht Änderungen? | Zuständigkeiten für technische Prüfung, Produktregeln, Preise, Übersetzungen, Rechtstexte und Veröffentlichung gemeinsam benennen. | Offen |
| E07 | Welche Inhalte sind öffentlich oder geschützt? | Dokumente klassifizieren; Zugangserteilung und Entzug festlegen; tatsächliche Dienste und Datenflüsse für die Datenschutzprüfung auflisten. | Offen |

Entscheidungen werden mit Datum, Empfehlung, Begründung und Freigabe im Repository dokumentiert.
Zugangsdaten, Vertragsdetails mit vertraulichen Angaben und personenbezogene Daten gehören
nicht in dieses öffentliche Repository; hier stehen nur geeignete Zusammenfassungen und Zuständigkeiten.

## GitHub als gemeinsamer Arbeitsort

- **Diese Übersicht** hält Ziel, Bestand und Entscheidungsstand zusammen.
- **Issues** beschreiben konkrete Aufgaben mit Ziel, verantwortlicher Person, Abhängigkeiten
  und überprüfbarem Fertig-Kriterium. Ein Projektboard kann diese Aufgaben bündeln.
- **Pull Requests** enthalten kleine, prüfbare Änderungen und deren Validierung.
- **Entscheidungsnotizen** halten beschlossene Lösungen und ihre Gründe fest.
- **Gemeinsame Arbeitsregeln** gelten für Team, Codex und Claude Code; sie werden zentral gepflegt.

Die aktuelle Arbeitsweise steht in [TEAM-WORKFLOW.md](../TEAM-WORKFLOW.md).
Issues und automatische Build-Prüfungen sind vorbereitet. Ein Aufgabenboard und technische Branchschutzregeln sind noch nicht eingerichtet.

## Erste Arbeitspakete

Die Tabelle ist der vorbereitete Aufgabenbestand. Zuständigkeiten werden vor Beginn
einer Aufgabe benannt; es werden keine weiteren Teammitglieder ohne Abstimmung zugewiesen.

| Paket | Ziel und überprüfbares Ergebnis | Abhängigkeit / Status |
|---|---|---|
| P0 – Projektgrundlage | Diese Übersicht und eine konsistente Einstiegshilfe sind als Dokumentations-PR prüfbar. | Dieser PR; zur Prüfung |
| P1 – Zusammenarbeit absichern | Zugriffe und Verantwortliche erfassen; Issues und Board aufsetzen; gemeinsame Arbeitsregeln sowie passende Branch- und PR-Prüfungen einrichten und nachweisen. | Teilweise umgesetzt: Regeln, Issues und Build-Prüfungen; Zugriffe/Board/Branchschutz offen |
| P2 – Staging vollständig erfassen | Jede Seite, Sprache, Funktion, Dateiart und externe Verbindung steht in einer nachvollziehbaren Bestands- und Abnahmeliste. Bekannte Fehler erhalten eigene Aufgaben. | 190 Ausgangsdateien und 116 Einstiege erfasst; vollständige Inhalts-/Interaktionsabnahme offen |
| P3 – Technik entscheiden | E01–E07 erhalten eine begründete Empfehlung und dokumentierte Freigaben. Vorher bleiben Anbieter und Framework offen. | Auf Basis von P2; offen |
| P4 – Technischen Ablauf nachweisen | Mit der gewählten Architektur einen repräsentativen Ablauf einschließlich Vorschau und passender Prüfungen nachweisen. Abnahmekriterien vor Umsetzung festlegen. | Nach relevanten Entscheidungen aus P3; offen |
| P5 – Vollständigen Umfang übernehmen | Seiten, Sprachen, Konfigurator, Formulare und Downloads in kleinen PRs umsetzen; gegen die Liste aus P2 prüfen. | Nach P4; offen |
| P6 – Veröffentlichung vorbereiten | Inhaltliche und technische Abnahme, Rechtstext-Freigaben, URL-Übergänge, Betriebszuständigkeiten sowie Wiederherstellung und Rückweg nachweisen. | Nach P5; offen |

## Gemeinsame Abnahmekriterien

- Der gesamte vereinbarte Staging-Umfang ist nachvollziehbar übernommen; Abweichungen sind ausdrücklich beschlossen.
- Alle fünf Sprachfassungen sind geprüft, einschließlich Navigation, Metadaten und wesentlicher Abläufe.
- Produktregeln und Preise stammen aus fachlich freigegebenen Daten. Uneindeutige Konfiguratorfälle
  führen zu einer Klärung; eine KI erfindet dafür keine technische Produktempfehlung.
- Kontakt und Konfigurationsanfragen erreichen ihre vorgesehenen Empfänger; Newsletter-Anmeldung
  und Einwilligungen funktionieren im beschlossenen Verfahren.
- Geschützte Downloads sind tatsächlich nur für berechtigte Personen zugänglich.
- Wichtige bestehende URLs bleiben erreichbar oder erhalten geprüfte Weiterleitungen.
- Mobile Bedienung, Tastaturbedienung, verständliche Fehlermeldungen und wesentliche Nutzerabläufe sind geprüft.
- Impressum und Datenschutz entsprechen den bestätigten Unternehmensangaben und eingesetzten Diensten.
- Quellcode, Inhaltsänderungen, Prüfungen, Veröffentlichung und Wiederherstellung sind für das Team nachvollziehbar.

## Nächster Schritt

Den gemeinsamen Aufbau prüfen und über staging nach main übernehmen. Die offenen Qualitätsbefunde werden parallel abgearbeitet; anschließend erstellt Codex die technischen Entscheidungsvorlagen für Backend, CMS und Hosting. Eine Hosting- oder CMS-Wahl ist
keine Voraussetzung, um die Zusammenarbeit jetzt geordnet zu starten.
