# SMARTDOCK: Konfigurator-Prüftabelle

Stand: 21. Oktober 2026. Aufgabe: [#5](https://github.com/Thitronik/smartdock-website/issues/5).
Quellstand: [staging d74e084](https://github.com/Thitronik/smartdock-website/commit/d74e08402bc2c4d480296ec1e494c0f25ded2eaf).

Die folgenden Ist-Werte wurden in der GitHub-Pages-Vorschau über die sichtbare Oberfläche beobachtet.
Sie bestätigen den beschriebenen Ablauf, nicht die fachliche oder steuerliche Richtigkeit der Preisvorgaben.
Es wurde keine Anfrage abgesendet und kein Preis geändert.

## Bereits ausgeführte Stichproben

Ausgangspunkt ist /smartdock-website/konfigurator/. Auswahl „Deutschland“, dann „Weiter“.
K01 startet mit genau einer elektrischen Ankerwinde und ohne weitere Produkte oder Einbau.

| ID | Eingabe / Aktion | Beobachtete Ausgabe | Ergebnis |
|---|---|---|---|
| K01 | Deutschland, DE, eine Ankerwinde, kein Einbau | ACU (Ankerwinde), 1.450,00 € brutto, angezeigter Steuersatz 19 % | Ist-Wert erfasst |
| K02 | K01 beibehalten; Sprache DE → EN wechseln | Auswahl und Gesamtpreis bleiben erhalten: 1.450,00 €; englische Modulbeschreibung | Sprachwechsel für diesen Fall bestanden |
| K03 | /positionhold/ öffnen; Kopf-Button „Konfigurator“; Deutschland und eine Ankerwinde wählen | Hauptkonfigurator, ACU, 1.450,00 € | Einstieg für diesen Fall bestanden |
| K04 | K03: Zurück zur Länderauswahl, Schweden wählen | ACU, 1.523,11 €, angezeigter Steuersatz 25 % | Länderabhängiger Ist-Wert erfasst |
| K05 | Dieselbe Auswahl, Land Schweiz | ACU, CHF 2'437.00, angezeigter Steuersatz 8.1 % | Eigene Schweizer Preisliste im Ablauf sichtbar |
| K06 | K02: Weiter zum Einbauservice, Service auswählen | ACU 1.450,00 € + Einbau 2.000,00 € = 3.450,00 € | Addition in diesem Fall konsistent |
| K07 | K06: Zurück zur Systemauswahl; zusätzlich einen Motor auswählen | ECU 3.950,00 € + ACU 1.450,00 € + Einbau 2.000,00 € = 7.400,00 €; Rabatt −500,00 €; Gesamt 6.900,00 € | Addition und Abzug konsistent; noch keine vollständige Herstellerkonfiguration |
| K08 | K07: Ankerwinde wieder abwählen | ECU + Einbau = 5.950,00 €; Bündelrabatt entfällt | Aktualisierung nach Entfernen in diesem Fall bestanden |
| K17a | Neue Konfiguration wie K01 bis zum Abschluss; PDF herunterladen, Kontaktdaten leer lassen | Bildschirm und einseitiges PDF: ACU, Deutschland, kein Einbau, Gesamt 1.450,00 €. PDF bezeichnet die enthaltene Bruttosumme jedoch als „Netto“ | Beschriftungsfehler bestätigt: [#11](https://github.com/Thitronik/smartdock-website/issues/11) |

K01/K02/K06–K08 wurden in einem Ablauf geprüft; K03–K05 in einem zweiten Tab.
K01–K08 beziehen sich auf die sichtbare Zusammenfassung. K17a vergleicht zusätzlich das heruntergeladene PDF; dessen gesamte Seite wurde gerendert und visuell geprüft. Keine Anfrage wurde versendet. Das PDF enthält keinen extrahierbaren Text und ist als Bild aufgebaut; die barrierefreie Nutzbarkeit bleibt zu prüfen.
Die Fälle ohne vollständig gewählten Hersteller belegen nur die dort angezeigte Zwischenberechnung.

Nachtrag vom 22.10.2026: Die [PDF-Prüfung zur Beschriftungskorrektur](pdf-zwischensumme-2026-10-22.md)
vergleicht acht echte Downloads in fünf Sprachen sowie Einbau, Rabatt und Schweiz.
Die „Netto“-Beschriftung ist im dort geprüften lokalen Änderungsstand korrigiert;
Übernahme und veröffentlichte Nachprüfung stehen in #11. Neue Befunde: veraltete
Motorangaben nach Abwahl (#17) und ein getrennter PDF-Summenblock (#18).

## Codebefund hinter den Preisunterschieden

Quellen: [Hauptbündel](../../vendor/website/assets/index-RRVGC1mK.js),
[Position-Hold-Bündel](../../vendor/website/assets/positionhold.js),
[gemeinsame Modulzuordnung](../../src/module-allocation.js).

- Das Hauptbündel enthält eine Euro-Basispreistabelle und eine separate Schweizer Festpreistabelle.
- Länderregeln, Einbauservice, ein Bündelrabatt und der Aktionscode PIBS26 beeinflussen die Rechnung.
- Hauptbündel und Position-Hold-Bündel enthalten unterschiedliche Versionen der Modulzuordnung.
  Beispielsweise wird eine alleinige Ankerwinde in der aktuellen Funktion als ACU eingeordnet;
  die ältere Funktion q4 im Position-Hold-Bündel ordnet diese Zusatzfunktion einer WCU zu.
- **Kein nachgewiesener sichtbarer Preisfehler für den geprüften Position-Hold-Einstieg:**
  K03 führt zurück in den Hauptkonfigurator und liefert denselben Wert wie K01.
  Die ältere Kopie bleibt ein Wartungsrisiko und wird nicht als bereits reproduzierter UI-Fehler ausgegeben.
- Der Fehlerpfad der Preisfunktion liefert bei einer Ausnahme unter anderem einen Gesamtpreis von 0.
  Ob und wie dieser Pfad durch normale Bedienung erreicht wird, wurde nicht nachgestellt.
- Eine verbindliche Preis- und Regelquelle mit dokumentierter fachlicher Freigabe ist noch zu bestimmen.

## Noch offene Prüffälle

Vor Umsetzung einer Korrektur werden Sollwerte aus der bestätigten Preis- und Regelquelle ergänzt.
Ein aus dem bestehenden Code abgelesener Betrag darf nicht allein zum fachlichen Sollwert erklärt werden.

| ID | Zu prüfen | Fertig-Kriterium | Status |
|---|---|---|---|
| K09 | Gleiche vollständige Auswahl in DE, EN, FR, NL, ES | Sprache verändert weder Stückliste noch Preise; Auswahl bleibt nachvollziehbar erhalten | Offen |
| K10 | Alle angebotenen Lieferländer | Bestätigte Preisbasis, Währung, Rundung und Länderregel stimmen mit Ausgabe überein | Fachliche Vorgaben offen |
| K11 | Ein Motor / mehrere Motoren und Herstelleroptionen | Stückliste und Kompatibilität entsprechen freigegebenen Produktregeln | Fachliche Vorgaben offen |
| K12 | Ein / zwei Strahlruder; proportional / nicht proportional | Passende Module, Kanalbelegung und Preise ohne Doppelzählung | Fachliche Vorgaben offen |
| K13 | Ankerwinden, Winches, Horn und Kombinationen | Jede gewünschte Funktion ist genau einmal abgedeckt; Modulteilung ist bestätigt | Fachliche Vorgaben offen |
| K14 | Einbau ein / aus in Euro und Schweiz | Servicepreis und Rabattanwendung entsprechen der bestätigten Regel | Offen |
| K15 | Bündelrabatt: hinzufügen, entfernen, Länderwechsel | Rabatt erscheint ausschließlich in den freigegebenen Fällen | Teilweise: K07/K08 |
| K16 | Aktionscode gültig / ungültig / Schreibweise / Gültigkeitszeitraum | Anwendung und Kombination mit Einbau/Bündelrabatt entsprechen einer bestätigten Aktion | Fachliche Vorgaben offen |
| K17 | Bildschirm und heruntergeladenes PDF | Stückliste, Mengen, Währung, Einzelpreise, Rabatte und Summe stimmen überein | K17a sowie [acht lokale Downloads vom 22.10.](pdf-zwischensumme-2026-10-22.md); #11 korrigiert im PR-Stand, #17/#18 offen; weitere Kombinationen und veröffentlichte Nachprüfung offen |
| K18 | Späterer Anfrage-Datensatz und Backend | Backend berechnet aus freigegebenen Regeln; manipulierte Browserwerte werden nicht als verbindliche Preise übernommen | Backend noch offen |
| K19 | Ungültige Auswahl und Berechnungsfehler | Verständlicher Fehlerzustand; kein scheinbar gültiges Null-Euro-Angebot | Offen |
| K20 | Zurücknavigation, Zurücksetzen und erneute Auswahl | Keine veralteten Module, Rabatte oder Summen bleiben stehen | K08; veraltete Motorangaben am 22.10. bestätigt, siehe #17 |
| K21 | Weitere Einstiege und Sprachfassungen von Position Hold | Gleiche Eingabe führt zum gleichen aktuellen Konfiguratorergebnis | Teilweise: K03 |

## Vorlage für weitere Fälle

Für jeden ausgeführten Fall festhalten:

- Quell-Commit und Datum.
- Einstieg, Sprache, Lieferland und sämtliche ausgewählten Funktionen/Hersteller.
- Einbauservice und Aktionscode.
- Erwartete Module und Preise mit Quelle und Freigabe.
- Tatsächliche Einzelpreise, Rabatte, Währung und Gesamtpreis.
- Vergleich mit PDF und späterem Backend; Beleg und Ergebnis.
- Bei einer Abweichung: reproduzierbare Schritte und eigenes GitHub-Issue.

Technische Bearbeitung: Codex. Die fachliche Verantwortung für Preise und Produktregeln
wird mit Marlene, Adrian, Sönke und Max zugeordnet.
