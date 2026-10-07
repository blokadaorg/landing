export default {
  origin: 'https://blokada.org',
  dashboard: 'https://app.blokada.org',
  forum: 'https://community.blokada.org/',
  langs: ['en', 'de', 'sv'],
  // The homepage languages. `code` names the locale file and the string
  // lookups, `tag` goes into lang and hreflang attributes.
  homeLangs: [
    ['en', 'English'], ['bg', 'Български'], ['cs', 'Český'], ['de', 'Deutsch'],
    ['es', 'Español'], ['fi', 'Suomalainen'], ['fr', 'Français'], ['hu', 'Magyar'],
    ['id', 'bahasa Indonesia'], ['it', 'Italiano'], ['ja', '日本語'], ['nl', 'Nederlands'],
    ['pl', 'Polski'], ['pt-BR', 'Portugues (Brasil)'], ['ro', 'Română'], ['ru', 'Pусский'],
    ['sv', 'Svenska'], ['tr', 'Türk'], ['zh-Hant', '中文 (繁體)'],
  ].map(([code, name]) => ({
    code,
    tag: code,
    // Open Graph has no script subtags: Traditional Chinese is zh_TW there.
    og: code === 'zh-Hant' ? 'zh_TW' : code.replace('-', '_'),
    path: code === 'en' ? '/' : `/${code.toLowerCase()}/`,
    name,
  })),
  // Where each language's guides live. English keeps the unprefixed URLs.
  prefix: { en: '', de: '/de', sv: '/sv' },
  social: [
    'https://community.blokada.org/',
    'https://github.com/blokadaorg/blokada',
    'https://twitter.com/blokadaorg',
    'https://www.facebook.com/blokadaorg/',
    'https://www.reddit.com/r/blokada',
  ],
  // For the structured data on the homepage.
  apps: [
    { name: 'Blokada 6', os: 'iOS, Android', url: 'https://apps.apple.com/app/blokada/id1508341781' },
    { name: 'Blokada Family', os: 'iOS, Android', url: 'https://apps.apple.com/app/id6458733529' },
    { name: 'Blokada 5', os: 'Android', url: 'https://go.blokada.org/apk5' },
  ],
  // The four product blocks, in page order.
  products: [
    {
      id: 'family', img: 'blokada-family.webp', imageFirst: false, pad: 'pl-md-5',
      title: 'homepage family title',
      desc: 'homepage family desc',
      points: [
        'homepage family point one',
        'homepage family point two',
        'homepage family point three',
        'homepage family point four',
        'homepage cloud point one',
        'homepage cloud point four',
        'homepage vpn point one',
      ],
    },
    {
      id: 'cloud', img: 'blokada-cloud.webp', imageFirst: true, pad: 'pl-md-5',
      title: 'homepage cloud title',
      desc: 'homepage cloud desc',
      points: [
        'homepage cloud point one',
        'homepage cloud point two',
        'homepage cloud point three',
        'homepage cloud point four',
        'homepage vpn point one',
        'homepage cloud point five',
        'homepage cloud point six',
      ],
    },
    {
      id: 'about', img: 'blokada-libre.webp', imageFirst: false, pad: 'pr-md-5',
      title: 'homepage about title',
      desc: 'homepage about desc',
      points: [
        'homepage about point one',
        'homepage about point two',
        'homepage about point three',
        'homepage about point four',
        'homepage about point five',
        'homepage about point six',
        'homepage about point seven',
      ],
    },
    {
      id: 'vpn', img: 'blokada-plus.webp', imageFirst: false, pad: 'pr-md-5',
      title: 'homepage vpn title',
      desc: 'homepage vpn desc',
      points: [
        'homepage vpn point one',
        'homepage vpn point two',
        'homepage vpn point three',
        'homepage vpn point four',
        'homepage vpn point six',
        'homepage vpn point seven',
      ],
    },
  ],
  // Shown as they were written, in English, on every language's page.
  reviews: [
    'Thanks for it. It totally solved the problem. Not a single ad. I tried some other apps /games from playstore which are known to have most annoying ads, but I didn’t see a single type of ad in any form. I didn’t know that it was my system’s fault, but thanks to Blokada now I’m ad free.',
    'A world without blokada is desolate, annoying and too full.',
    'My parents are phone shopping and yes this is a selling point that it works with Blokada as dad said so.',
  ],
  // Resolver IPs, for setups that need one next to the name: Windows DoH
  // (cloud.blokada.org) and DoT on ASUS routers and systemd-resolved
  // (*.cloud.blokada.org). The dashboard keeps the same pair in
  // src/utils/cloudDns.js.
  dnsIps: { doh: '34.117.212.222', dot: '193.180.80.10' },
};
