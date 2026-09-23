---
title: Block ads on Android with Private DNS
description: Use Android's built-in Private DNS setting with Blokada Cloud to block ads and trackers in every app, on Wi-Fi and mobile data, with no app to install.
updated: 2026-09-23
order: 4
---

Android 9 and later has a *Private DNS* setting. Set it to Blokada Cloud, and ads and trackers are blocked in all apps, on every network, with no app running in the background.

Your Private DNS address is: {% dot %}

## Most Android phones

1. Open *Settings → Network & internet*. On some phones this is *Connections* or *Connection & sharing*.
2. Tap *Private DNS*. On Samsung phones it is under *More connection settings*.
3. Choose *Private DNS provider hostname*.
4. Enter {% dot %} and tap *Save*.

If you can't find it, search the Settings app for "Private DNS".

## Check that it works

Open a few apps or websites, then look at the *Activity* page in the [dashboard](https://app.blokada.org/stats?src=guides). This phone's lookups show up there.

## If something doesn't work

- **"Couldn't connect" or no internet:** check the address for typos. It must be exactly as shown above, without `https://`.
- **Another VPN app is active:** some VPN apps use their own DNS and bypass Private DNS. Turn the VPN's DNS or ad blocking setting off, or use Blokada 6 instead.
- **Chrome still shows ads:** in Chrome, open *Settings → Privacy and security → Use secure DNS* and choose *Use current service provider*.

<div class="note">

Prefer an app? [Blokada 6](https://blokada.org/#download) sets this up for you and shows activity on the phone itself.

</div>
