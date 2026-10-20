# SMARTDOCK: Zusammenarbeit und Veröffentlichung

## Arbeitsweise

- `main` enthält freigegebene Stände. Ein Merge veröffentlicht nichts automatisch.
- `staging` sammelt Änderungen für die gemeinsame Prüfung. Ein Branch allein ist noch keine aufrufbare Vorschau.
- Änderungen erfolgen in eigenen Branches und werden per Pull Request geprüft.
- Vor jedem Upload auf Hetzner muss der genaue Quellstand auf GitHub gespeichert sein.
- Zuerst Stage prüfen; Live-Veröffentlichung erfolgt erst nach ausdrücklicher Freigabe.
- Keine Passwörter, Tokens, Kundendaten oder Datenbankexporte einchecken.
- Vor parallelen Änderungen aktuellen Stand laden und fremde Änderungen erhalten.

## Ausgangsstand

Vorgesehene Quelle: bestehender SMARTDOCK-Nachbau, Sites Version 7, Commit `dfc2867dbbf38c536b01fe62d02bfe4dc62f6104`.
Dieser Nachbau ist kein ursprünglicher unkompilierter Hostinger-Export.
Der Website-Code wurde noch nicht in dieses Repository importiert.

## Noch einzurichten

- Website-Quellcode übernehmen und bestehende Prüfungen ausführen.
- Stage-Vorschau vor Hetzner-Upload einrichten.
- Getrennte Hetzner-Testumgebung mit Testdaten für PHP/DB/SMTP.
- Live-Deployment mit dokumentiertem Rückweg.
- Branchschutz und Teamzugriffe prüfen und einrichten.

Newsletter und Konfigurationsanfragen bleiben Vorschau-Funktionen, bis das produktive Backend implementiert und geprüft ist.
