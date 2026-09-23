---
title: Block ads on iPhone, iPad, Mac and Apple TV
description: Install a Blokada Cloud DNS profile to block ads and trackers system-wide on iPhone, iPad, Mac and Apple TV, with encrypted DNS and no app running.
updated: 2026-09-23
order: 5
---

Apple devices can use encrypted DNS for the whole system through a configuration profile. The Blokada profile sets your device to use Blokada Cloud, which blocks ads and trackers in every app and browser.

It works on iOS and iPadOS 14, macOS 11 (Big Sur), tvOS 14 and later.

{% appleProfile %}Download the Blokada profile{% endappleProfile %}

The button opens the dashboard if this page wasn't opened from your dashboard link. The dashboard gives you the profile for your device there.

## iPhone and iPad

1. Open this page in **Safari** on the device and tap the button above. Tap *Allow* to download the profile.
2. Open *Settings*. Tap *Profile Downloaded* near the top. You can also find it under *General → VPN & Device Management*.
3. Tap *Install*, enter your passcode, and confirm.

## Mac

1. Click the button above to download the profile.
2. Open the list of profiles: *System Settings → General → Device Management* on macOS 15 and later, *System Settings → Privacy & Security → Profiles* on macOS 13 and 14, or *System Preferences → Profiles* on macOS 12 and earlier.
3. Double-click the Blokada profile and click *Install*.

## Apple TV

The Apple TV cannot open web pages, so you give it the profile's address.

1. Your profile address is: {% appleUrl %}
2. On the Apple TV, open *Settings → General → Privacy & Security*.
3. Highlight *Send to Apple* (called *Share Apple TV Analytics* on older tvOS). Don't select it. Press the Play/Pause button on the remote instead.
4. Choose *Add Profile* and enter the profile address. Typing is easiest with the keyboard prompt on your iPhone, where you can paste it. Install the profile and confirm.

<div class="note">

**Apple TV and other devices at home:** if you set up Blokada Cloud on your [router](../router-ad-blocking/), the Apple TV is covered along with everything else.

</div>

## Check that it works

Browse for a minute, then open the *Activity* page in the [dashboard](https://app.blokada.org/stats?src=guides). This device's lookups show up there.

To remove Blokada later, delete the profile where you installed it.

<div class="note">

On iPhone, [Blokada 6](https://blokada.org/#download) sets this up for you and shows activity on the phone itself.

</div>
