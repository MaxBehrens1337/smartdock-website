![SMARTDOCK – Navigate in Control](docs/assets/smartdock-banner.png)

# SMARTDOCK Website

Gemeinsame Arbeitsbasis für **Marlene, Adrian, Sönke und Max**. GitHub hält Code,
Aufgaben, Entscheidungen und Prüfnachweise zusammen. Codex und Claude Code arbeiten
nach denselben [Regeln](AGENTS.md).

**Stand:** Die vollständige übernommene Website liegt seit PR #1 auf `main`.
Der eigene Build funktioniert ohne Hostinger-Zugang. Teile der Anwendung sind noch
kompiliert; der [Migrationsplan](docs/migration/aufbau.md) beschreibt ihren Ersatz.
Die Website ist weiterhin eine Testvorschau mit offenen fachlichen Prüfungen.

| Ich möchte … | Einstieg |
|---|---|
| die Website ansehen | [Staging-Vorschau](https://thitronik.github.io/smartdock-website/) |
| verstehen, was wir bauen | [Projektübersicht](docs/projektuebersicht.md) |
| etwas ändern oder mit KI bearbeiten | [Zusammenarbeit](CONTRIBUTING.md) und [AI-First-Arbeitsweise](docs/arbeitsweise/ai-first.md) |
| einen Fehler oder Auftrag erfassen | [GitHub-Aufgabe anlegen](https://github.com/Thitronik/smartdock-website/issues/new/choose) |
| die nächste Arbeit auswählen | [Offene Aufgaben](https://github.com/Thitronik/smartdock-website/issues) |
| eine technische Entscheidung nachvollziehen | [Entscheidungsübersicht](docs/entscheidungen/README.md) |
| etwas im Repository finden | [Dokumentations- und Quellenübersicht](docs/README.md) |

## Lokal starten

Mit Node 24:

```sh
git fetch --all --prune
npm run doctor
npm ci
npm run check
npm run preview
```

Vorschau: `http://127.0.0.1:4173/`. Nach Änderungen neu bauen und den Browser neu laden.
Für den GitHub-Projektpfad: `npm run preview:pages`, dann `http://127.0.0.1:4174/smartdock-website/`.

`doctor` liest den lokalen Git-Stand und nennt offene Änderungen sowie Unterschiede
zwischen den zuletzt abgerufenen Branches. `check` prüft Repository, Tests und beide
Website-Builds. Alle [Befehle und Grenzen](CONTRIBUTING.md) sind dokumentiert.

## Veröffentlichung

`staging` veröffentlicht die [GitHub-Pages-Vorschau](docs/betrieb/vorschau.md).
`main` enthält übernommene Arbeitsstände und veröffentlicht keine Produktionsseite.
Newsletter, Kontakt und Konfigurationen bleiben Vorschauabläufe.

Produktionshosting, CMS und Backend sind noch offen. Die vorbereitete
[Datenbankmigration](database/README.md) ist keine aktive Anbindung.
