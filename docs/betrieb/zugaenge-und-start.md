# Hetzner und Brevo: Was für den Anschluss gebraucht wird

Diese Liste bereitet die Einrichtung vor. Sie erteilt keine Freigabe für Buchungen,
DNS-Wechsel, produktiven Versand oder Datenbankänderungen. Entscheidungen, Zuständigkeiten
und aktueller Erledigungsstand stehen im
[Startplan #20](https://github.com/Thitronik/smartdock-website/issues/20).

## Zuerst von Max bzw. den Kontoverantwortlichen

| Bereich | Informationen und Zugang | Damit klären wir |
|---|---|---|
| Hetzner | Gebuchtes Produkt und Tarif: Webhosting, Managed Server oder Cloud; verantwortliche Person und angemeldete Verwaltungsoberfläche | Welche Laufzeit und welcher Betriebsaufwand tatsächlich vorhanden sind |
| Website und Domain | Geplante Hauptdomain, bisheriger Website-Anbieter, DNS-Verantwortlicher, gewünschte Testadresse | Zielumgebung, TLS und Umstellung einschließlich Rücknahme; bestehende E-Mail-Einträge berücksichtigen |
| Brevo | Bestehendes Konto, verantwortliche Person, Tarif, ungefährer Kontaktbestand und monatlicher Versandbedarf | Nutzbarer Umfang und benötigte Anbindung ohne vorschnellen Tarifwechsel |
| E-Mail-Abläufe | Gewünschte Absenderadresse/-name, Antwortadresse und Empfänger für Kontakt-/Konfigurationsanfragen | Wohin welche Nachricht gehen soll und wer einen Zustelltest abnimmt |
| Newsletter | Bestehende Listen/Formulare/Vorlagen, Bestätigungs- und Abmeldeablauf, gewünschte fünf Sprachfassungen und zuständige Redaktion | Was übernommen werden muss und welche Einwilligungs-/Textprüfung fehlt |
| Team | GitHub-Benutzernamen von Marlene, Adrian, Sönke und Max; Personen für Preise, Texte und Betriebsfreigabe | Persönliche Zugänge und eindeutige fachliche Abnahme |

Für den ersten technischen Abgleich reichen Produkt-/Tarifname und eine bereits
angemeldete Oberfläche. Technische Details kann der Agent mit der verantwortlichen
Person auslesen; Max muss nicht selbst eine Serverarchitektur auswählen.

## Beim technischen Abgleich erfassen

**Hetzner:** konkretes Zielprojekt/Webspace, verfügbare PHP-Version, Deployment per
SSH/SFTP bzw. passendem Anbieterweg, Dokumentenwurzel, geplante Aufgaben und Logs.
Den genauen Datenbanknamen und Host in der geschützten Betriebsablage zuordnen;
Test- und Produktionsziel klar unterscheiden. Die vorhandene
[MariaDB-Erstinstallation](../../database/README.md) ist dokumentiert und wird nicht
noch einmal ausgeführt. Laufzeitrechte, Backup und ein Wiederherstellungsversuch sind
vor einem produktiven Anschluss zu prüfen.

**Brevo:** Verfügbarkeit des vorgesehenen API-/SMTP-Versands, verifizierter Absender,
Versanddomain und Zugang zum zuständigen DNS. Vorhandene Listen- und Vorlagenkennungen,
Double-Opt-in und Abmeldung ermitteln. Für Tests bewusst freigegebene Testempfänger
verwenden; einen alten Kontaktbestand nicht ungeprüft importieren. Newsletteranmeldung
und Produktanfrage sind getrennte Vorgänge. Ob Brevo den Newsletterstatus allein führt
oder das lokale Schema benötigt wird, entscheidet #20 vor der Implementierung.

**Persönliche Zugänge:** Wo das gebuchte Produkt es unterstützt, getrennte Personen-
oder Projektzugänge mit passendem Umfang verwenden. Andernfalls den verfügbaren Weg
gemeinsam im angemeldeten Konto prüfen. Eine allgemeine Teameinladung ist nicht bei
jedem Tarif vorauszusetzen. Ein Lesezugang für die Bestandsaufnahme ist noch kein
Auftrag, Berechtigungen, DNS oder produktive Daten zu ändern.

## Zugangswerte bleiben außerhalb von GitHub

Dieses Repository und seine Issues sind öffentlich. Keine Passwörter, API-/SMTP-Schlüssel,
privaten Kontaktdaten oder Kontaktlisten in Chat, Issues, PRs oder Repository eintragen.
Zugangswerte später direkt in die vereinbarte geschützte Server-/CI-Konfiguration geben;
lokal nur in ignorierte Umgebungsdateien. Serverseitige Geheimnisse dürfen nicht in
Browserpakete oder den öffentlichen Webroot gelangen. Dokumentiert werden Zweck,
Variablenname, Zielumgebung und verantwortliche Person, nicht der geheime Wert.

## Was aus den Angaben entsteht

1. Verifizierter Betriebsplan für das tatsächlich vorhandene Hetzner-Angebot, mit
   Testumgebung, Deployment aus GitHub und Rücknahmeweg.
2. Konkrete Serveranbindung für Kontakt, Konfigurationsanfragen und Brevo einschließlich
   Eingabeprüfung, Fehlerfällen und Zustellnachweis.
3. Abnahme anhand desselben Website-Umfangs und Designs; fachliche Preise, Rechtstexte
   und Datenflüsse bleiben gesondert prüfbar. Erst danach Produktionsfreigabe.

Ein zusätzliches CMS ist als Startvoraussetzung bislang nicht beschlossen. Die
Empfehlung in #20 ist zunächst die vorhandene GitHub-Inhaltspflege; das Team prüft
dafür einen echten redaktionellen Durchlauf. Der Beschluss gehört anschließend in
die [Entscheidungsübersicht](../entscheidungen/README.md).

Herstellerquellen zum Abgleich des tatsächlichen Kontos:
[Hetzner-Webhosting](https://www.hetzner.com/webhosting/),
[PHP-Konfiguration](https://docs.hetzner.com/managed/webserver/php-configuration/),
[Datenbank-Backup](https://docs.hetzner.com/managed/databases/general/backup-migration/),
[Brevo-Transaktionsmails](https://help.brevo.com/hc/en-us/articles/7924148470546-How-can-I-send-transactional-emails-with-Brevo),
[Brevo-Anmeldeformulare](https://help.brevo.com/hc/en-us/articles/208771869-Create-a-sign-up-form-in-Brevo).
