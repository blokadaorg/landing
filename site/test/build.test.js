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

const SECTIONS = ['family', 'cloud', 'about', 'vpn', 'download', 'community', 'opinions', 'faq', 'donate', 'crypto', 'developer'];

test('every section id is present on every homepage', () => {
  for (const lang of site.homeLangs) {
    const html = page(lang);
    for (const id of SECTIONS) assert.ok(html.includes(`id="${id}"`), `${lang.code} #${id}`);
  }
});

test('headings go h1, then h2 and h3 only', () => {
  const html = page(site.homeLangs[0]);
  assert.equal((html.match(/<h[456][\s>]/g) || []).length, 0);
  assert.ok((html.match(/<h2[\s>]/g) || []).length >= 9);
});

test('in-page links point at ids that exist', () => {
  for (const lang of site.homeLangs) {
    const html = page(lang);
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
    for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(target), `${lang.code} #${target}`);
  }
});

test('internal links point at built files', () => {
  for (const lang of site.homeLangs) {
    for (const [, href] of page(lang).matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      const rel = href.endsWith('/') ? `${href}index.html` : href;
      assert.ok(fs.existsSync(path.join(OUT, rel)), `${lang.code} ${href}`);
    }
  }
});

test('outgoing links keep their attribution', () => {
  const html = page(site.homeLangs[0]);
  for (const target of ['appstore/family', 'appstore', 'play/family', 'play/v6', 'apk5', 'forum', 'newsletter', 'opinions', 'faq', 'donate']) {
    assert.ok(html.includes(`https://go.blokada.org/${target}?src=landing"`), target);
  }
  assert.ok(html.includes('https://app.blokada.org/?src=landing"'));
  assert.ok(!html.includes('btcpay'));
});

test('German and Swedish homepages link their own guides', () => {
  const by = code => page(site.homeLangs.find(l => l.code === code));
  assert.ok(by('de').includes('href="/de/guides/"'));
  assert.ok(by('sv').includes('href="/sv/guides/"'));
  assert.ok(by('fr').includes('href="/guides/"'));
});

test('images have alt text and dimensions, and no icon fonts are left', () => {
  const html = page(site.homeLangs[0]);
  for (const [img] of html.matchAll(/<img\b[^>]*>/g)) assert.ok(/\salt="[^"]+"/.test(img), img);
  for (const [img] of html.matchAll(/<img\b[^>]*ill\/[^>]*>/g)) assert.ok(/width="900" height="1221" loading="lazy"/.test(img), img);
  assert.ok(!/<i class="(fa|ni)[sb ]/.test(html));
});

test('the homepage stylesheet stays small and has no icon fonts', () => {
  const css = read('assets/home.css');
  assert.ok(css.length > 5000, 'stylesheet is empty');
  assert.ok(css.length <= 36 * 1024, `home.css is ${css.length} bytes`);
  assert.ok(!/@font-face/.test(css));
});
