// Which of the reader's details each guide shows in its "Your details" card,
// keyed by page key (the English file name). Kinds match t.detailLabels.
// The Apple guide has none: its main action is the profile download, and it
// has its own prompt for readers without a device.
export default {
  'switch-from-pihole': ['dot', 'doh'],
  'switch-from-mullvad-dns': ['dot', 'doh'],
  'switch-from-nextdns': ['dot', 'doh'],
  'router-ad-blocking': ['dot', 'doh'],
  'android-private-dns': ['dot'],
  'browser-dns-over-https': ['doh'],
  'windows-dns-over-https': ['ipDoh', 'doh'],
  'linux-dns-over-tls': ['ipDot', 'dot'],
};
