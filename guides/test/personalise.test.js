import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { parseDevice, addresses, takeDevice, pageLink, isIosOtherBrowser } = require('../src/_includes/js/personalise.cjs');

const TAG = '2ee63b78627';

function fakeStorage(initial = {}) {
  const items = new Map(Object.entries(initial));
  return {
    getItem: key => (items.has(key) ? items.get(key) : null),
    setItem: (key, value) => items.set(key, value),
  };
}

function fakeHistory() {
  const calls = [];
  return { calls, state: null, replaceState: (state, title, url) => calls.push(url) };
}

test('parseDevice reads the tag and name off the fragment', () => {
  assert.deepEqual(parseDevice(`#tag=${TAG}&name=Living%20room`), { tag: TAG, name: 'Living room' });
});

test('parseDevice accepts the old six character tags', () => {
  assert.deepEqual(parseDevice('#tag=abc123'), { tag: 'abc123', name: '' });
});

test('parseDevice refuses anything that is not a device tag', () => {
  for (const hash of ['', '#', '#tag=', '#tag=zzzzzzzzzzz', `#tag=4${TAG.slice(1)}`, '#tag=<script>', `#name=x`]) {
    assert.equal(parseDevice(hash), null, hash);
  }
});

test('parseDevice limits the name and drops control characters', () => {
  const device = parseDevice(`#tag=${TAG}&name=${encodeURIComponent('TV\u0000\u202e' + 'x'.repeat(50))}`);
  assert.equal(/[\u0000\u202e]/.test(device.name), false);
  assert.equal(Array.from(device.name).length <= 32, true);
});

// Cutting in the middle of a surrogate pair would leave a lone half, and
// encodeURIComponent throws on those.
test('a long name with astral characters still encodes', () => {
  const device = parseDevice(`#tag=${TAG}&name=${encodeURIComponent('a'.repeat(31) + '\u{1D40A}x')}`);
  assert.doesNotThrow(() => addresses(device));
});

// The dashboard's own default names, e.g. "Bronze Tiger (Android)", have to
// come out the same as on its setup screen.
test('a dashboard default name is kept for DoH and the profile', () => {
  const device = parseDevice(`#tag=${TAG}&name=${encodeURIComponent('Bronze Tiger (Android)')}`);
  const a = addresses(device);
  assert.equal(a.doh, `https://cloud.blokada.org/${TAG}/${encodeURIComponent('Bronze Tiger (Android)')}`);
  assert.equal(a.apple.endsWith(`device_name=${encodeURIComponent('Bronze Tiger (Android)')}`), true);
  // Not a valid DNS label, so DoT goes without the name.
  assert.equal(a.dot, `${TAG}.cloud.blokada.org`);
});

// The formats the dashboard shows today (SetupAndroid.vue, SetupBrowsers.vue,
// SetupIos.vue), so a guide and the dashboard never disagree.
test('addresses match the dashboard formats', () => {
  assert.deepEqual(addresses({ tag: TAG, name: 'Living room' }), {
    dot: `Living--room-${TAG}.cloud.blokada.org`,
    doh: `https://cloud.blokada.org/${TAG}/Living%20room`,
    apple: `https://api.cloud.blokada.org/apple?device_tag=${TAG}&device_name=Living%20room`,
  });
});

test('addresses without a name leave it out', () => {
  const a = addresses({ tag: TAG, name: '' });
  assert.equal(a.dot, `${TAG}.cloud.blokada.org`);
  assert.equal(a.doh, `https://cloud.blokada.org/${TAG}`);
});

// The resolver splits the DoT label at the first single "-", so a name with a
// hyphen or a dot would be read as a different tag. Leave the name out instead.
test('a name the DoT label cannot carry is left out of it', () => {
  for (const name of ['my-tv', 'tv.box', 'Küche']) {
    const a = addresses({ tag: TAG, name });
    assert.equal(a.dot, `${TAG}.cloud.blokada.org`, name);
    assert.equal(a.doh, `https://cloud.blokada.org/${TAG}/${encodeURIComponent(name)}`, name);
  }
});

test('a DoT label never goes over 63 characters', () => {
  const a = addresses({ tag: TAG, name: 'a b c d e f g h i j k l m n o p' });
  assert.equal(a.dot.split('.')[0].length <= 63, true);
});

test('takeDevice strips the fragment and keeps the device for the tab', () => {
  const history = fakeHistory();
  const storage = fakeStorage();
  const location = { pathname: '/guides/router-ad-blocking/', search: '', hash: `#tag=${TAG}` };

  assert.deepEqual(takeDevice(location, history, storage), { tag: TAG, name: '' });
  assert.deepEqual(history.calls, ['/guides/router-ad-blocking/']);

  // Next page in the same tab, no fragment.
  const next = { pathname: '/guides/', search: '', hash: '' };
  assert.deepEqual(takeDevice(next, fakeHistory(), storage), { tag: TAG, name: '' });
});

test('takeDevice leaves the URL alone without a valid tag', () => {
  const history = fakeHistory();
  const location = { pathname: '/guides/', search: '', hash: '#section' };
  assert.equal(takeDevice(location, history, fakeStorage()), null);
  assert.deepEqual(history.calls, []);
});

test('takeDevice ignores a tampered stored device', () => {
  const storage = fakeStorage({ blokada_guide_device: JSON.stringify({ tag: 'nope' }) });
  assert.equal(takeDevice({ pathname: '/', search: '', hash: '' }, fakeHistory(), storage), null);
});

test('pageLink puts the device back in the fragment', () => {
  const location = { origin: 'https://blokada.org', pathname: '/guides/apple-devices/' };
  assert.equal(pageLink(location, { tag: TAG, name: '' }), `https://blokada.org/guides/apple-devices/#tag=${TAG}`);
  const withName = new URL(pageLink(location, { tag: TAG, name: 'My iPhone' }));
  assert.deepEqual(parseDevice(withName.hash), { tag: TAG, name: 'My iPhone' });
});

test('isIosOtherBrowser tells Safari from other iPhone browsers', () => {
  const safari = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
  const chrome = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/129.0 Mobile/15E148 Safari/604.1';
  const firefox = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/131.0 Mobile/15E148 Safari/605.1.15';
  const inApp = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';
  const macSafari = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15';
  const android = 'Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36';
  assert.equal(isIosOtherBrowser(safari), false);
  assert.equal(isIosOtherBrowser(chrome), true);
  assert.equal(isIosOtherBrowser(firefox), true);
  assert.equal(isIosOtherBrowser(inApp), true);
  assert.equal(isIosOtherBrowser(macSafari), false);
  assert.equal(isIosOtherBrowser(android), false);
});

// An iPad reports itself as a Mac, but has a touch screen.
test('isIosOtherBrowser recognises an iPad asking for desktop sites', () => {
  const ipadChrome = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/129.0 Version/18.0 Safari/605.1.15';
  const ipadSafari = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15';
  assert.equal(isIosOtherBrowser(ipadChrome, 5), true);
  assert.equal(isIosOtherBrowser(ipadSafari, 5), false);
  // The same user agent on a Mac, which has no touch screen.
  assert.equal(isIosOtherBrowser(ipadChrome, 0), false);
});
