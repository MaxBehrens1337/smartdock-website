# Abgleich mit smartdock.de vom 22.10.2026

Nachfolgende Korrekturen und erweiterte Prüfungen zu Motorwechseln und PDF-
Seitenumbrüchen sind im [ergänzenden Bericht](pdf-seitenumbruch-und-wechsel-2026-10-22.md)
dokumentiert. Die nachstehenden Angaben bleiben der Nachweis des ursprünglichen Abgleichs.

## Ergebnis und Geltungsbereich

Ausgangspunkt: `main` **4fbb5251aa9a9e89048db2f3d339be77f52b3255**.
Referenz sind die öffentlich erreichbaren Seiten von [smartdock.de](https://www.smartdock.de/)
und [Position Hold](https://positionhold.smartdock.de/), abgerufen am 22.10.2026.
Geprüft wurde der lokal gebaute Änderungsstand unter Root und dem GitHub-Pages-Pfad.
Die veröffentlichte Nachprüfung nach dem Merge bleibt ein eigener Schritt in
[#6](https://github.com/Thitronik/smartdock-website/issues/6).

**Die Preisberechnung stimmt für die unten beschriebene vollständige Eingabematrix
mit dem eingefrorenen Live-Code überein.** Das ist keine fachliche Preisfreigabe
und keine Behauptung, jede mögliche Browserbedienung sei getestet. Die Website
bleibt eine Testvorschau ohne produktiven Formularversand. Hetzner wird hier nicht angebunden.

## Behobene Abweichungen

| Befund | Vorher im Repository | Korrigiertes Verhalten |
|---|---|---|
| Deutschland, eine Ankerwinde, kein Einbau | ACU, 1.450 € | Wie live: WCU (1 Ankerwinde), 1.250 € |
| Weitere Anker-/Winch-Kombinationen | Zusätzliche ACU-Sonderregel erzeugte andere Module und Preise | Modulzuordnung wieder wie live; Preis-, Steuer- und Rabattvorgaben unverändert |
| WCU-Beschreibung | Zusammengefügte Funktionsnamen | Anzahl und Übersetzung wie live |
| Motor nach Hersteller-/Joystickauswahl entfernen | Alte Angaben blieben in Zusammenfassung/PDF-Eingabe | Zugehörige Angaben werden geleert; Regression für beide Abwahlwege, siehe #17 |
| Zusätzliche Extras auf Englisch | Doppelt übersetztes „1 Anchor Elec. Winch“ | „1 Anchor Winch“; Sprachwechsel erhält die Auswahl |
| Produktbericht | Übernommener BOOTE-Versuch | Live-Bericht von float mit Originaltext, Bild, Link und Gestaltung wiederhergestellt |
| Dynamische Links unter Pages | Manche hrefs wurden erst beim normalen Klick korrigiert | Auch kopierte Links und Öffnen in neuem Tab haben den Pages-Pfad |
| Lokale Testanfrage | Aufruf eines nicht vorhandenen `/api/test-configurations` | Wie Pages nur Speicherung im aktuellen Browser-Tab, ohne Versand |
| Eigene Vorschauhinweise | Drei Sprachzuordnungen vertauscht | EN, FR und ES richtig zugeordnet |

Die Änderung im kompilierten Hauptpaket ist bewusst begrenzt. Die Modulregel liegt
lesbar in [src/module-allocation.js](../../src/module-allocation.js). Die noch
kompilierten Originalkomponenten bleiben eine Einschränkung, siehe
[Migrationsplan](../migration/aufbau.md) und [#13](https://github.com/Thitronik/smartdock-website/issues/13).

## Konfigurator: reproduzierbarer Nachweis

[tools/configurator.test.mjs](../../tools/configurator.test.mjs) vergleicht die
tatsächliche Berechnung des aktuellen Anwendungspakets mit einer separat
[eingefrorenen Live-Referenz](../../tools/fixtures/live-pricing-2026-10-22.js).
Verglichen werden Positionstitel, Einzelpreise, Zwischensumme, Bündelrabatt,
Gesamtpreis, Steuersatz und Währung.

**414.720 Kombinationen:** drei Motorzustände × vier Strahlruderauswahlen × drei
Ankerwindenmengen × drei Winchmengen × Horn ja/nein × proportional ja/nein × 32
Länderschlüssel × fünf Sprachen × Einbau ja/nein × drei Aktionscodefälle.
Die 32 Schlüssel enthalten Aliase und den Exportfall; die sichtbare Länderliste
hat 28 Einträge. Gültiger Code mit Leerzeichen/Großkleinschreibung und ungültiger
Code sind eingeschlossen. Dies sind Berechnungstests, keine 414.720 Browserdurchläufe.

Zusätzlich über die echte Oberfläche geprüft:

- Deutschland: eine Ankerwinde ohne Einbau, WCU 1.250 €; Browser und heruntergeladenes PDF.
- Fünf aufeinanderfolgende Abwahlen von Winches, Ankern, Heck-, Bugstrahlruder und Horn:
  Live und Vorschau zeigen dieselben Positionen und Summen (3.950 / 2.700 / 1.450 / 1.250 / 0 €).
- Mobil: eine Ankerwinde mit Einbau, 1.250 + 2.000 = 3.250 €, in DE, EN, FR, NL und ES;
  Sprachwechsel in derselben Konfiguration erhält Auswahl und Preis.
- Motor → Volvo Penta → Joystick → Modell → zurück → Motor abwählen:
  danach nur WCU, keine alten Motorangaben. EN zeigt „1 Anchor Winch“.
- Einbaupartner im Abschluss: dieselben fünf deutschen Händler; Liste/Karte und Marker vorhanden.
- Root: Startseite → Position Hold → Konfigurator erreicht die Länderauswahl.
- Pages: interne href-Ziele auch ohne Klick vollständig geprüft; alle erfassten Ziele
  verweisen auf vorhandene Build-Dateien. Regression für dynamische Links vorhanden.

Die beiden echten einseitigen PDFs wurden vollständig gerendert und visuell
verglichen: WCU 1.250 €, gleiche Anordnung; absichtlich bleibt die vorher behobene
Beschriftung „Zwischensumme“ statt „Netto“. Weitere PDF-Fälle stehen im
[vorherigen PDF-Bericht](pdf-zwischensumme-2026-10-22.md).

## Seiten, Inhalte und Gestaltung

- Alle **116 HTML-Einstiege** auf Live und lokaler Pages-Vorschau im Desktopbrowser
  sowie bei **375 × 812 px** aufgerufen. Das [Routenprotokoll](live-abgleich-routen-2026-10-22.csv)
  enthält die einzelnen Ergebnisse. Bei allen 116 lokalen mobilen Einstiegen war
  die Dokumentbreite gleich der sichtbaren Breite: kein horizontales Überlaufen.
- 94 mobile Einstiege hatten nach Laden der Daten identischen sichtbaren Text
  (ohne eigenen Testhinweis). Unterschiede der übrigen 22: 16 CH-Einstiege mit
  bestehenden Routingkorrekturen bzw. Ladezustand, fünf Position-Hold-Seiten mit
  anderem Cookiezustand, ein französischer Einstieg mit Video-Ladehinweis.
  Desktop-Erstaufnahmen enthalten zusätzlich drei noch nicht geladene Listen;
  deren Inhalt wurde anschließend mobil vollständig gleich vorgefunden.
- Beide CSS-Dateien sind **bytegleich** mit den Live-Dateien. 64 direkt im Live-Code
  referenzierte CDN-Medien und zehn API-PDF-Dateien wurden heruntergeladen und gegen
  die lokalen Originale gehasht: alle bytegleich. Details im
  [Medienprotokoll](live-abgleich-medien-2026-10-22.json). Eingebettete Fremdplayer
  und Kartendienste sind dadurch nicht offline verfügbar.
- Öffentliche Datensätze vollständig, einschließlich Pagination, verglichen:
  **656 DE-Übersetzungen, 279 EN-Übersetzungen, 11 FAQs, neun Händler, elf Anleitungen**.
  Nach Wiederherstellung des float-Berichts unterscheiden sich nur drei deutsche
  FAQ-Antwortfelder durch die bereits gewollten Tippfehlerkorrekturen. Alle neun
  Händler stimmen in allen Feldern überein.
- Desktop-Konfigurator und PDF visuell verglichen. Dies ersetzt keine automatische
  Pixelprüfung aller Seiten, Geräte, Animationen und aufgeklappten Zustände.

## Bewusst erhaltene Unterschiede und offene Grenzen

- Testbanner, noindex, deaktivierte Analyse und Testformularverhalten bleiben erhalten.
  Kontakt und Newsletter melden weiterhin die fehlende Anbindung. Es wurde keine
  echte Anfrage auf der Live-Seite abgeschickt.
- FAQ-Tippfehlerkorrekturen, verständliche Extrasbezeichnungen und die PDF-Beschriftung
  bleiben erhalten; „SMARTDICK“ wird nicht aus der Live-Quelle zurückkopiert.
- Reparierte CH-Einstiege bleiben erreichbar; fehlerhafte Live-Weiterleitungen
  werden nicht wieder eingeführt. 60 automatisierte CH-Zielfälle bleiben grün.
- Geolokalisierung mit Standortfreigabe und vollständige Marker-/Popup-Bedienung
  sind nicht abgenommen. Ein Marker-Klick erzeugte in beiden getesteten Abschlusskarten
  keine sichtbare Auswahl; deshalb wird dies nicht als bestandene Auswahlfunktion gewertet.
- Der bereits erfasste PDF-Seitenumbruch bei umfangreichen Konfigurationen bleibt
  [#18](https://github.com/Thitronik/smartdock-website/issues/18); Sprachlücken aus dem
  Ausgangsbestand bleiben [#9](https://github.com/Thitronik/smartdock-website/issues/9).
- Fachliche Freigabe von Preisen, Modulregeln und Rechtstexten sowie produktiver
  Formularversand sind weiterhin offen. Die Übereinstimmung mit live bestätigt
  nicht deren rechtliche oder fachliche Richtigkeit.

## Wiederholen und gemeinsam weiterarbeiten

```sh
npm ci
npm run check
npm run preview
# In einem zweiten Terminal:
npm run preview:pages
```

`check` umfasst jetzt 48 Tests, darunter die Preis-Matrix, Motor-Abwahl,
PDF-Regressionsfälle, Pages-Links und lokale Testanfragen; außerdem Build,
Syntax-, Inhalts- und Dokumentationsprüfungen. Root baut 186, Pages 187 Dateien.

Die eingefrorene Preisreferenz darf nicht aus dem gerade geänderten Code neu
erzeugt werden, um einen Fehler grün zu machen. Eine neue Referenz erfordert einen
belegten Live-/Fachentscheid, neue Browser-Gegenproben und einen datierten Nachweis.
Teamaufgaben und Freigaben bleiben in Issues/PRs; dieser Bericht dokumentiert den
Prüfstand. Vor Merge: CI des konkreten PR-Commits prüfen. Nach Merge nach staging:
veröffentlichte Vorschau erneut kontrollieren, erst dann Übernahme nach main.
