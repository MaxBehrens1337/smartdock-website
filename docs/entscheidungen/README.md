# Architektur und Entscheidungen

Diese Übersicht trennt nachgewiesene Umsetzung von offenen Fragen. Eine vorbereitete
Datei oder ein erwähnter Anbieter ist noch keine freigegebene Architektur.

| ID | Frage | Aktueller Stand / nächster Nachweis |
|---|---|---|
| E01 | Wie kommen wir ohne Originalzugang zu wartbarem Code? | Eigener Node-24-Build umgesetzt und über PR #1 auf main übernommen. Lesbare Komponenten werden nach dem [Migrationsplan](../migration/aufbau.md) ergänzt; [#13](https://github.com/Thitronik/smartdock-website/issues/13) bleibt offen. |
| E02 | Brauchen wir ein CMS? | Offen. Typische Seite und FAQ in fünf Sprachen durch Entwurf, Bilder, Vorschau, Freigabe und Rücknahme führen; Dateipflege und CMS vergleichen. |
| E03 | Welches Backend benötigen wir? | Offen. Anfragen, Konfigurationen, Anmeldung und geschützte Downloads samt Daten, Rechten, Aufbewahrung und Wiederherstellung beschreiben. Das MariaDB-Schema ist nur vorbereitet. |
| E04 | Wie funktionieren Newsletter und Anfragen? | Offen. Getrennte Abläufe, Empfänger, Versand, Einwilligungen und Fehlerfälle sowie vorhandene E-Mail-Dienste erfassen. |
| E05 | Wo betreiben wir Website und Dienste? | Offen. Anforderungen E02–E04, vorhandene Verträge, Vorschauen, Zugangsschutz, Teamkosten, Pflege und Rücknahme vergleichen. GitHub Pages dient bereits als Vorschau. |
| E06 | Wer prüft und veröffentlicht? | Merge-Ablauf in [AGENTS.md](../../AGENTS.md). Fachliche Zuständigkeiten, Teamzugriffe, Board und technischer Branchschutz noch offen. |
| E07 | Was ist öffentlich, was geschützt? | Offen. Unterlagen klassifizieren und Vergabe/Entzug von Zugängen bestimmen. Derzeitige PDFs sind öffentlich abrufbar. |

## Noch unbestätigte Arbeitsannahmen

Aus dem bisherigen Briefing stammen Dateipflege mit GitHub-Freigabe, versionierte
Produktdaten und Preise, Supabase als Kandidat für Anmeldung/private Downloads,
Brevo für Newsletter/Anfragen und eine Domain bei Hostinger. Eine automatische
Warenwirtschaftsanbindung ist bisher nicht eingeplant. Diese Punkte sind zu prüfen;
Astro, Netlify, Hostinger, Hetzner, Supabase und Brevo sind keine beschlossene Kombination.
Kontozugang und Vertragslage sind noch zu erfassen.

## Eine Entscheidung vorbereiten

Ein Entscheidungs-Issue sammelt den konkreten Bedarf und eine begründete Empfehlung.
Die technische Vorbereitung übernimmt Codex bzw. das bearbeitende Werkzeug. Das Team
muss keine Anbieterauswahl ohne Kosten-, Betriebs- und Funktionsvergleich treffen.

Eine dauerhafte Entscheidung wird mit der [Vorlage](vorlage.md) als
`NNNN-kurzer-name.md` abgelegt und hier verlinkt. Status, Datum, Quelle/Freigabe und
Konsequenzen müssen erkennbar sein. Vorschläge bleiben als solche markiert. Ersetzte
Entscheidungen bleiben mit Verweis auf ihren Nachfolger erhalten.

Aktuelle Aufgaben stehen in GitHub Issues. Diese Übersicht hält die Architekturfragen,
keine zweite Kopie aller offenen Arbeitspakete. Vertrauliche Verträge, Zugangswerte
und personenbezogene Daten gehören nicht in dieses öffentliche Repository.
