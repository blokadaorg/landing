// Builds the site once into a temp folder and checks what was written.
import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import site from '../src/_data/site.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = fs.mkdtempSync(path.join(os.tmpdir(), 'blokada-site-'));
const read = rel => fs.readFileSync(path.join(OUT, rel), 'utf8');
const page = lang => read(path.join(lang.path, 'index.html'));
const attr = (html, re) => (html.match(re) || [])[1];

before(() => {
  execFileSync('npx', ['@11ty/eleventy', '--quiet', `--output=${OUT}`], { cwd: ROOT, stdio: 'inherit' });
});

test('a homepage exists for every language', () => {
  for (const lang of site.homeLangs) assert.ok(page(lang).startsWith('<!DOCTYPE html>'), lang.code);
});

test('each homepage has its language, one h1, a title and a description', () => {
  for (const lang of site.homeLangs) {
    const html = page(lang);
    assert.equal(attr(html, /<html lang="([^"]+)"/), lang.tag, lang.code);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${lang.code} h1 count`);
    assert.ok(attr(html, /<title>([^<]+)<\/title>/).length > 10, `${lang.code} title`);
    const description = attr(html, /<meta name="description" content="([^"]*)"/);
    assert.ok(description.length > 20 && description.length < 200, `${lang.code} description: ${description}`);
  }
});

test('canonical is absolute and points at the page itself', () => {
  for (const lang of site.homeLangs) {
    assert.equal(attr(page(lang), /<link rel="canonical" href="([^"]+)"/), site.origin + lang.path, lang.code);
  }
});

test('every homepage lists the same 19 alternates plus x-default', () => {
  const expected = site.homeLangs.map(l => `${l.tag} ${site.origin}${l.path}`).concat(`x-default ${site.origin}/`);
  for (const lang of site.homeLangs) {
    const found = [...page(lang).matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m => `${m[1]} ${m[2]}`);
    assert.deepEqual(found, expected, lang.code);
  }
});

test('guides are still built where they were', () => {
  assert.ok(read('guides/index.html').includes('<h1>'));
  assert.ok(read('de/guides/router-ad-blocking/index.html').includes('<h1>'));
});
