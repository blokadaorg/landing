---
title: Blockera reklam på Android med privat DNS
description: Använd Androids inbyggda privata DNS med Blokada Cloud och blockera reklam och spårare i alla appar, på wifi och mobildata, utan att installera någon app.
updated: 2026-09-23
order: 4
---

Android 9 och senare har inställningen *Privat DNS*. Ställ in den på Blokada Cloud, så blockeras reklam och spårare i alla appar, på alla nätverk, utan att någon app körs i bakgrunden.

Din adress för privat DNS är: {% dot %}

## De flesta Android-telefoner

1. Öppna *Inställningar → Nätverk och internet*. På vissa telefoner heter det *Anslutningar* eller *Anslutning och delning*.
2. Tryck på *Privat DNS*. På Samsung-telefoner finns det under *Fler anslutningsinställningar*.
3. Välj *Värdnamn för privat DNS-leverantör*.
4. Ange {% dot %} och tryck på *Spara*.

Hittar du det inte kan du söka efter ”Privat DNS” i appen Inställningar.

## Kontrollera att det fungerar

Öppna några appar eller webbplatser och titta sedan på sidan *Activity* i [dashboarden](https://app.blokada.org/stats?src=guides). Telefonens uppslag visas där.

## Om något inte fungerar

- **”Det gick inte att ansluta” eller inget internet:** kontrollera att adressen inte har några stavfel. Den måste vara exakt som ovan, utan `https://`.
- **En annan VPN-app är aktiv:** vissa VPN-appar använder egen DNS och kringgår privat DNS. Stäng av VPN-appens DNS- eller reklamblockeringsinställning, eller använd Blokada 6 i stället.
- **Chrome visar fortfarande reklam:** öppna *Inställningar → Integritet och säkerhet → Använd säker DNS* i Chrome och välj *Use current service provider*.

<div class="note">

Föredrar du en app? [Blokada 6](https://blokada.org/#download) ställer in det här åt dig och visar aktiviteten direkt i telefonen.

</div>
