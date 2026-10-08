import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadStrings, translate, untranslated } from '../lib/homeStrings.js';
import site from '../src/_data/site.js';

const strings = {
  en: { hello: 'Hello', brand: 'Blokada', only: 'English only' },
  de: { hello: 'Hallo', brand: 'Blokada', empty: '' },
};

test('translate returns the language string', () => {
  assert.equal(translate(strings, 'de', 'hello'), 'Hallo');
});

test('translate falls back to English for a missing or empty string', () => {
  assert.equal(translate(strings, 'de', 'only'), 'English only');
  assert.equal(translate({ en: { empty: 'Text' }, de: { empty: '' } }, 'de', 'empty'), 'Text');
  assert.equal(translate({ en: { blank: 'Text' }, de: { blank: '  ' } }, 'de', 'blank'), 'Text');
});

test('translate rejects a key English does not have', () => {
  assert.throws(() => translate(strings, 'de', 'nope'), /Unknown homepage string: nope/);
});

test('untranslated lists strings equal to English or missing', () => {
  assert.deepEqual(untranslated(strings, 'de', ['hello', 'brand', 'only']), ['brand', 'only']);
});

test('every homepage language has a locale file with the hero paragraph', () => {
  const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'locales');
  const all = loadStrings(dir, site.homeLangs.map(l => l.code));
  for (const { code } of site.homeLangs) {
    assert.ok(translate(all, code, 'homepage hero desc').length > 20, code);
  }
});

test('homeLangs: 19 languages, English first at /, lowercase paths', () => {
  assert.equal(site.homeLangs.length, 19);
  assert.deepEqual(site.homeLangs[0], { code: 'en', tag: 'en', og: 'en', path: '/', name: 'English' });
  const ptbr = site.homeLangs.find(l => l.code === 'pt-BR');
  assert.equal(ptbr.path, '/pt-br/');
  assert.equal(ptbr.tag, 'pt-BR');
  assert.equal(new Set(site.homeLangs.map(l => l.path)).size, 19);
});
