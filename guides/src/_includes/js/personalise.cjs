// Fills a guide with one device's Blokada Cloud addresses.
//
// The dashboard links here as /guides/<page>/#tag=<device tag>&name=<name>.
// The fragment never reaches the server, a CDN log or a search index. The tag
// only identifies which account's filtering to use; it grants no access to the
// account itself.
//
// This file is inlined into every guide as a plain script, and loaded by the
// tests with require(). Without it, or without a tag, the page shows
// placeholders and still reads fine.
(function (root) {
  // Same as the API and the resolver (api/devicetag.go, blockadns/id/setup.go).
  var TAG_RE = /^([0-9a-f]{6}|[23][0-9a-f]{10})$/;
  var NAME_MAX = 32;
  // A DoT name is one DNS label, "<name>-<tag>". The resolver turns "--" back
  // into a space and splits at the first remaining "-", so the name itself may
  // hold letters, digits and spaces only.
  var DOT_NAME_RE = /^[A-Za-z0-9 ]+$/;
  var LABEL_MAX = 63;
  var STORAGE_KEY = 'blokada_guide_device';

  // The name ends up URL-encoded (DoH, profile) or as text, never as markup,
  // so it only loses control characters and gets a length limit. Counted in
  // code points: cutting a surrogate pair in half would make
  // encodeURIComponent throw.
  function cleanName(name) {
    if (typeof name !== 'string') return '';
    var cleaned = name.replace(/[\p{Cc}\p{Cf}]/gu, '').trim();
    return Array.from(cleaned).slice(0, NAME_MAX).join('').trim();
  }

  function parseDevice(hash) {
    if (typeof hash !== 'string' || hash.length < 2) return null;
    var params = new URLSearchParams(hash.replace(/^#/, ''));
    var tag = (params.get('tag') || '').toLowerCase();
    if (!TAG_RE.test(tag)) return null;
    return { tag: tag, name: cleanName(params.get('name')) };
  }

  function addresses(device) {
    var tag = device.tag;
    var name = device.name || '';
    var dotLabel = tag;
    if (name && DOT_NAME_RE.test(name)) {
      var withName = name.replace(/ /g, '--') + '-' + tag;
      if (withName.length <= LABEL_MAX) dotLabel = withName;
    }
    var dohPath = name ? tag + '/' + encodeURIComponent(name) : tag;
    return {
      dot: dotLabel + '.cloud.blokada.org',
      doh: 'https://cloud.blokada.org/' + dohPath,
      apple: 'https://api.cloud.blokada.org/apple?device_tag=' + tag +
        '&device_name=' + encodeURIComponent(name),
    };
  }

  // Takes the device off the URL (and keeps it for this tab), or falls back to
  // one kept earlier, so the guide stays filled in after the fragment is gone.
  function takeDevice(location, history, storage) {
    var device = parseDevice(location.hash);
    if (device) {
      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(device));
      } catch (e) {
        // Private mode or blocked storage: the page still works for this view.
      }
      history.replaceState(history.state, '', location.pathname + location.search);
      return device;
    }
    try {
      var stored = JSON.parse(storage.getItem(STORAGE_KEY) || 'null');
      if (stored && TAG_RE.test(stored.tag)) {
        return { tag: stored.tag, name: cleanName(stored.name) };
      }
    } catch (e) {
      // Unreadable storage is the same as no device.
    }
    return null;
  }

  function fill(document, values) {
    var nodes = document.querySelectorAll('[data-dns]');
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var value = values[node.getAttribute('data-dns')];
      if (!value) continue;
      if (node.tagName === 'A') node.setAttribute('href', value);
      else node.textContent = value;
    }
    document.documentElement.classList.add('has-device');
  }

  var api = {
    parseDevice: parseDevice,
    addresses: addresses,
    takeDevice: takeDevice,
    fill: fill,
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
    return;
  }

  function run() {
    var storage;
    try {
      storage = root.sessionStorage;
    } catch (e) {
      storage = null;
    }
    var device = takeDevice(root.location, root.history, storage || {
      getItem: function () { return null; },
      setItem: function () {},
    });
    if (!device) return;
    try {
      fill(root.document, addresses(device));
    } catch (e) {
      // A name we could not encode: leave the placeholders rather than break.
    }
  }

  run();
  root.addEventListener('hashchange', run);
})(typeof window !== 'undefined' ? window : this);
