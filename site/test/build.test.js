// Builds the site once into a temp folder and checks what was written.
import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import site from '../src/_data/site.js';
import { loadStrings, untranslated } from '../lib/homeStrings.js';
import allow from './untranslated-allow.js';

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

test('language dialog links all 19 pages, prompt offers the other 18', () => {
  for (const lang of site.homeLangs) {
    const html = page(lang);
    const dialog = html.slice(html.indexOf('<dialog'), html.indexOf('</dialog>'));
    assert.equal((dialog.match(/<a /g) || []).length, 19, lang.code);
    assert.equal((dialog.match(/aria-current="page"/g) || []).length, 1, lang.code);
    const prompt = html.slice(html.indexOf('class="lang-prompt"'), html.indexOf('<dialog'));
    assert.equal((prompt.match(/<a /g) || []).length, 18, lang.code);
    assert.equal(JSON.parse(attr(html, /data-langs="([^"]+)"/).replace(/&quot;/g, '"')).length, 19);
  }
});

test('the inline script stays small', () => {
  const script = fs.readFileSync(path.join(ROOT, 'src/_includes/js/home.cjs'), 'utf8');
  assert.ok(script.length <= 5 * 1024, `home.cjs is ${script.length} bytes`);
});

const jsonLd = html => JSON.parse(attr(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/));

test('structured data parses on every homepage and on guides', () => {
  for (const lang of site.homeLangs) {
    assert.equal(jsonLd(page(lang))['@graph'].length, 5, lang.code);
  }
  assert.equal(jsonLd(read('fr/index.html'))['@graph'][1].inLanguage, 'fr');
  assert.deepEqual(jsonLd(read('guides/router-ad-blocking/index.html'))['@graph'].map(n => n['@type']), ['BreadcrumbList', 'Article']);
  assert.deepEqual(jsonLd(read('sv/guides/index.html'))['@graph'].map(n => n['@type']), ['BreadcrumbList']);
});

test('the sitemap lists every built page once', () => {
  const locs = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.equal(new Set(locs).size, locs.length);
  for (const lang of site.homeLangs) assert.ok(locs.includes(site.origin + lang.path), lang.code);
  assert.equal(locs.length, 19 + 30);
  for (const loc of locs) assert.ok(fs.existsSync(path.join(OUT, new URL(loc).pathname, 'index.html')), loc);
});

test('guides link their own language homepage', () => {
  assert.ok(read('de/guides/index.html').includes('<a class="brand" href="/de/">'));
  assert.ok(read('guides/index.html').includes('<a class="brand" href="/">'));
});

test('every homepage string is translated in every language', () => {
  const used = new Set();
  const dir = path.join(ROOT, 'src/_includes');
  for (const file of [...fs.readdirSync(path.join(dir, 'home')).map(f => `home/${f}`), 'layouts/home.njk']) {
    for (const [, key] of fs.readFileSync(path.join(dir, file), 'utf8').matchAll(/['"]([^'"]+)['"]\s*\|\s*tr\b/g)) used.add(key);
  }
  for (const product of site.products) for (const key of [product.title, product.desc, ...product.points]) used.add(key);
  assert.ok(used.size > 90, `only ${used.size} strings found`);
  const strings = loadStrings(path.join(ROOT, 'src/locales'), site.homeLangs.map(l => l.code));
  const missing = {};
  for (const { code } of site.homeLangs.slice(1)) {
    const keys = untranslated(strings, code, [...used]).filter(key => !(allow[key] === '*' || (allow[key] || []).includes(code)));
    if (keys.length) missing[code] = keys;
  }
  assert.deepEqual(missing, {}, 'strings still in English');
});

test('strings printed as HTML carry only bold and line breaks', () => {
  // These are output unescaped (| safe) or split on <br>; anything else a
  // translation brings in would reach the page as markup.
  const strings = loadStrings(path.join(ROOT, 'src/locales'), site.homeLangs.map(l => l.code));
  for (const { code } of site.homeLangs) {
    const value = strings[code]['homepage download desc android five'] || '';
    assert.deepEqual((value.match(/<[^>]*>/g) || []).filter(tag => !/^<\/?b>$/.test(tag)), [], code);
    assert.ok(!/>\s+</.test(value), `${code}: adjacent tags lose the space between them`);
  }
});

test('controls added for the static page are styled and labelled', () => {
  const css = read('assets/home.css');
  for (const selector of ['.btn-link', '.lang-prompt', 'dialog.languages', '.btn-reset']) assert.ok(css.includes(`${selector}{`), selector);
  for (const lang of site.homeLangs) {
    const html = page(lang);
    assert.ok(/<button[^>]*data-menu-open[^>]*>/.test(html));
    const opener = html.match(/<button[^>]*data-menu-open[^>]*>/)[0];
    assert.ok(opener.includes('aria-controls="menu"') && opener.includes('aria-expanded="false"'), opener);
    assert.ok(!opener.includes(`aria-label="${attr(html, /data-dropdown[^>]*>.*?<span class="nav-link-inner--text">([^<]+)</)}"`), 'menu button shares a name with a dropdown');
    assert.ok(/<p class="lang-prompt" role="status" hidden>/.test(html), lang.code);
    for (const [, pane] of html.matchAll(/data-tab="[a-z]+"[^>]*aria-controls="([^"]+)"/g)) {
      assert.ok(new RegExp(`id="${pane}"[^>]*role="tabpanel"|role="tabpanel"[^>]*id="${pane}"`).test(html), pane);
    }
    assert.equal((html.match(/data-tab="[a-z]+"[^>]*aria-controls=/g) || []).length, 3, lang.code);
  }
});

test('og:locale uses the codes sharing sites know', () => {
  const by = code => attr(page(site.homeLangs.find(l => l.code === code)), /property="og:locale" content="([^"]+)"/);
  assert.equal(by('zh-Hant'), 'zh_TW');
  assert.equal(by('pt-BR'), 'pt_BR');
  assert.equal(by('de'), 'de');
});
