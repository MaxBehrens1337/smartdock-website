![SMARTDOCK – Navigate in Control](docs/assets/smartdock-banner.png)

# SMARTDOCK Website

Gemeinsamer Website-Stand und Stage-Vorschau für das Marketing-Team.

**Einstieg:** [Projektübersicht und nächste Schritte](docs/projektuebersicht.md)
mit Bestand, vollständigem Staging-Umfang und offenen Entscheidungen.

- [Staging-Vorschau](https://thitronik.github.io/smartdock-website/)
- [Zusammenarbeit und Veröffentlichung](TEAM-WORKFLOW.md)
- [Dokumentierter Stand der Vorschau](PAGES-STATUS.md)

- `src/`, `content/`, `public/`: bearbeitbare Quellen und öffentliche Medien.
- `vendor/website/`: vorläufig übernommene kompilierte Anwendungspakete.
- `dist/`, `_site/`: erzeugte Vorschauen; nicht versioniert.
- `staging`: Arbeitsstand für GitHub Pages. Änderungen lösen den Pages-Workflow aus.
- `main`: freigegebene Stände; keine automatische Hetzner-Veröffentlichung.
- `.github/workflows/stage-pages.yml`: prüft und baut die Vorschau für GitHub Pages.

Ausgangsstand: SMARTDOCK-Nachbau Version 7, ursprünglicher Sites-Commit `dfc2867dbbf38c536b01fe62d02bfe4dc62f6104`. Dies ist kein ursprünglicher unkompilierter Hostinger-Projektexport.

Newsletter, Kontakt und Konfigurationen befinden sich weiterhin im Vorschaumodus. Keine Zugangsdaten oder Kundendaten einchecken.

## Lokal starten

Mit Node 24:

```sh
npm ci
npm run check
npm run preview
```

Vorschau: `http://127.0.0.1:4173/`. Nach Änderungen neu bauen und den Browser neu laden.
Für den GitHub-Projektpfad: `npm run preview:pages`, dann `http://127.0.0.1:4174/smartdock-website/`.

Der eigene Build benötigt keinen ursprünglichen Hostinger-Zugang. Die alten Anwendungspakete
sind damit noch keine lesbaren Originalkomponenten. Grenzen und nächste Schritte stehen im
[Aufbau- und Migrationsplan](docs/migration/aufbau.md). Gemeinsame Regeln: [AGENTS.md](AGENTS.md).

## Bestandsaufnahme und Qualität

- [Bestandsaufnahme, Seitenverzeichnis und Weg zu main](docs/pruefung/bestandsaufnahme-2026-10-21.md)
- [Konfigurator: beobachtete Preise und offene Prüffälle](docs/pruefung/konfigurator-prueftabelle.md)
- [Aufgaben für die gemeinsame Arbeitsbasis](https://github.com/Thitronik/smartdock-website/issues/6)
