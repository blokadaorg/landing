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
    path: code === 'en' ? '/' : `/${code.toLowerCase()}/`,
    name,
  })),
  // Where each language's guides live. English keeps the unprefixed URLs.
  prefix: { en: '', de: '/de', sv: '/sv' },
  // Resolver IPs, for setups that need one next to the name: Windows DoH
  // (cloud.blokada.org) and DoT on ASUS routers and systemd-resolved
  // (*.cloud.blokada.org). The dashboard keeps the same pair in
  // src/utils/cloudDns.js.
  dnsIps: { doh: '34.117.212.222', dot: '193.180.80.10' },
};
