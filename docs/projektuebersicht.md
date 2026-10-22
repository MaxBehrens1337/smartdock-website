# SMARTDOCK: Projektübersicht

Stand: 22. Oktober 2026. **Die gemeinsame Arbeitsbasis liegt auf main.**
Die [veröffentlichte Vorschau und ihre Prüfnachweise](betrieb/vorschau.md) sind
dokumentiert. Die fachliche Gesamtabnahme und der produktive Betrieb stehen noch aus.

## Ziel und Umfang

Marlene, Adrian, Sönke und Max entwickeln die Website gemeinsam über GitHub weiter.
Code, Aufgaben, Entscheidungen und Prüfbelege sollen auch bei einem Wechsel zwischen
Menschen, Codex und Claude Code nachvollziehbar bleiben. Fachliche Zuständigkeiten
und GitHub-Benutzernamen sind noch zuzuordnen.

Die vollständige bestehende Staging-Website ist die fachliche und gestalterische
Ausgangsbasis: Produktinformationen, Funktionen, Einbau, FAQ, Händlersuche,
Konfigurator, Position Hold, Downloads, Kontakt und Rechtstexte. Kleine Arbeitspakete
verkleinern diesen Umfang nicht. Bestätigte Fehler werden korrigiert.

Die Sprachen sind **Deutsch, Englisch, Französisch, Niederländisch und Spanisch**.
Italienisch gehört nicht dazu. Zusätzlich ist ein geschützter Bereich für Unterlagen
und Downloads vorgesehen; Zugangsregeln und Umsetzung sind offen.

## Tatsächlicher Stand

| Bereich | Vorhanden | Noch offen |
|---|---|---|
| Website | 116 HTML-Einstiege aus gemeinsamem Gerüst, zwei Anwendungseinstiege, öffentliche Medien und JSON-Inhalte | Vollständige Inhalts- und Interaktionsabnahme |
| Quellcode | Eigenständiger Node-24-Build; Quellen und erzeugte Dateien getrennt | Noch kompilierte React-Anwendungspakete durch lesbare Komponenten ersetzen ([#13](https://github.com/Thitronik/smartdock-website/issues/13)) |
| GitHub | Main-Arbeitsbasis, Staging-Vorschau, PR-Prüfungen auf Windows/Linux, gemeinsame Arbeitsregeln | Teamzugriffe, fachliche Zuständigkeiten, Board und Branchschutz |
| FAQ / Navigation | Sechs FAQ-Tippfehler und CH-Weiterleitungen korrigiert und veröffentlicht | Weitere Inhalte und Abläufe prüfen |
| Konfigurator | Auswahl, Modulzuordnung, Preise und PDF-Ausgabe; erste Prüffälle dokumentiert | Preisfreigabe [#5](https://github.com/Thitronik/smartdock-website/issues/5), PDF-Beschriftung [#11](https://github.com/Thitronik/smartdock-website/issues/11) |
| Sprachen | DE/EN/FR/NL/ES vorhanden | Rückfälle und Titel [#9](https://github.com/Thitronik/smartdock-website/issues/9), vollständige Sprachprüfung |
| Formulare | Oberflächen und lokale Vorschauabläufe | Zustellung, Einwilligungen, Fehlerbehandlung und Missbrauchsschutz |
| Backend | Historische Schnittstellenaufrufe im Export; [Installation des MariaDB-Schemas auf Hetzner dokumentiert](../database/README.md), fünf leere Tabellen laut Installationsnachweis | Anwendungsarchitektur und Betrieb festlegen; Backend, Double-Opt-in und Mailversand noch nicht angebunden oder getestet |
| Redaktion / Hosting | Dateibasierte Inhalte und GitHub Pages als Vorschau | CMS-Bedarf und Produktionshosting entscheiden |
| Downloads / Rechtliches | Öffentliche PDFs und vorhandene Rechtstext-Seiten | Downloadschutz, fachliche Prüfung von Produktangaben, Impressum und Datenschutz |

Die [Bestandsaufnahme](pruefung/bestandsaufnahme-2026-10-21.md) und ihre CSV-Dateien
sind datierte Belege zum ursprünglichen Export. Sie sind kein aktuelles Aufgabenboard.
Die [offenen Issues](https://github.com/Thitronik/smartdock-website/issues) enthalten
den laufenden Bearbeitungsstand.

## Als Nächstes

1. Den gemeinsamen [AI-First-Ablauf](arbeitsweise/ai-first.md) für kleine, prüfbare
   Änderungen verwenden. Jede Aufgabe bekommt Ziel, Quellen und Fertig-Kriterien.
2. Die bestätigten Qualitätsbefunde bearbeiten und Preis-/Produktregeln fachlich klären.
   Bekannte Ist-Werte bleiben von freigegebenen Soll-Werten getrennt.
3. Aus den erforderlichen Abläufen begründete Empfehlungen für CMS, Backend,
   Formularversand und Hosting vorbereiten; siehe [Entscheidungen E01–E07](entscheidungen/README.md).
4. Die lesbaren Quellen schrittweise ausbauen und gegen den vorhandenen Umfang prüfen.
   Danach Veröffentlichung und Betrieb einschließlich Rücknahme vorbereiten.

Astro, Netlify, Hostinger, Hetzner, Supabase und Brevo bilden bisher **keine beschlossene
Gesamtarchitektur**. Experimente in anderen Repositories werden erst durch eine
ausdrückliche Auswahl zur Quelle dieses Projekts.

## Abnahme für einen produktiven Start

Die [Gesamtabnahme #6](https://github.com/Thitronik/smartdock-website/issues/6) führt
die offenen Arbeitspakete. Zum Ziel gehören:

- Alle vereinbarten Seiten und fünf Sprachfassungen einschließlich Navigation und Metadaten.
- Bestätigte Preis- und Produktregeln; Bildschirm, PDF und Server liefern konsistente Ergebnisse.
- Funktionierende Kontakt-/Konfigurationsanfragen und der beschlossene Newsletter-Ablauf.
- Tatsächlicher Zugangsschutz für als geschützt eingestufte Downloads.
- Geprüfte URLs, mobile Bedienung, Tastaturbedienung und verständliche Fehlerfälle.
- Fachlich geprüfte Unternehmensangaben, Rechtstexte und Datenflüsse.
- Benannte Verantwortung für Veröffentlichung, laufenden Betrieb und Wiederherstellung.

Die technische Prüfung eines PRs ersetzt keine fachliche oder rechtliche Freigabe.
