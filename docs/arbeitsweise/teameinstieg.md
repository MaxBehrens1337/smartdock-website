# Mit SMARTDOCK anfangen

Für Marlene, Adrian, Sönke und Max sowie ihre Codex- und Claude-Code-Agenten.
Der erste Auftrag darf in normaler Sprache stehen. Dateinamen, Git-Befehle und
die technische Lösung muss niemand vorab kennen. Die gemeinsame Arbeitsquelle ist
[Thitronik/smartdock-website](https://github.com/Thitronik/smartdock-website).

## Die wenigen Begriffe, die ihr braucht

| Begriff | Bedeutung bei uns |
|---|---|
| Repository / Repo | Gemeinsame Ablage von Website, Anleitungen und Änderungsgeschichte |
| Issue | Ein Auftrag mit Problem, Ziel, zuständiger Person und Fertig-Kriterien |
| Branch | Ein Arbeitszweig, auf dem eine Änderung vorbereitet wird |
| Commit | Ein gespeicherter Änderungsstand mit eindeutiger Kennung |
| Pull Request / PR | Ein Änderungsvorschlag mit Vergleich, Prüfbelegen und Freigabe |
| Merge | Übernahme eines PRs in seinen Zielbranch |
| CI / Checks | Automatische Prüfungen; sie ersetzen die fachliche Abnahme nicht |

**Dauerhaft bleiben `main` und `staging`.** `main` enthält den übernommenen Stand;
`staging` veröffentlicht die [Testvorschau](https://thitronik.github.io/smartdock-website/).
Weitere Branches sind zeitweilige Arbeitsplätze für offene Aufgaben. Mehrere aktive
Aufgaben dürfen mehrere Arbeitsbranches haben. Nach vollständiger Übernahme und
Prüfung werden erledigte Arbeitszweige entfernt; ihre Änderungen bleiben in der
Historie. Ein geschlossener PR allein beweist noch keine Übernahme.

Der Weg einer Änderung lautet: **Arbeitsbranch → PR nach staging → Vorschau prüfen
→ PR nach main**. Die Freigaberegel steht in [AGENTS.md](../../AGENTS.md).
`main` ist aktuell noch kein automatisches Produktionsdeployment.

## Erster Arbeitstag

1. Mit einem eigenen GitHub-Konto auf das Repository zugreifen. Max benötigt die
   GitHub-Benutzernamen des Teams, um Rechte zuzuordnen. Ein Agent nutzt die
   Verbindung der jeweiligen Person; gemeinsam verwendete Passwörter sind kein
   Teamzugang. Leserechte bedeuten noch keine Schreibrechte.
2. Das Repository als eigenes Projekt in Codex oder Claude Code öffnen. Auf einem
   neuen Rechner zuerst klonen, anschließend diesen Ordner öffnen:

   ```sh
   git clone https://github.com/Thitronik/smartdock-website.git
   cd smartdock-website
   ```

   Bei einer vorhandenen Kopie diese verwenden. Der Agent prüft den tatsächlichen
   Projektordner und `origin`. Ein offenes Projekt namens Campus Online ist eine
   andere Website und liefert weder unsere Regeln noch unsere Zugänge.
3. Git und Node 24 bereitstellen. Danach führt der Agent die Start- und
   Prüfkommandos aus [CONTRIBUTING.md](../../CONTRIBUTING.md) aus.
4. Ein vorhandenes [Issue](https://github.com/Thitronik/smartdock-website/issues)
   auswählen. Bearbeiter, Ziel und betroffene Bereiche dort festhalten und offene
   PRs abgleichen, bevor eine zweite Person dieselbe Änderung beginnt.
5. Mit einem kleinen Auftrag anfangen, etwa einer bestätigten Textkorrektur.
   Der Agent liefert einen PR mit Vorschau-/Prüfbelegen. Der erste Durchlauf
   soll auch die persönliche GitHub-Schreibverbindung überprüfen.

## Gleichzeitig arbeiten

Jede Person arbeitet in ihrer eigenen lokalen Kopie. Laufen zwei Agenten gleichzeitig
auf einem Rechner, brauchen sie getrennte Checkouts oder Git-Worktrees. Zwei Branches
im selben geöffneten Ordner trennen die Dateien nicht: Ein Branchwechsel würde beide
Agenten betreffen. Fremde Änderungen bleiben erhalten.

Eine Person führt ein Issue; weitere Mitarbeit wird dort abgestimmt. Betreffen zwei
Aufgaben dieselben Dateien oder dieselben Preis-/Übersetzungsregeln, zuerst die
Reihenfolge bzw. Abhängigkeit im Issue/PR klären. Ein offener PR kann die Lösung schon
enthalten. Nach einer Unterbrechung liest der nächste Agent Issue, PR und die aktuellen
Repository-Regeln; privates Chatwissen ist keine Voraussetzung.

## Design und Funktionen bewahren

Die bestehende Staging-Website ist der Ausgangspunkt. Zum Umzug gehören alle bisherigen
Seiten, Funktionen und fünf Sprachen. Ein neues Hosting oder Backend rechtfertigt weder
ein neues Erscheinungsbild noch das Weglassen eines Ablaufs. Ein bestätigter Tippfehler
darf korrigiert werden; ungeklärte Preisregeln brauchen eine fachliche Quelle.

Für betroffene Oberflächen und Abläufe hält der PR fest:

- Ausgangs-Commit, URL, Sprache und Bildschirmgröße sowie dieselben Eingaben vor/nach
  der Änderung; Screenshots für Desktop und Mobil bei sichtbaren Änderungen.
- Geprüftes Verhalten, etwa Navigation, Auswahlzustand, Bildschirm-/PDF-Summe,
  Formularfehler, Bestätigung, Downloads und Rückwärtsnavigation – soweit betroffen.
- Gewollte Korrekturen und jede verbleibende Abweichung. Fehlende Prüffälle bleiben
  ausdrücklich offen. Ein grüner Build oder ein einzelner Screenshot beweist keine
  vollständige Übereinstimmung der Website.

Die [Bestandsaufnahme](../pruefung/bestandsaufnahme-2026-10-21.md) hält den übernommenen
Export fest; aktuelle Abnahme und bekannte Fehler stehen in
[#6](https://github.com/Thitronik/smartdock-website/issues/6). Der vollständige
Horizons-Originalquellcode liegt nicht vor. Übernommene Anwendungspakete werden gemäß
[Migrationsplan](../migration/aufbau.md) schrittweise ersetzt und verglichen.

## Startauftrag zum Kopieren

> Wir arbeiten an Thitronik/smartdock-website. Prüfe zuerst Projektordner und origin,
> lies AGENTS.md und CONTRIBUTING.md und führe den dort beschriebenen Startcheck aus.
> Bearbeite Issue #…: [Problem oder gewünschtes Ergebnis in meinen Worten].
> Prüfe offene PRs und bereits vorhandene Lösungen. Halte Design, Funktionen und
> fünf Sprachen entsprechend der Projektgrundlage erhalten; korrigiere den genannten
> Fehler gezielt. Arbeite in einem eigenen Arbeitszweig, prüfe die Änderung und lege
> einen kleinen PR nach staging mit Belegen und offenen Punkten vor. Halte das Issue
> aktuell, damit eine andere Person mit ihrem Agenten übernehmen kann.

Bei einem Fehler helfen URL, Sprache und die Schritte bis zum Problem. Weitere
[Auftragsbeispiele](ai-first.md) und die GitHub-Issue-Vorlagen ergänzen diesen Einstieg.

Der [Startplan #20](https://github.com/Thitronik/smartdock-website/issues/20) hält die
offenen Betriebsentscheidungen und Zugänge zusammen. Aufgabenstand und Verantwortliche
werden dort gepflegt, nicht in einer zweiten privaten Liste.
