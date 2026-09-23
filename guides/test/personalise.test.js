import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { parseDevice, addresses, takeDevice } = require('../src/_includes/js/personalise.cjs');

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

test('parseDevice strips markup and limits the name', () => {
  const device = parseDevice(`#tag=${TAG}&name=${encodeURIComponent('<b>TV</b>' + 'x'.repeat(50))}`);
  assert.equal(device.name.includes('<'), false);
  assert.equal(device.name.length <= 32, true);
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
