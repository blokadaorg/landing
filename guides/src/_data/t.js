// Interface strings shared by every guide. Guide bodies are whole documents per
// language under src/<lang>/; these are only the pieces around them.
export default {
  en: {
    languageName: 'English',
    copy: 'Copy',
    copied: 'Copied',
    darkMode: 'Dark mode',
    placeholder: '&lt;your-id&gt;',
    home: 'Home',
    guides: 'Guides',
    dashboard: 'Dashboard',
    updated: 'Updated',
    deviceNone:
      'The DNS names and links on this page contain <code>&lt;your-id&gt;</code>, a short code for your device. ' +
      'Sign in to the dashboard to see yours. If you open this guide with the dashboard’s ' +
      '“Open on another device” link, it is filled in for you.',
    deviceFind: 'Fill in my details',
    deviceSet: 'This guide is filled in with the details of your device.',
    details: 'Your details',
    detailLabels: {
      dot: 'DNS name (DNS over TLS)',
      doh: 'DoH link (DNS over HTTPS)',
      ipDoh: 'DNS server (IP address)',
      ipDot: 'DNS over TLS server (IP address)',
      apple: 'Profile link',
    },
    onThisPage: 'On this page',
    ctaTitle: 'Blokada Cloud',
    ctaText:
      'Blocks ads and trackers for every device in your home. You set it up once in the DNS settings, ' +
      'with no app on your TV, console or router.',
    ctaBuy: 'Get Blokada Cloud',
    ctaHave: 'I already have an account',
    plusNote:
      'Want a VPN as well? <a href="{dashboard}/activate?tier=plus&amp;src=guides">Blokada Plus</a> ' +
      'adds an encrypted WireGuard tunnel on each device, with the same blocking.',
    comments: 'Questions and comments',
    indexTitle: 'Blokada Cloud setup guides',
    indexDescription:
      'Step-by-step guides to block ads and trackers on your router, TV, computer and phone with Blokada Cloud.',
    indexIntro:
      'Blokada Cloud blocks ads and trackers in DNS, so it works on devices that cannot run an ad blocker app. ' +
      'Pick your device or the service you are switching from.',
    terms: 'Terms',
    privacy: 'Privacy',
    otherLanguages: 'Other languages',
    moreGuides: 'More guides on the forum',
    indexGroups: { device: 'Set up a device', switch: 'Switch from another service' },
    recommended: 'Recommended: covers every device at home',
    deadline: 'Closes 2 November 2026',
    guideNames: {
      'router-ad-blocking': 'Router',
      'android-private-dns': 'Android',
      'apple-devices': 'Mac, iPhone and Apple TV',
      'windows-dns-over-https': 'Windows',
      'linux-dns-over-tls': 'Linux',
      'browser-dns-over-https': 'Browsers',
      'switch-from-mullvad-dns': 'From Mullvad DNS',
      'switch-from-pihole': 'From Pi-hole',
      'switch-from-nextdns': 'From NextDNS',
    },
  },
  de: {
    languageName: 'Deutsch',
    copy: 'Kopieren',
    copied: 'Kopiert',
    darkMode: 'Dunkler Modus',
    placeholder: '&lt;deine-id&gt;',
    home: 'Startseite',
    guides: 'Anleitungen',
    dashboard: 'Dashboard',
    updated: 'Aktualisiert',
    deviceNone:
      'Die DNS-Namen und Links auf dieser Seite enthalten <code>&lt;deine-id&gt;</code>, einen kurzen Code für dein Gerät. ' +
      'Melde dich im Dashboard an, um deinen zu sehen. Öffnest du diese Anleitung über den Link ' +
      'zum Öffnen auf einem anderen Gerät im Dashboard, wird er automatisch eingesetzt.',
    deviceFind: 'Meine Daten einsetzen',
    deviceSet: 'Diese Anleitung zeigt die Daten deines Geräts.',
    details: 'Deine Daten',
    detailLabels: {
      dot: 'DNS-Name (DNS over TLS)',
      doh: 'DoH-Link (DNS over HTTPS)',
      ipDoh: 'DNS-Server (IP-Adresse)',
      ipDot: 'DNS-over-TLS-Server (IP-Adresse)',
      apple: 'Profil-Link',
    },
    onThisPage: 'Auf dieser Seite',
    ctaTitle: 'Blokada Cloud',
    ctaText:
      'Blockiert Werbung und Tracker auf allen Geräten in deinem Zuhause. Einmal in den DNS-Einstellungen ' +
      'eingerichtet, ohne App auf Fernseher, Konsole oder Router.',
    ctaBuy: 'Blokada Cloud holen',
    ctaHave: 'Ich habe schon ein Konto',
    plusNote:
      'Du möchtest auch ein VPN? <a href="{dashboard}/activate?tier=plus&amp;src=guides">Blokada Plus</a> ' +
      'ergänzt auf jedem Gerät einen verschlüsselten WireGuard-Tunnel mit derselben Blockierung.',
    comments: 'Fragen und Kommentare',
    indexTitle: 'Anleitungen für Blokada Cloud',
    indexDescription:
      'Schritt-für-Schritt-Anleitungen, um mit Blokada Cloud Werbung und Tracker auf Router, Fernseher, Computer und Handy zu blockieren.',
    indexIntro:
      'Blokada Cloud blockiert Werbung und Tracker per DNS und funktioniert deshalb auch auf Geräten, auf denen keine ' +
      'Werbeblocker-App läuft. Wähle dein Gerät oder den Dienst, von dem du wechselst.',
    terms: 'AGB',
    privacy: 'Datenschutz',
    otherLanguages: 'Andere Sprachen',
    moreGuides: 'Weitere Anleitungen im Forum',
    indexGroups: { device: 'Gerät einrichten', switch: 'Von einem anderen Dienst wechseln' },
    recommended: 'Empfohlen: schützt alle Geräte zu Hause',
    deadline: 'Endet am 2. November 2026',
    guideNames: {
      'router-ad-blocking': 'Router',
      'android-private-dns': 'Android',
      'apple-devices': 'Mac, iPhone und Apple TV',
      'windows-dns-over-https': 'Windows',
      'linux-dns-over-tls': 'Linux',
      'browser-dns-over-https': 'Browser',
      'switch-from-mullvad-dns': 'Von Mullvad DNS',
      'switch-from-pihole': 'Von Pi-hole',
      'switch-from-nextdns': 'Von NextDNS',
    },
  },
  sv: {
    languageName: 'Svenska',
    copy: 'Kopiera',
    copied: 'Kopierat',
    darkMode: 'Mörkt läge',
    placeholder: '&lt;ditt-id&gt;',
    home: 'Start',
    guides: 'Guider',
    dashboard: 'Dashboard',
    updated: 'Uppdaterad',
    deviceNone:
      'DNS-namnen och länkarna på den här sidan innehåller <code>&lt;ditt-id&gt;</code>, en kort kod för din enhet. ' +
      'Logga in i dashboarden för att se din. Om du öppnar guiden via dashboardens länk ' +
      'för att öppna på en annan enhet fylls den i åt dig.',
    deviceFind: 'Fyll i mina uppgifter',
    deviceSet: 'Guiden visar uppgifterna för din enhet.',
    details: 'Dina uppgifter',
    detailLabels: {
      dot: 'DNS-namn (DNS över TLS)',
      doh: 'DoH-länk (DNS över HTTPS)',
      ipDoh: 'DNS-server (IP-adress)',
      ipDot: 'Server för DNS över TLS (IP-adress)',
      apple: 'Profillänk',
    },
    onThisPage: 'På den här sidan',
    ctaTitle: 'Blokada Cloud',
    ctaText:
      'Blockerar reklam och spårare på alla enheter i hemmet. Du ställer in det en gång i DNS-inställningarna, ' +
      'utan app på tv:n, konsolen eller routern.',
    ctaBuy: 'Skaffa Blokada Cloud',
    ctaHave: 'Jag har redan ett konto',
    plusNote:
      'Vill du också ha en VPN? <a href="{dashboard}/activate?tier=plus&amp;src=guides">Blokada Plus</a> ' +
      'lägger till en krypterad WireGuard-tunnel på varje enhet, med samma blockering.',
    comments: 'Frågor och kommentarer',
    indexTitle: 'Guider för Blokada Cloud',
    indexDescription:
      'Steg-för-steg-guider för att blockera reklam och spårare på router, tv, dator och mobil med Blokada Cloud.',
    indexIntro:
      'Blokada Cloud blockerar reklam och spårare via DNS, så det fungerar även på enheter som inte kan köra en ' +
      'annonsblockerare. Välj din enhet eller tjänsten du byter från.',
    terms: 'Villkor',
    privacy: 'Integritet',
    otherLanguages: 'Andra språk',
    moreGuides: 'Fler guider på forumet',
    indexGroups: { device: 'Ställ in en enhet', switch: 'Byt från en annan tjänst' },
    recommended: 'Rekommenderas: skyddar alla enheter hemma',
    deadline: 'Stängs 2 november 2026',
    guideNames: {
      'router-ad-blocking': 'Router',
      'android-private-dns': 'Android',
      'apple-devices': 'Mac, iPhone och Apple TV',
      'windows-dns-over-https': 'Windows',
      'linux-dns-over-tls': 'Linux',
      'browser-dns-over-https': 'Webbläsare',
      'switch-from-mullvad-dns': 'Från Mullvad DNS',
      'switch-from-pihole': 'Från Pi-hole',
      'switch-from-nextdns': 'Från NextDNS',
    },
  },
};
