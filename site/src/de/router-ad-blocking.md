---
title: Werbung im ganzen Netzwerk blockieren mit einem Router-Werbeblocker
description: Richte Blokada Cloud einmal im Router ein und blockiere Werbung auf allen Geräten in deinem Zuhause, auch auf Smart-TV, Spielkonsole und Smart Speaker.
updated: 2026-10-09
order: 4
---

Jedes Gerät in deinem Netzwerk fragt den Router, welchen DNS-Server es nutzen soll. Stellst du den Router auf Blokada Cloud um, werden Werbung und Tracker für alles dahinter blockiert. Dazu gehören Smart-TVs, Spielkonsolen, Streaming-Sticks und Smart-Home-Geräte, auf denen kein Platz für eine Werbeblocker-App ist.

## Was dein Router können muss

Es gibt zwei Wege, einen Router einzurichten:

- **Verschlüsseltes DNS mit Hostnamen**, also DNS over TLS (DoT) oder DNS over HTTPS (DoH). Viele neuere Router können das, darunter die Modelle unten. Je nachdem, was dein Router unterstützt, brauchst du deinen DNS-Namen oder deinen DoH-Link. Beide stehen oben unter _Deine Daten_.
- **Eine einfache IPv6-DNS-Adresse.** Viele Router von Internetanbietern akzeptieren für DNS nur einfache IP-Adressen. Ist das bei dir so und hat dein Anschluss IPv6, gibt dir Blokada eine IPv6-Adresse zum Eintragen. Siehe [Router, die nur eine IP-Adresse annehmen](#router-die-nur-eine-ip-adresse-annehmen).

Nutze verschlüsseltes DNS, wenn dein Router es unterstützt. Dann bleiben deine Anfragen auf dem Weg zu Blokada privat.

## FRITZ!Box

FRITZ!OS 7.20 oder neuer.

1. Öffne `http://fritz.box`, gehe zu _Internet → Zugangsdaten_ und dann auf die Registerkarte _DNS-Server_.
2. Aktiviere die Option _Verschlüsselte Namensauflösung im Internet (DNS over TLS)_.
3. Trage im Eingabefeld _Auflösungsnamen der DNS-Server_ nur {% dot %} ein. **Entferne alle anderen Einträge.** Die FRITZ!Box nutzt alle eingetragenen Resolver, und jeder andere lässt Werbung durch.
4. Setze den Haken bei _Zertifikatsprüfung für verschlüsselte Namensauflösung im Internet erzwingen_ und entferne ihn bei _Fallback auf unverschlüsselte Namensauflösung im Internet zulassen_.
5. Siehst du die Option _Bei DNS-Störungen auf öffentliche DNS-Server zurückgreifen_, deaktiviere sie.
6. Klicke auf _Übernehmen_.

## ASUS

ASUS-Firmware neuer als 3.0.0.4.386.4xxxx und Asuswrt-Merlin.

1. Öffne die Admin-Seite des Routers und gehe zu _WAN → Internet Connection_.
2. Stelle unter _WAN DNS Setting_ das _DNS Privacy Protocol_ auf _DNS-over-TLS (DoT)_ und das _DNS-over-TLS Profile_ auf _Strict_.
3. Entferne alle Einträge aus der _DNS-over-TLS Server List_ und füge dann einen hinzu:
   - Address: {% ip "dot" %}
   - TLS Hostname: {% dot %}
4. Klicke auf _Apply_.

## OpenWrt

1. Aktualisiere unter _System → Software_ die Listen und installiere `luci-app-https-dns-proxy`.
2. Öffne _Services → HTTPS DNS Proxy_. Lösche die Instanzen anderer Anbieter.
3. Füge eine Instanz mit eigener Resolver-URL hinzu: {% doh %}
4. _Save & Apply_. Das Paket leitet dnsmasq automatisch darauf um.

## Andere Router

Suche nach einer Einstellung namens _DNS over TLS_, _Privates DNS_, _Verschlüsseltes DNS_ oder _DNS over HTTPS_. Trage deinen Blokada-DNS-Namen oder DoH-Link von oben ein und entferne alle anderen DNS-Server, auch Fallback-Server. Gibt es keine solche Einstellung, nutze eine einfache IPv6-Adresse wie unten beschrieben.

## Router, die nur eine IP-Adresse annehmen

Dafür brauchen dein Router und dein Internetanschluss IPv6. Unterstützung für einfache IPv4-Adressen kommt später.

1. Öffne im [Dashboard](https://app.blokada.org/setup?src=guides) die Seite _Setup_ und wähle _Router, TV, game console_.
2. Gib dem Router einen Namen, zum Beispiel _Router zu Hause_, und wähle _Get address_. Der Name erscheint in deiner Aktivität und lässt sich später nicht ändern.
3. Suche in den Einstellungen des Routers die DNS-Server für IPv6, oft unter _Internet_, _WAN_ oder _IPv6_, und trage die Adresse als einzigen DNS-Server ein.
4. **Entferne alle anderen DNS-Server, auch die für IPv4.** Geräte, die vom Router noch einen IPv4-DNS-Server bekommen, schicken einen Teil ihrer Anfragen an Blokada vorbei. Lässt der Router das IPv4-DNS nicht leer, richte deine Geräte stattdessen einzeln ein: [Android](../android-private-dns/), [Mac und Apple TV](../apple-devices/), [Windows](../windows-dns-over-https/), [Linux](../linux-dns-over-tls/) und [Browser](../browser-dns-over-https/).

Genauso funktioniert es mit einem Fernseher oder einer Spielkonsole, bei denen du einen DNS-Server von Hand eintragen kannst. Gib jedem Gerät eine eigene Adresse, dann erscheint es mit seinem Namen in deiner Aktivität.

<div class="note aside">

Diese Anfragen gehen unverschlüsselt an Blokada, wie bei jedem einfachen DNS-Server. Unterstützt dein Router DNS over TLS oder DNS over HTTPS, nutze lieber das.

</div>

## Prüfen, ob es funktioniert

1. Starte ein Gerät neu oder schalte sein WLAN aus und wieder ein, damit es die Änderung übernimmt.
2. Schalte auf diesem Gerät Blokada aus, falls es läuft, und öffne [go.blokada.org/test](https://go.blokada.org/test). Dort siehst du, ob dein DNS über Blokada läuft.
3. Surfe eine Minute lang und öffne dann die Seite _Aktivität_ im [Dashboard](https://app.blokada.org/stats?src=guides). Dort erscheinen die Anfragen aus deinem Netzwerk.

## Wenn manche Geräte noch Werbung zeigen

Manche Geräte umgehen den Router: Handys mit eingerichtetem _Privatem DNS_, Browser, deren _sicheres DNS_ auf einen anderen Anbieter eingestellt ist, und Geräte mit fest eingebautem eigenem DNS. Richte diese direkt auf dem Gerät ein oder schalte ihre eigene DNS-Einstellung aus.

<div class="note tip">

Hinter dem Router teilen sich alle Geräte eine Adresse, deshalb zeigt das Dashboard dein Netzwerk als ein einziges Gerät. Richte Handys und Laptops mit ihrem eigenen Blokada-DNS-Namen ein, wenn du sie einzeln sehen möchtest. So bleibt ihre Blockierung auch unterwegs aktiv.

</div>
