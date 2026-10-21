# SMARTDOCK Datenbank

Vorbereitete Erstmigration für MariaDB 10.6 oder neuer. Noch nicht auf einer
Hetzner-Datenbank ausgeführt oder dort getestet. Die Website bleibt im Vorschaumodus.

## Tabellen

| Tabelle | Zweck |
| --- | --- |
| sd_newsletter_subscribers | Adresse, Anmeldestatus und Einwilligung |
| sd_newsletter_tokens | Hashes befristeter Bestätigungs- und Abmeldetokens |
| sd_newsletter_events | Verlauf von Anmeldung, Bestätigung und Abmeldung |
| sd_configuration_requests | Kontaktdaten und versionierte Konfiguration |
| sd_mail_outbox | Warteschlange für späteren serverseitigen Mailversand |

## Einmaliger Import

1. In phpMyAdmin die ausdrücklich vorgesehene Datenbank auswählen.
2. `SELECT DATABASE(), VERSION();` und `SHOW TABLES;` ausführen. MariaDB-Version
   prüfen und vorhandene Struktur sichern. Bei bestehenden `sd_`-Tabellen zunächst
   deren Struktur vergleichen; diese Erstmigration ist kein Upgrade.
3. `migrations/001_initial.sql` importieren. Sie erstellt ausschließlich fünf
   Tabellen. DDL ist nicht als Ganzes rückrollbar. Bei Fehlern stoppen, vorhandene
   Teilergebnisse prüfen und nicht blind erneut importieren.
4. Mit `SHOW CREATE TABLE` für jede Tabelle Spalten, JSON-Prüfung, eindeutige
   Indizes und Fremdschlüssel prüfen. Alle fünf Tabellen müssen leer sein.
5. Den erfolgreichen Import mit Zielumgebung, Zeit und Git-Commit dokumentieren.

## Vor Anschluss der Formulare

- Das Backend läuft auf dem Server; Datenbank- und SMTP-Zugangsdaten bleiben
  außerhalb des öffentlichen Repositorys und Webroots. GitHub Pages greift
  niemals direkt auf die Datenbank zu.
- Pro Verbindung UTC setzen. E-Mails serverseitig validieren und eine einheitliche
  Normalisierungsregel verwenden (Leerraum entfernen, Domain kleinschreiben;
  lokale Teile nicht ungeprüft verändern). Prepared Statements und Transaktionen
  verwenden; Schemaeinrichtung und Laufzeit haben getrennte Berechtigungen.
- Newsletter startet immer als `pending`. Zufällige Tokens aus mindestens 32
  kryptografisch sicheren Bytes erzeugen, nur SHA-256-Hashes als 32 Bytes speichern.
  Bestätigung prüft Zweck, Ablauf und einmalige Verwendung atomar. Anmeldung,
  Ereignis, Token und Mailauftrag gemeinsam in einer Transaktion speichern.
- Die Einwilligungstexte sind versioniert. Konfigurationsanfragen erteilen keine
  Newsletter-Einwilligung. Die Ereignistabelle ist eine Verlaufshilfe und kein
  manipulationssicheres Audit-System.
- Konfigurationen gegen erlaubte Module prüfen und Preise serverseitig berechnen;
  keine vom Browser übermittelten Preise ungeprüft übernehmen. Nur ausdrücklich
  abgesendete Anfragen speichern; Entwürfe bleiben zunächst lokal.
- Mailversand benötigt einen gesonderten SMTP-Worker mit Sperren, Wiederholungen
  und deduplizierten Aufträgen. SMTP garantiert keinen exakt einmaligen Versand.
  Keine Newsletter-Kampagnen sind durch dieses Schema eingerichtet.
- Schutz vor Missbrauch, restriktives CORS für die Stage, nichtöffentliche
  Verwaltungszugriffe und getrennte Testdatenbank vor realem Betrieb ergänzen.
- Aufbewahrungsfristen festlegen. Tokenlinks in Outbox-Payloads sind kurzlebige
  Geheimnisse: nach Versand/Ablauf entfernen. Outbox-Empfänger und Payloads bei
  Löschanfragen ausdrücklich mitbereinigen; SET NULL anonymisiert sie nicht.
