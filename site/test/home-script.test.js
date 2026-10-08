import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import site from '../src/_data/site.js';

const { matchLanguage, langRedirect, storage } = createRequire(import.meta.url)('../src/_includes/js/home.cjs');
const codes = site.homeLangs.map(l => l.code);

test('matchLanguage: exact, case and region variants', () => {
  assert.equal(matchLanguage(['de'], codes), 'de');
  assert.equal(matchLanguage(['de-AT'], codes), 'de');
  assert.equal(matchLanguage(['PT-br'], codes), 'pt-BR');
  assert.equal(matchLanguage(['pt-PT'], codes), 'pt-BR');
  assert.equal(matchLanguage(['zh-TW'], codes), 'zh-Hant');
  assert.equal(matchLanguage(['zh-Hant-HK'], codes), 'zh-Hant');
});

test('matchLanguage: nothing for languages we do not have', () => {
  assert.equal(matchLanguage(['zh-CN'], codes), null);
  assert.equal(matchLanguage(['ko', 'th'], codes), null);
  assert.equal(matchLanguage([], codes), null);
  assert.equal(matchLanguage([undefined, ''], codes), null);
});

test('matchLanguage: first preference that we have wins', () => {
  assert.equal(matchLanguage(['ko', 'fr-CA', 'de'], codes), 'fr');
});

test('langRedirect: old ?lang= links go to the language page, hash kept', () => {
  assert.equal(langRedirect('?lang=de', '', site.homeLangs), '/de/');
  assert.equal(langRedirect('?lang=DE', '#download', site.homeLangs), '/de/#download');
  assert.equal(langRedirect('?lang=zh-Hant', '', site.homeLangs), '/zh-hant/');
  assert.equal(langRedirect('?foo=1&lang=pt-BR', '', site.homeLangs), '/pt-br/');
});

test('langRedirect: no redirect for English, unknown or missing values', () => {
  for (const search of ['', '?lang=', '?lang=en', '?lang=xx', '?lang=<script>', '?language=de']) {
    assert.equal(langRedirect(search, '', site.homeLangs), null, search);
  }
});

test('storage survives a browser that blocks it', () => {
  const blocked = { get localStorage() { throw new Error('denied'); } };
  const s = storage(blocked);
  assert.equal(s.get('blokada_lang'), null);
  assert.doesNotThrow(() => s.set('blokada_lang', 'de'));
  const values = {};
  const ok = storage({ localStorage: { getItem: k => values[k] ?? null, setItem: (k, v) => { values[k] = v; } } });
  ok.set('blokada_lang', 'de');
  assert.equal(ok.get('blokada_lang'), 'de');
});
