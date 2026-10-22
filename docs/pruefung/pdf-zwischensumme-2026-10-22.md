# PDF-Beschriftung: Prüfung vom 22. Oktober 2026

Aufgabe: [#11](https://github.com/Thitronik/smartdock-website/issues/11).
Basis: `a3f3c81daee2c27e908aaa4e1fec30430ead0b66`, Zweig `codex/pdf-zwischensumme`.
Dieser Nachweis beschreibt den lokal gebauten Änderungsstand. Die Übernahme und
Nachprüfung auf der veröffentlichten Vorschau wird im Issue festgehalten.

## Änderung und automatischer Nachweis

Die deutsche PDF-Zeile heißt jetzt „Zwischensumme“ statt „Netto“. Der Betrag
enthält im beobachteten Deutschland-Fall bereits die ausgewiesene Mehrwertsteuer.
Im Hauptbündel und in der noch vorhandenen Position-Hold-Kopie wurde jeweils
genau ein Übersetzungstext geändert. Preis-, Steuer- und Rabattberechnung sowie
andere Übersetzungen bleiben unverändert. Beide Bündel weichen deshalb bewusst
vom historischen Exportvergleich ab; dessen Referenz wird nicht umgeschrieben.

[tools/pdf.test.mjs](../../tools/pdf.test.mjs) führt die tatsächlichen PDF-Vorlagen
und Geldformatierer aus den Bündeln in einer isolierten Node-Umgebung aus.
Browser-DOM, Rasterisierung, Download und Produktübersetzungsfunktion werden
ersetzt. Die Tests prüfen Beschriftungen, übergebene Beträge, Steuersätze,
Rabattdarstellung, Dateinamen und unveränderte Eingaben. Sie sind keine
fachliche Bestätigung der zugrunde liegenden Preisregeln und keine Layoutprüfung.

- Vier Eingabefälle: Deutschland ohne Einbau, mit Einbau, mit Einbau und Rabatt,
  Schweiz ohne Einbau.
- Hauptvorlage: DE, EN, FR, NL, ES; ältere Position-Hold-Kopie: DE, EN, FR.
- 32 Kombinationen. Vor der Korrektur schlugen die acht deutschen Fälle wegen
  „Netto“ fehl. Nach der Korrektur bestehen alle Kombinationen.
- Der Test gehört zu `npm test` und `npm run check` und damit zur vorhandenen
  Windows-/Linux-CI. Die Schweiz-Eingabe verwendet den im Browser beobachteten
  Steuersatz 8.1 %; es wird keine Steuerregel festgelegt.

## Vergleich echter Browser-Downloads

Lokaler Pages-Build unter `http://127.0.0.1:4174/smartdock-website/konfigurator`.
Kontaktdaten blieben leer; keine Anfrage wurde abgesendet. Acht PDFs wurden
über den sichtbaren Download-Button geladen, mit PDFium gerendert und alle
zehn Seiten vollständig angesehen. Lokale Belege liegen unter dem ignorierten
Verzeichnis `.migration-pdf-check-20261022/` und werden nicht veröffentlicht.

| Fall | Bildschirm und PDF | PDF-Seiten / Ergebnis |
|---|---|---|
| Deutschland, eine Ankerwinde, kein Einbau, DE | ACU 1.450,00 €, Zwischensumme 1.450,00 €, MwSt. 19 % inklusive, Gesamt 1.450,00 € | 1; neue Beschriftung vollständig lesbar |
| Gleiche Auswahl, EN | Subtotal 1.450,00 €, Total Price 1.450,00 € | 1; Beschriftung und Betrag stimmen |
| Gleiche Auswahl, FR | Sous-total 1.450,00 €, Prix total 1.450,00 € | 1; Beschriftung und Betrag stimmen |
| Gleiche Auswahl, NL | Subtotaal 1.450,00 €, Totaalprijs 1.450,00 € | 1; Beschriftung und Betrag stimmen |
| Gleiche Auswahl, ES | Subtotal 1.450,00 €, Precio total 1.450,00 € | 1; Beschriftung und Betrag stimmen |
| Deutschland, eine Ankerwinde, Einbau | ACU 1.450,00 € + Einbau 2.000,00 €; Zwischensumme und Gesamt 3.450,00 €, MwSt. 19 % inklusive | 1; Beträge und Einbaustatus stimmen |
| Deutschland, ein Motor + Ankerwinde + Einbau | ECU 3.950,00 € + ACU 1.450,00 € + Einbau 2.000,00 €; Zwischensumme 7.400,00 €, Rabatt −500,00 €, Gesamt 6.900,00 € | 2; Beträge stimmen, Summenblock wird über Seiten getrennt (#18) |
| Anschließend Motor abgewählt, Schweiz, kein Einbau | ACU, Zwischensumme und Gesamt CHF 2'437.00, MwSt. 8.1 % inklusive | 2; Beträge stimmen, veraltete Motorangaben bleiben sichtbar (#17) |

Die vollständige Motorauswahl für den Rabattfall war MerCruiser/Mercury,
Joystick Ja, MerCruiser Bj 2016 (Z-Antrieb oder Zeus). Der Schweizer Fall
folgte durch Zurücknavigation, Abwählen des Motors und Länderwechsel.
Der erste Downloadversuch des Rabattfalls wurde von der Browsersteuerung nicht
bestätigt; der gezielte Wiederholungsversuch lieferte das geprüfte PDF.

## Getrennte offene Befunde

- [#17](https://github.com/Thitronik/smartdock-website/issues/17): Trotz
  abgewähltem Motor bleiben Hersteller in der Bildschirm-Zusammenfassung und
  Hersteller, Joystick und System im PDF. Die ACU-Stückliste und der Betrag
  enthalten in diesem Fall keinen Motor mehr.
- [#18](https://github.com/Thitronik/smartdock-website/issues/18): Im Rabattfall
  steht der Gesamtpreis erst auf Seite 2, getrennt von Zwischensumme, Rabatt
  und Steuerhinweis auf Seite 1. In diesen Downloads sind keine Betragsziffern
  abgeschnitten; das ist keine Freigabe anderer langer Konfigurationen.
- Die PDFs bleiben rasterisiert. Textstruktur und Barrierefreiheit sind durch
  die Beschriftungskorrektur nicht gelöst.
- Die verbindliche Preis-, Steuer- und Kompatibilitätsfreigabe bleibt in
  [#5](https://github.com/Thitronik/smartdock-website/issues/5).
