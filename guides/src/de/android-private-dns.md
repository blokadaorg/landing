---
title: Werbung auf Android mit Privatem DNS blockieren
description: Mit Androids Einstellung „Privates DNS“ und Blokada Cloud Werbung und Tracker in allen Apps blockieren, im WLAN und mobil, ganz ohne App.
updated: 2026-09-23
order: 4
---

Android 9 und neuer hat die Einstellung *Privates DNS*. Trägst du dort Blokada Cloud ein, werden Werbung und Tracker in allen Apps und in jedem Netz blockiert, ohne dass eine App im Hintergrund läuft.

Deine Adresse für Privates DNS: {% dot %}

## Die meisten Android-Handys

1. Öffne *Einstellungen → Netzwerk & Internet*. Auf manchen Handys heißt das *Verbindungen* oder *Connection & sharing*.
2. Tippe auf *Privates DNS*. Auf Samsung-Handys findest du es unter *Weitere Verbindungseinstellungen*.
3. Wähle *Hostname des privaten DNS-Anbieters*.
4. Gib {% dot %} ein und tippe auf *Speichern*.

Findest du die Einstellung nicht, suche in den Einstellungen nach „Privates DNS“.

## Prüfen, ob es funktioniert

Öffne ein paar Apps oder Websites und sieh dir dann die Seite *Activity* im [Dashboard](https://app.blokada.org/stats?src=guides) an. Dort erscheinen die Anfragen dieses Handys.

## Wenn etwas nicht klappt

- **„Verbindung nicht möglich“ oder kein Internet:** Prüfe die Adresse auf Tippfehler. Sie muss genau wie oben angezeigt eingegeben werden, ohne `https://`.
- **Eine andere VPN-App ist aktiv:** Manche VPN-Apps nutzen ihr eigenes DNS und umgehen Privates DNS. Schalte das DNS oder den Werbeblocker in der VPN-App aus oder nutze stattdessen Blokada 6.
- **Chrome zeigt weiter Werbung:** Öffne in Chrome *Einstellungen → Datenschutz und Sicherheit → Sicheres DNS verwenden* und wähle *Use current service provider*.

<div class="note">

Lieber eine App? [Blokada 6](https://blokada.org/#download) richtet das für dich ein und zeigt die Aktivität direkt auf dem Handy.

</div>
