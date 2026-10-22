# AI First bei SMARTDOCK

Für dieses Projekt bedeutet AI First: Menschen beschreiben gewünschtes Verhalten;
Codex oder Claude Code finden den relevanten Kontext, setzen Änderungen um und liefern
prüfbare Ergebnisse. Der Projektstand bleibt in GitHub verständlich, auch wenn die
Person oder das KI-Werkzeug wechselt. KI-Funktionen für Website-Besucher wären eine
eigene Produktentscheidung.

## Der wiederholbare Ablauf

**Issue → Quellen → Änderung → Prüfung → Pull Request → Vorschau → übernommener Stand.**

Die [Arbeitsregeln](../../AGENTS.md) gelten für beide Werkzeuge. Befehle und Branch-Ablauf
stehen in [CONTRIBUTING.md](../../CONTRIBUTING.md). `npm run --silent doctor -- --json` liefert
maschinell lesbare lokale Git-Fakten; die [Quellenübersicht](../README.md) zeigt den
jeweiligen Bearbeitungsort. Diese Anleitung ergänzt die Regeln durch Beispiele.

Ein guter Auftrag beantwortet vier Fragen:

| Frage | Beispiel |
|---|---|
| Was soll sich ändern? | Die PDF-Zwischensumme soll denselben Betrag korrekt bezeichnen wie der Bildschirm. |
| Wo sieht man das Problem? | Issue #11, Konfigurator, Deutschland, eine Ankerwinde, kein Einbau. |
| Welche Quelle gilt? | Beobachteter PDF-/Bildschirmvergleich; ungeklärte Preisregeln bleiben in Issue #5. |
| Wann ist es fertig? | Beschriftung in fünf Sprachen geprüft; Bildschirm/PDF verglichen; keine ungeprüfte Preisänderung. |

Technische Dateinamen muss der Auftraggeber nicht vorab kennen. Das Werkzeug liest
die passenden Quellen, prüft vorhandene Arbeit und nennt die tatsächlich betroffenen
Dateien im PR. Die [GitHub-Vorlagen](https://github.com/Thitronik/smartdock-website/issues/new/choose)
führen durch Aufgabe, Fehlerbericht oder Entscheidung.

## Was die KI übernimmt

- Bestand untersuchen, Widersprüche sichtbar machen und konkrete Lösungsvorschläge ausarbeiten.
- Kleine Änderungen einschließlich passender Tests und Browsernachweise umsetzen.
- Bei Entscheidungen eine begründete Empfehlung vorbereiten: Alternativen, Kostenannahmen,
  Pflegeaufwand, Datenflüsse und überprüfbarer Versuch statt einer bloßen Anbieterliste.
- Fachliche Aussagen mit Quelle, Datum und Prüfstatus versehen. Eine fehlende Quelle
  bleibt eine offene Frage und wird nicht durch eine erfundene Antwort ersetzt.
- Den erreichten Stand, verbleibende Einschränkungen und den nächsten sinnvollen Schritt
  im Issue/PR hinterlassen.

Menschen bringen Fachwissen und Prioritäten ein. Preise, Produktsicherheit, Rechtstexte,
Verantwortlichkeiten und Veröffentlichung bleiben bewusst prüfbare Entscheidungen.
Automatisch grüne Tests allein bescheinigen keine fachliche Richtigkeit.

## Gute nächste Schritte für die Website

Die größte technische Hürde sind derzeit die übernommenen Anwendungspakete unter
`vendor/website/`. Eine KI kann dort suchen, doch kleine lesbare Komponenten und
gemeinsame Daten machen Änderungen besser prüfbar.

Der [Migrationsplan](../migration/aufbau.md) führt deshalb über bestätigte Produkt-/Preisregeln,
gemeinsame Oberfläche und Sprachinhalte zum Konfigurator und seinen Schnittstellen.
Neue Teile erhalten klare Eingaben, erwartete Ergebnisse und gezielte Prüfungen.
Alte Pakete entfallen erst, wenn ihr Verhalten übernommen und verglichen wurde.

Für Inhalte prüfen wir zunächst einen vollständigen redaktionellen Ablauf mit dem Team:
Änderung beschreiben, Entwurf, fünf Sprachen, Vorschau, Freigabe, Rücknahme. Daraus
entsteht die [CMS-Entscheidung E02](../entscheidungen/README.md). Ob dafür ein CMS
hilft, entscheidet die tatsächliche Arbeit im Team.

## Kurzer Startauftrag

> Bearbeite Issue #… im Repository Thitronik/smartdock-website. Lies AGENTS.md,
> prüfe den aktuellen Git-Stand und offene PRs. Finde die betroffenen Quellen anhand
> von docs/README.md. Setze eine kleine, überprüfbare Änderung um, führe die passenden
> Prüfungen aus und lege einen PR mit Ergebnis, Belegen und offenen Punkten vor.

Der Auftrag ergänzt das Issue; er ersetzt dessen Fertig-Kriterien nicht. Ein weiteres
KI-Werkzeug sollte am GitHub-Stand anknüpfen können, ohne den bisherigen Chat zu lesen.
