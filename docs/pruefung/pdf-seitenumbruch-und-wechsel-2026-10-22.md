# PDF-Seitenumbrüche und Konfiguratorwechsel – 22.10.2026

Ausgangspunkt: `main` `bfe7a5ebf0e47eb190f1e7823eac77d0668da0b9`.
Bearbeitet werden [#17](https://github.com/Thitronik/smartdock-website/issues/17)
und [#18](https://github.com/Thitronik/smartdock-website/issues/18).
Der jeweilige Veröffentlichungsstand und die Nachprüfung stehen in diesen Issues.

## Bestätigte Fehler und Korrektur

- Der bisherige PDF-Export schnitt ein einziges langes Bild in feste A4-Streifen.
  Dadurch lagen Zwischensumme, Rabatt und Gesamtpreis auf verschiedenen Seiten.
  Die neue [Seitenplanung](../../src/pdf-pagination.js) hält normale Karten und
  den gesamten Preisblock zusammen. Auf jeder Seite gibt es einen oberen und
  unteren Rand; der Footer bleibt nach Möglichkeit beim Preisblock.
- Sehr lange Kontaktfelder dürfen über mehrere Seiten weitergehen. Die Grenzen
  berücksichtigen die tatsächlich gezeichneten Schriftpixel, weil html2canvas
  Text leicht gegenüber seinen DOM-Zeilenboxen versetzen kann. Ein zusätzlicher
  Rand schützt die letzte Footerzeile. Lange Wörter umbrechen; eingegebene
  HTML-Sonderzeichen bleiben Text.
- Reproduzierbarer Herstellerfehler: MerCruiser/Mercury mit Joystick und System
  „MerCruiser Bj 2016“ konfigurieren, zurückgehen, Volvo Penta ohne Joystick und
  „EVC -D, -E“ wählen. Das bisherige PDF enthielt trotzdem Joystick „Ja“ und das
  MerCruiser-System. Ein Herstellerwechsel leert jetzt die abhängigen Antworten.
- Ein Wechsel zwischen einem und mehreren Motoren leert ebenfalls die davon
  abhängigen Systemantworten. Der Hersteller bleibt dabei erhalten. Vollständige
  Motor-Abwahl leert auch den Hersteller. Die erneute Wahl desselben Herstellers
  ohne Änderung erhält dagegen die Antworten.
- Ein Wechsel der Volvo-Joystickantwort verwirft das bisherige Modell bzw.
  System. Andere Module bleiben erhalten. Die bestehende Preisberechnung wird
  nicht verändert.

Die PDF-Optik mit Schrift, Farben, Karten und zwei Spalten bleibt erhalten.
Nur übergroße Kontaktkarten erhalten die volle Breite, damit sie zwischen
Textzeilen weitergeführt werden können. Beide übernommenen PDF-Hooks nutzen
die gemeinsame Funktion; die Position-Hold-Vorlage wird zusätzlich automatisiert
geprüft. Die veröffentlichten Konfigurator-Einstiege führen in die Hauptanwendung.

## Automatisierter Nachweis

`npm run check`: **62 Tests bestanden**, Root- und Pages-Build samt Ressourcen,
Sprachen und JavaScript geprüft; 60 Redirect-Fälle bestanden.

- Unverändert **414.720 Preis-/Modulkombinationen** gegen die eingefrorene
  Live-Referenz. Dies sind Berechnungstests, keine Browserdurchläufe und keine
  fachliche Preisfreigabe.
- Alle neun Kombinationen aus altem/neuem Hersteller; gleiche Auswahl erhält
  Daten, ein tatsächlicher Wechsel verwirft fremde Daten.
- Beide Motoranzahlwechsel und Abwahl/Wiederwahl für alle drei Hersteller.
- Länderfolge DE → CH → SE → DE bei drei Herstellern und zwei Motoranzahlen:
  Module, Antworten, PDF-/Anfragewerte, Währung, Steuer und Preise.
- 18 Endkonfigurationen (drei Hersteller × zwei Motoranzahlen × drei Länder):
  frisch begonnen und über Änderungen erreicht ergeben gleiche öffentliche Daten.
- Seitenplanung an 600 Preisblockpositionen, exakt gefüllte Seiten, überlange
  Karten, überlappende Spalten, versetzte Rasterzeilen, lückenlose Bildausschnitte,
  Seitenränder und Entfernung der versteckten Vorlage auch bei Fehlern.
- 32 vorhandene PDF-Vorlagenfälle sowie zwei zusätzliche Tests für die sichere
  Ausgabe von Freitext in Hauptanwendung und Position-Hold-Vorlage.

## Browser- und PDF-Nachweis

Lokale Builds unter `http://127.0.0.1:4173/` und
`http://127.0.0.1:4174/smartdock-website/`, jeweils mit tatsächlichem PDF-Download.
Die Downloads wurden mit `pdftoppm` gerendert und visuell geprüft.
Testdaten sind ausdrücklich synthetisch, E-Mail-Adressen unter `example.invalid`.
Es wurde keine Anfrage versendet.

| Fall | Ergebnis |
|---|---|
| Eine Ankerwinde, Deutschland, kein Einbau | Eine Seite, 1.250 €, vollständiger Footer; DE/EN/FR/NL/ES |
| Zwei Motoren, Bug/Heck, zwei Ankerwinden, zwei Winches, Horn, MerCruiser, VETUS proportional, Einbau und lange Kontakte | Drei Seiten; 11.150 € Zwischensumme, −500 € Rabatt, 10.650 € Gesamtbetrag zusammen; DE/EN/FR/NL/ES |
| MerCruiser → Volvo, ohne Joystick, EVC -D, -E | Zwei Seiten; ausschließlich neue Volvo-Angaben; 6.700 € |
| Volvo ein → mehrere Motoren, Joystick EVC B & C | Neue Modellantwort im PDF, kein altes EVC-System |
| Volvo → Motor entfernen → Yamaha mit Helm Master EX (Single) | Ohne Motor keine Motorangaben; nach Wiederwahl ausschließlich Yamaha-Angaben |
| Länderwechsel mit Volvo, Ankerwinde und Einbau | DE 6.700 € / 19 %; CH 8.081,10 CHF / 8,1 %; SE 7.063,03 € / 25 %; zurück DE wieder 6.700 € / 19 % |
| Überlanges Firmenfeld: 200 Wiederholungen von „TESTDATEN SEITENUMBRUCH“ und Endmarke | Vier Seiten, vollständige Zeilen an beiden Übergängen der Kontaktkarte, Endmarke und Preisblock erhalten |
| Mobile Pages-Vorschau, 375 × 812 px, eine Ankerwinde | PDF-Download erfolgreich; gemessene Inhalts- und Dokumentbreite jeweils 360 px (15 px Scrollleiste), kein horizontales Überlaufen |

Die genannten Beträge dokumentieren das bisherige Verhalten. Eine fachlich
verbindliche Preis-/Steuerquelle wird weiterhin im Projekt benötigt.

Lokale Zwischenbelege liegen unversioniert in `.migration-pdf-state-20261022/`.
Der Bericht und die ausführbaren Tests sind der dauerhafte Nachweis im Repository.

## Grenzen

Der Export bleibt ein **Raster-PDF ohne auswählbaren Text und ohne PDF-Tags**.
Diese Reparatur verbessert die sichtbaren Umbrüche, macht den Export aber nicht
barrierefrei. Ein semantischer PDF-Export gehört zum schrittweisen Umbau in
[#13](https://github.com/Thitronik/smartdock-website/issues/13).

Die Seitenplanung setzt die bestehende helle PDF-Vorlage voraus. Bei späteren
Änderungen an dunklen Flächen, Bildern oder Schriftfarben müssen die Raster-
Erkennung und ihre Tests mitgeprüft werden. Sehr große Texte bleiben außerdem
durch die Canvas-/Speichergrenzen des jeweiligen Browsers begrenzt.

Keine vollständige Funktions- oder Produktionsfreigabe: Hosting, echter
Formularversand, Brevo, rechtliche und fachliche Freigaben sowie die übrigen
offenen Issues bleiben eigene Arbeit. Die Übernahme nach staging und main
ersetzt diese Freigaben nicht.
