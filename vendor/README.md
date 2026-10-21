# Übernommene Website-Pakete

`website/assets/` enthält sechs bereits kompilierte JavaScript-/CSS-Dateien aus dem SMARTDOCK-Nachbau Version 7. Das Hauptbündel enthält zusätzlich den geprüften CH-Weiterleitungsfix aus PR #10. Die vorhandenen Lizenzhinweise bleiben erhalten.

Diese Dateien werden beim Build unverändert für die Root-Vorschau übernommen; für GitHub Pages werden ausschließlich die bisherigen Pfadanpassungen angewandt. Sie sind keine wiederhergestellten React-Komponenten und werden nicht aus ursprünglichen Quellen neu kompiliert.

Die lesbare Modulzuordnung liegt in `src/module-allocation.js`, die Vorschauanbindung in `src/preview.js`. Der schrittweise Ersatz der übrigen Pakete steht in [Aufbau und Migration](../docs/migration/aufbau.md).
