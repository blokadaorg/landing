// How the guides index groups and decorates each guide, keyed by page key.
// Names and badges are interface strings, in t.js.
export default {
  'router-ad-blocking': { group: 'device', icon: 'router', featured: true },
  'android-private-dns': { group: 'device', icon: 'phone' },
  'apple-devices': { group: 'device', icon: 'tv' },
  'windows-dns-over-https': { group: 'device', icon: 'desktop' },
  'linux-dns-over-tls': { group: 'device', icon: 'terminal' },
  'browser-dns-over-https': { group: 'device', icon: 'browser' },
  // Mullvad first: it has a deadline.
  'switch-from-mullvad-dns': { group: 'switch', icon: 'switch', until: '2026-11-02' },
  'switch-from-pihole': { group: 'switch', icon: 'switch' },
  'switch-from-nextdns': { group: 'switch', icon: 'switch' },
};
