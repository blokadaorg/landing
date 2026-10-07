export default {
  origin: 'https://blokada.org',
  dashboard: 'https://app.blokada.org',
  forum: 'https://community.blokada.org/',
  langs: ['en', 'de', 'sv'],
  // Where each language's guides live. English keeps the unprefixed URLs.
  prefix: { en: '', de: '/de', sv: '/sv' },
  // Resolver IPs, for setups that need one next to the name: Windows DoH
  // (cloud.blokada.org) and DoT on ASUS routers and systemd-resolved
  // (*.cloud.blokada.org). The dashboard keeps the same pair in
  // src/utils/cloudDns.js.
  dnsIps: { doh: '34.117.212.222', dot: '193.180.80.10' },
};
