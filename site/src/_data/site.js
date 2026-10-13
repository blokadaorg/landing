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
  // The four product blocks, in page order. `page` is the product's own
  // page, in English only.
  products: [
    {
      id: 'family', page: '/blokada-family/', img: 'blokada-family.webp', imageFirst: false, pad: 'pl-md-5',
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
      id: 'cloud', page: '/blokada-6/', img: 'blokada-cloud.webp', imageFirst: true, pad: 'pl-md-5',
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
      id: 'about', page: '/blokada-5/', img: 'blokada-libre.webp', imageFirst: false, pad: 'pr-md-5',
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
      id: 'vpn', page: '/blokada-plus/', img: 'blokada-plus.webp', imageFirst: false, pad: 'pr-md-5',
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
  // Five-star store reviews, shown as they were written, in English, on every
  // language's page. Three are visible: the first three without JavaScript,
  // a random three with it. `date` is not printed; it says which ones to
  // replace when the pool is refreshed.
  reviews: [
    { text: 'The best overall adblocker there is, have been using it for years!', name: 'Ville', source: 'Google Play', date: '2026-06' },
    { text: 'Haven’t seen an ad since downloading the app. Makes such a difference!', name: 'ReeRee255', source: 'App Store', date: '2026-06' },
    { text: 'Works great. It has been blocking Ads, and Pop-ups exactly as I hoped it would. It does great at blocking the ads and pop-ups across my entire device.', name: 'Jason', source: 'Google Play', date: '2026-08' },
    { text: 'The best ad blocker I\'ve ever seen. I\'ve tried some other apps but this is surely the best', name: 'Damceedrizzy', source: 'App Store', date: '2025-12' },
    { text: 'Completely amazing app! Does exactly what it\'s supposed to do exactly how it\'s supposed to do it!', name: 'Bruce', source: 'Google Play', date: '2025-09' },
    { text: 'I love this and works as advertised and best decision I’ve made', name: 'CraftyJewelry', source: 'App Store', date: '2026-01' },
    { text: 'This app makes a huge positive difference to my online experience', name: 'Laura', source: 'Google Play', date: '2025-03' },
    { text: 'Loads of apps have no ads coz of this amazing app worth every penny thanks', name: 'Southsoundxx', source: 'App Store', date: '2023-07' },
    { text: 'Subscribed for the last 3 years or so and love it. Wonderful app & people :)', name: 'Daniel', source: 'Google Play', date: '2024-01' },
  ],
  // Old addresses that are still linked or searched for. Each becomes a page
  // that sends the visitor on: GitHub Pages cannot answer with a redirect.
  // `from` is the file to write, `to` a path on this site or a full url.
  redirects: [
    { from: '/pt/index.html', to: '/pt-br/' },
    { from: '/zh_TW/index.html', to: '/zh-hant/' },
    { from: '/lang/de_DE/index.html', to: '/de/' },
    { from: '/lang/hu_HU/index.html', to: '/hu/' },
    { from: '/lang/pl_PL/index.html', to: '/pl/' },
    { from: '/lang/pt_BR/index.html', to: '/pt-br/' },
    { from: '/lang/zh_TW/index.html', to: '/zh-hant/' },
    { from: '/index.htm', to: '/' },
    { from: '/privacy/index.html', to: 'https://go.blokada.org/privacy' },
    { from: '/terms/index.html', to: 'https://go.blokada.org/terms' },
  ],
  // Resolver IPs, for setups that need one next to the name: Windows DoH
  // (cloud.blokada.org) and DoT on ASUS routers and systemd-resolved
  // (*.cloud.blokada.org). The dashboard keeps the same pair in
  // src/utils/cloudDns.js.
  dnsIps: { doh: '34.117.212.222', dot: '193.180.80.10' },
};
