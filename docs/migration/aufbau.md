# Eigenständig baubarer Aufbau ohne ursprüngliches Quellprojekt

Stand: 21. Oktober 2026. Max hat bestätigt, dass die ursprüngliche Bauanleitung bzw. der Zugang nicht verfügbar ist. Die vorhandene Staging-Website bleibt der vollständige Ausgangspunkt.

Ursprung: SMARTDOCK-Nachbau Version 7, ursprünglicher Sites-Commit `dfc2867dbbf38c536b01fe62d02bfe4dc62f6104`. Dies ist kein ursprünglicher unkompilierter Hostinger-Projektexport.

## Entscheidung und Grenze

Wir stellen einen eigenen reproduzierbaren Build um den vorhandenen Export her und ersetzen dessen kompilierte Teile anschließend schrittweise. Für diesen ersten Schritt reicht Node 24 ohne zusätzliche npm-Pakete. Ein Wechsel zu Astro oder einem anderen Framework ist dafür nicht nötig und wurde nicht beschlossen.

**Das ist ein gepflegtes Übergangsprojekt, keine Rekonstruktion der ursprünglichen React-Komponenten.** Navigation, Konfigurator, Preise und viele Seitentexte stecken weiter in den übernommenen Paketen unter `vendor/website/`. JSON-Inhalte, Seitenhülle, Routen, Vorschauanbindung und Modulzuordnung haben dagegen bereits eigene bearbeitbare Quellen.

Der Build benötigt keinen Hostinger-Zugang, kein ursprüngliches Backend und keine Secrets. Zur Laufzeit vorhandene externe Dienste wie Vimeo, Google Fonts und die Karte bleiben Teil der gesonderten Prüfung.

## Wo Änderungen stattfinden

| Aufgabe | Quelle | Erzeugte Ausgabe |
|---|---|---|
| FAQ, Händler, Anleitungen, vorhandene Übersetzungsdaten | `content/*.json` | `data/*.json` |
| HTML-Hülle und Hinweis auf die Vorschau | `src/page.html` | 116 HTML-Einstiege |
| Vorhandene URL-Einstiege und Anwendungsauswahl | `src/routes.json`, `src/apps.json` | jeweilige `index.html` |
| Vorschauanbindung | `src/preview.js` | `preview.js` |
| Lesbare Modulzuordnung | `src/module-allocation.js` | `assets/module-allocation.js` |
| Öffentliche Bilder und PDFs | `public/` | dieselben relativen URLs |
| Noch kompilierte Anwendung und CSS | `vendor/website/assets/` | `assets/` |
| Build, Prüfungen, lokaler Server | `tools/` | werden nicht veröffentlicht |

`dist/` ist die erzeugte Root-Vorschau, `_site/` die Vorschau unter `/smartdock-website`. Beide Verzeichnisse sind ignoriert. Die historischen Bestandslisten mit `dist/...` bleiben als datierte Belege erhalten.

## Lokal arbeiten

```sh
npm ci
npm run check
npm run preview
```

Root-Vorschau: `http://127.0.0.1:4173/`. Für die Pages-Variante in einem zweiten Terminal:

```sh
npm run preview:pages
```

Pages-Vorschau: `http://127.0.0.1:4174/smartdock-website/`. Nach Änderungen erneut `npm run check` oder gezielt `npm run build` / `npm run build:pages` ausführen und den Browser neu laden. Der Server liefert ausschließlich die erzeugte Website aus; er ist kein Produktivserver und nimmt keine Anfragen entgegen.

## Belege für die Übernahme

- Basis: Commit `fe9fcfafb70026d197c7dab77068451577dcff03` aus PR #10, ergänzt um die sechs FAQ-Korrekturen aus PR #4.
- Alle 116 bisherigen HTML-Einstiege werden aus einer gemeinsamen Vorlage erzeugt. Die zwei Anwendungseinstiege und ursprünglichen HTML-Sprach-/Zeilenformate bleiben zunächst erhalten.
- `npm run verify:reference` vergleicht alle 186 Root-Dateien und 187 Pages-Dateien über Git-Blob-Prüfsummen. Die Pages-Referenz wurde unabhängig mit der bisherigen Python-Transformation erzeugt, mit Linux-Textzeilen wie im bisherigen Workflow.
- Die historische Referenz liegt in `export-reference.json`. FAQ-Korrekturen werden als ausdrücklich enthaltene Änderung separat ausgewiesen. Künftige gewollte Änderungen dürfen den historischen Vergleich verändern; die Referenz wird nicht still auf den neuen Stand gesetzt.
- `npm run check` prüft beide Builds, JSON, alle JavaScript-Dateien, lokale Ressourcen der HTML-Hüllen, PDF-Kennungen, FAQ-Sprachfelder sowie die 60 CH-Weiterleitungsfälle. Tests prüfen unter anderem Pfadgrenzen, Navigation und deterministische Ausgabe.
- CI führt diese Prüfung unter Linux und Windows aus und stellt die gebaute Pages-Vorschau als herunterladbares Artefakt bereit. Ein PR veröffentlicht keine neue Website. Erst ein Merge nach staging aktiviert den vorhandenen Pages-Deploy.

Die Projektgrundlage mit Banner (#2), die FAQ-Korrekturen (#4), der Prüfbericht (#7) und die Weiterleitungskorrektur (#10) wurden über PR #12 mit erhaltener Commit-Historie zusammengeführt und über PR #1 nach main übernommen. Die [veröffentlichte Vorschau](../betrieb/vorschau.md) dokumentiert die Nachprüfung.

Lokale Browser-Stichproben nach dem Neubau: Startseite unter Root und Pages, FAQ-Daten und korrigierte Formulierung „Verbundene Geräte“, CH-FAQ-Weiterleitung mit Query/Hash, die fünf Sprach-Startseiten, eigenständiges CH-Position-Hold sowie Navigation Startseite → Position Hold → Konfigurator unter Pages. Der Preisfall Deutschland/eine Ankerwinde/kein Einbau zeigt weiterhin ACU und 1.450,00 €. Das ist ein technischer Vergleich, keine Preisfreigabe.

## Nächste Migration in überschaubaren Schritten

1. **Zentrale Produkt- und Preisdaten:** Preise, Länderregeln und Rabattregeln mit fachlicher Quelle erfassen; erst dann aus dem Bündel herauslösen. Bildschirm und PDF vergleichen (#5, #11).
2. **Gemeinsame Oberfläche und Sprachen:** Navigation, Fußbereich und Seitentexte als lesbare Komponenten und Inhalte übernehmen. Pro Seitenfamilie alte und neue Darstellung auf Desktop/Mobil sowie in allen fünf Sprachen vergleichen; bekannte Sprachbefunde #9 lösen.
3. **Konfigurator ersetzen:** Bestehende Auswahlfälle und Modulbelegung als Verhaltenstests absichern; anschließend den gebündelten Konfigurator ersetzen. Keine alten Berechnungen als ungeprüfte fachliche Sollwerte übernehmen.
4. **Backend und Redaktion:** Auf Basis der bestätigten Abläufe eine begründete Empfehlung zu Formularversand, CMS-Bedarf und Hosting vorlegen. Der aktuelle Build kann bis dahin auf der bestehenden Pages-Vorschau laufen.

Ein Paket wird erst entfernt, wenn kein Einstieg es mehr benötigt. Bekannte Rechts-, Preis-, Sprach- und Formularprobleme bleiben bis zur jeweiligen Abnahme offen. Ein baubarer Stand ist keine Produktionsfreigabe.

Während des Aufbaus kamen auf staging die Commits `9e09cf0` und `f84a0cc` mit einer vorbereiteten MariaDB-Migration hinzu. [Schema und Importhinweise](../../database/README.md) sind unverändert übernommen. Sie werden nicht in die Website-Ausgabe kopiert und wurden im Rahmen dieses Aufbaus nicht auf einer Datenbank ausgeführt oder fachlich als Backend-Entscheidung freigegeben.

Technische Grundlage des Workflows: [GitHub Pages mit eigenen Workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Node-Dateisystem-API](https://nodejs.org/docs/latest-v24.x/api/fs.html).
