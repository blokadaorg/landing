# Homepage on Eleventy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the blokada.org homepage as static pages in the guides' Eleventy project, one URL per language, and publish with `make deploy`.

**Architecture:** `guides/` becomes `site/`. One paginated template renders the homepage for 19 languages from the existing vue-i18n JSON files, using the markup the Vue app renders today and a stylesheet stripped to the rules that markup uses. Logic that can be wrong (string lookup, language matching, structured data) lives in small modules under `site/lib/` with unit tests; everything else is checked on the built output.

**Tech Stack:** Eleventy 3 (Nunjucks), Node 22 built-in test runner, plain CSS, one inline script. PurgeCSS through `npx`, once, not as a dependency.

**Spec:** `docs/superpowers/specs/2026-10-07-homepage-eleventy-design.md`

## Global Constraints

- 19 languages: en, bg, cs, de, es, fi, fr, hu, id, it, ja, nl, pl, pt-BR, ro, ru, sv, tr, zh-Hant.
- URLs: `/` for English, `/<code lowercased>/` for the rest (`/pt-br/`, `/zh-hant/`). `<html lang>` uses the proper tag (`pt-BR`, `zh-Hant`).
- Guides: sources, URLs and existing tests do not change.
- Same look and copy as the live page. Section ids stay: `family`, `cloud`, `about`, `vpn`, `download`, `community`, `opinions`, `faq`, `donate`, `crypto`, `developer`.
- No automatic language redirect except for an explicit `?lang=` on `/`.
- `home.css` 30 KB or less uncompressed. Inline homepage script 5 KB or less, comments included.
- No analytics, no icon fonts, no new runtime dependencies. `@11ty/eleventy` stays the only devDependency.
- Outgoing links keep `src=landing` exactly where they have it today.
- This repo is public. Never mention the private tracker in commits, code or PR text.
- Commit after every task, with the attribution trailer the session specifies.
- All commands run from the repo root unless a step says otherwise. Node 22 (`source ~/.nvm/nvm.sh && nvm use 22`).

## Review Focus

1. Browser languages that are not an exact code: `de-AT`, `PT-br`, `pt-PT`, `zh-TW`, `zh-CN`. Expected: `de`, `pt-BR`, `pt-BR`, `zh-Hant`, and no prompt for `zh-CN`. Test in Task 6.
2. `?lang=` values from old links: `DE`, `zh-Hant`, `xx`, empty, and a hash after it. Expected: redirect to the right path with the hash kept, or no redirect. Test in Task 6.
3. `localStorage` throwing (private mode, blocked storage). Expected: page works, prompt may show, no script error. Test in Task 6.
4. A string missing or empty in one language's JSON. Expected: English text, never an empty heading or the key name. Test in Task 2.
5. Translated text with quotes, apostrophes or `&` used inside attributes and JSON-LD (French and Italian have apostrophes, Japanese has full-width quotes). Expected: valid HTML attributes and parseable JSON-LD on every page. Test in Task 3 and Task 7.

## File Structure

```
Makefile                           preview, test, deploy
sync-translations.sh               target changes to ../../site
site/                              renamed from guides/
  eleventy.config.js               adds filters, icon shortcode, static passthrough
  package.json
  publish.sh                       rewritten: whole site
  lib/homeStrings.js               load locale JSON, translate with fallback, find untranslated
  lib/jsonld.js                    structured data objects
  src/_data/site.js                adds homeLangs, apps, social
  src/_includes/layouts/home.njk   homepage document shell
  src/_includes/home/*.njk         header, hero, product, download, community, reviews, faq, support, developer, footer, languages
  src/_includes/icons/*.svg        19 Font Awesome icons
  src/_includes/js/home.cjs        inline script, also required by tests
  src/home.njk                     paginates over site.homeLangs
  src/assets/home.css              passthrough to /assets/home.css
  src/static/                      passthrough to /: 404.html, service-worker.js, favicon.png, apple-touch-icon.png, img/
  src/locales/*.json               written by sync-translations.sh
  test/homeStrings.test.js
  test/home-script.test.js
  test/jsonld.test.js
  test/build.test.js               builds once into a temp dir, checks the output
  test/untranslated-allow.js       strings allowed to equal English
```

Reference for the port: the Vue sources stay in `src/` until Task 9. The live page's rendered markup is the template for the new partials: `curl -s https://blokada.org/ > /tmp/home-live.html`.

---

### Task 1: Rename to `site/`, move static files, add the Makefile

**Files:**
- Rename: `guides/` to `site/`
- Move: `public/404.html`, `public/service-worker.js`, `public/favicon.png`, `public/apple-touch-icon.png`, `public/img/` to `site/src/static/`
- Copy: `src/locales/*.json` to `site/src/locales/`
- Modify: `site/eleventy.config.js`, `site/package.json`, `sync-translations.sh`, `.gitignore`
- Create: `Makefile`

**Interfaces:**
- Produces: `make test`, `make preview`; everything under `site/src/static/` is served from `/`; locale files at `site/src/locales/<code>.json`.

- [ ] **Step 1: Move and copy**

```bash
git mv guides site
mkdir -p site/src/static
git mv public/404.html public/service-worker.js public/favicon.png public/apple-touch-icon.png public/img site/src/static/
mkdir -p site/src/locales && cp src/locales/*.json site/src/locales/ && git add site/src/locales
```

`public/index.html` and `src/` stay for now; the Vue app no longer builds from this point and is removed in Task 9.

- [ ] **Step 2: Passthrough the static folder**

In `site/eleventy.config.js`, next to the existing `addPassthroughCopy`:

```js
  // Files served from the site root as they are: 404 page, icons, images and
  // the service worker that unregisters the old homepage's one.
  eleventyConfig.addPassthroughCopy({ 'src/static': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/home.css': 'assets/home.css' });
  eleventyConfig.ignores.add('src/locales/**');
```

Rename the package in `site/package.json` to `"name": "blokada-site"` and its description to `"blokada.org homepage and setup guides"`.

- [ ] **Step 3: Point the translation sync at `site/`**

In `sync-translations.sh` replace the `translate.py` line and its comment with:

```sh
# translate.py writes to <target>/src/locales.
./translate.py -a landing -t ../../site
```

- [ ] **Step 4: Makefile**

```make
PAGES ?= ../landing-github-pages

.PHONY: preview test deploy

preview:
	cd site && npm install --silent && npx @11ty/eleventy --serve --port 8090

test:
	cd site && npm ci --silent && npm test

deploy:
	./site/publish.sh $(PAGES)
	cd $(PAGES) && git add -A && git status --short && \
		git commit -m "publish site: $$(cat version.txt)" && git push
```

Add `/site/dist` and `/site/node_modules` to the root `.gitignore` (the folder has its own, keep it).

- [ ] **Step 5: Verify**

Run: `make test`
Expected: the existing guides tests pass (2 files, all green).

Run: `cd site && npx @11ty/eleventy --quiet && ls dist/404.html dist/favicon.png dist/img/ill/blokada-family.webp dist/guides/index.html`
Expected: all four listed.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "refactor: guides project becomes site, static files move in"
```

---

### Task 2: Languages and string lookup

**Files:**
- Create: `site/lib/homeStrings.js`, `site/test/homeStrings.test.js`
- Modify: `site/src/_data/site.js`

**Interfaces:**
- Produces:
  - `site.homeLangs`: array of `{ code, tag, path, name }`, English first.
  - `loadStrings(dir: string, codes: string[]): Record<code, Record<key, string>>`
  - `translate(strings, code: string, key: string): string`, English when the language lacks the key or has it empty; throws `Error('Unknown homepage string: <key>')` when English lacks it too.
  - `untranslated(strings, code: string, keys: string[]): string[]`, keys whose value equals English.

- [ ] **Step 1: Write the failing tests**

`site/test/homeStrings.test.js`:

```js
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
  assert.deepEqual(site.homeLangs[0], { code: 'en', tag: 'en', path: '/', name: 'English' });
  const ptbr = site.homeLangs.find(l => l.code === 'pt-BR');
  assert.equal(ptbr.path, '/pt-br/');
  assert.equal(ptbr.tag, 'pt-BR');
  assert.equal(new Set(site.homeLangs.map(l => l.path)).size, 19);
});
```

- [ ] **Step 2: Run to see them fail**

Run: `cd site && node --test test/homeStrings.test.js`
Expected: FAIL, cannot find `../lib/homeStrings.js`.

- [ ] **Step 3: Implement**

`site/lib/homeStrings.js`:

```js
import fs from 'node:fs';
import path from 'node:path';

// The homepage strings, one JSON file per language, as translate.py writes
// them from the translate repo.
export function loadStrings(dir, codes) {
  const strings = {};
  for (const code of codes) {
    strings[code] = JSON.parse(fs.readFileSync(path.join(dir, `${code}.json`), 'utf8'));
  }
  return strings;
}

// A language that lacks a string shows the English one, never a blank.
export function translate(strings, code, key) {
  const english = strings.en[key];
  if (english === undefined) throw new Error(`Unknown homepage string: ${key}`);
  return (strings[code] && strings[code][key]) || english;
}

export function untranslated(strings, code, keys) {
  return keys.filter(key => translate(strings, code, key) === strings.en[key]);
}
```

In `site/src/_data/site.js`, add inside the exported object. Names are the ones the old language picker showed:

```js
  // The homepage languages. `code` names the locale file and the string
  // lookups, `tag` goes into lang and hreflang attributes.
  homeLangs: [
    ['en', 'English'], ['bg', 'Български'], ['cs', 'Český'], ['de', 'Deutsch'],
    ['es', 'Español'], ['fi', 'Suomalainen'], ['fr', 'Français'], ['hu', 'Magyar'],
    ['id', 'bahasa Indonesia'], ['it', 'Italiano'], ['ja', '日本語'], ['nl', 'Nederlands'],
    ['pl', 'Polski'], ['pt-BR', 'Portugues (Brasil)'], ['ro', 'Română'], ['ru', 'Pусский'],
    ['sv', 'Svenska'], ['tr', 'Türk'], ['zh-Hant', '中文 (繁體)'],
  ].map(([code, name]) => ({
    code,
    tag: code,
    path: code === 'en' ? '/' : `/${code.toLowerCase()}/`,
    name,
  })),
```

- [ ] **Step 4: Run to see them pass**

Run: `cd site && node --test test/homeStrings.test.js`
Expected: 6 tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(site): homepage languages and string lookup"
```

---

### Task 3: Homepage shell, 19 pages, head tags

**Files:**
- Create: `site/src/home.njk`, `site/src/_includes/layouts/home.njk`, `site/test/build.test.js`
- Modify: `site/eleventy.config.js`

**Interfaces:**
- Consumes: `site.homeLangs`, `loadStrings`, `translate`.
- Produces:
  - Nunjucks filter `tr`: `{{ 'key' | tr }}` returns the string for the page's language (`hl.code`). Add `| safe` only where the Vue template used `v-html`.
  - Filter `firstSentence`.
  - In templates: `hl` (the page's `{ code, tag, path, name }`), `site.homeLangs`.
  - `site/test/build.test.js` exports nothing; it defines `OUT` (temp build dir), `page(lang)` and `read(rel)` helpers that later tasks add tests to.

- [ ] **Step 1: Write the failing build tests**

`site/test/build.test.js`:

```js
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
```

- [ ] **Step 2: Run to see them fail**

Run: `cd site && node --test test/build.test.js`
Expected: FAIL on "a homepage exists for every language" (no `index.html` at the output root).

- [ ] **Step 3: Filters**

In `site/eleventy.config.js`, add the imports at the top and the rest inside the config function:

```js
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import site from './src/_data/site.js';
import { loadStrings, translate } from './lib/homeStrings.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const homeStrings = loadStrings(path.join(here, 'src/locales'), site.homeLangs.map(l => l.code));
```

```js
  // The homepage's strings come from the translate repo, keyed like the
  // Vue app's. `hl` is the language of the page being rendered.
  eleventyConfig.addFilter('tr', function (key, code) {
    return translate(homeStrings, code || this.ctx.hl.code, key);
  });
  // The hero paragraph's first sentence is the search description.
  eleventyConfig.addFilter('firstSentence', text => {
    const end = text.search(/[.。!?]\s|[.。]$/);
    return end === -1 ? text : text.slice(0, end + 1);
  });
```

- [ ] **Step 4: Page and layout**

`site/src/home.njk`:

```njk
---
pagination:
  data: site.homeLangs
  size: 1
  alias: hl
permalink: "{{ hl.path }}"
layout: layouts/home.njk
eleventyExcludeFromCollections: true
---
```

`site/src/_includes/layouts/home.njk`:

```njk
{%- set canonical = site.origin + hl.path -%}
{%- set title = 'homepage page title' | tr -%}
{%- set description = 'homepage hero desc' | tr | firstSentence -%}
{%- set guidesPath = (site.prefix[hl.code] if site.prefix[hl.code] is defined else '') + '/guides/' -%}
<!DOCTYPE html>
<html lang="{{ hl.tag }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ title }}</title>
  <meta name="description" content="{{ description }}">
  <link rel="canonical" href="{{ canonical }}">
  {%- for l in site.homeLangs %}
  <link rel="alternate" hreflang="{{ l.tag }}" href="{{ site.origin }}{{ l.path }}">
  {%- endfor %}
  <link rel="alternate" hreflang="x-default" href="{{ site.origin }}/">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Blokada">
  <meta property="og:title" content="{{ title }}">
  <meta property="og:description" content="{{ description }}">
  <meta property="og:url" content="{{ canonical }}">
  <meta property="og:image" content="{{ site.origin }}/img/blokada-thumb.png">
  <meta property="og:image:width" content="420">
  <meta property="og:image:height" content="420">
  <meta property="og:locale" content="{{ hl.tag | replace('-', '_') }}">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#121212">
  {#- Offers the Blokada 6 app in Safari on iPhone and iPad. #}
  <meta name="apple-itunes-app" content="app-id=1508341781">
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/home.css">
</head>
<body>
  <main>
    <h1>{{ 'homepage hero heading' | tr }} <span>{{ 'homepage hero heading platforms' | tr }}</span></h1>
  </main>
</body>
</html>
```

The four new strings are not in the locale files until the translate PR is merged and synced. Until then add them to `site/src/locales/en.json` by hand, with the values from the spec, so `tr` finds them (other languages fall back to English):

```json
"homepage page title": "Blokada: ad blocker, parental control and VPN for Android and iOS",
"homepage hero heading": "Ad blocker and privacy apps",
"homepage hero heading platforms": "for Android and iOS",
"homepage language prompt": "Read this page in your language",
```

Create an empty `site/src/assets/home.css` so the passthrough has a file.

- [ ] **Step 5: Run to see them pass**

Run: `cd site && npm test`
Expected: all tests pass, including the existing guides tests.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat(site): homepage shell in 19 languages with head tags"
```

---

### Task 4: Port the sections

**Files:**
- Create: `site/src/_includes/home/{header,hero,product,download,community,reviews,faq,support,developer,footer}.njk`, `site/src/_includes/icons/*.svg`
- Modify: `site/src/_includes/layouts/home.njk`, `site/eleventy.config.js`, `site/src/_data/site.js`, `site/test/build.test.js`

**Interfaces:**
- Consumes: `tr`, `hl`, `guidesPath`.
- Produces: shortcode `{% icon "solid-check" %}`; the section ids from Global Constraints; elements the script in Task 6 drives, with these exact hooks:
  - mobile menu: `<button data-menu-open>`, `<button data-menu-close>`, the collapsible `<div class="navbar-collapse" id="menu">`.
  - dropdowns: `<li class="dropdown">` containing `<a href="#" data-dropdown>` and `<ul class="dropdown-menu">`.
  - tabs: `<a data-tab="ios|android|other">` and `<div class="tab-pane" data-pane="ios|android|other">`; the iOS tab and pane carry `active`.
  - language dialog and prompt are Task 6.

- [ ] **Step 1: Write the failing tests**

Append to `site/test/build.test.js`:

```js
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
```

Run: `cd site && node --test test/build.test.js`
Expected: the new tests FAIL (sections missing).

- [ ] **Step 2: Icons**

Copy the 19 icons from the Font Awesome package still in the root `node_modules` (run `yarn install --frozen-lockfile` at the root first if it is missing):

```bash
mkdir -p site/src/_includes/icons
FA=node_modules/@fortawesome/fontawesome-free/svgs
for i in android apple facebook-square github google-play reddit twitter; do cp $FA/brands/$i.svg site/src/_includes/icons/brands-$i.svg; done
for i in book-open check cloud cloud-download-alt comments flag heart info laptop shield-alt star user-circle; do cp $FA/solid/$i.svg site/src/_includes/icons/solid-$i.svg; done
```

The three Nucleo icons map to these: `ni-cloud-download-95` to `solid-cloud-download-alt`, `ni-collection` to `solid-book-open`, `ni-ui-04` to `solid-laptop`.

Shortcode in `site/eleventy.config.js` (uses the `fs` and `here` already imported):

```js
  // Font Awesome Free 5 icons (CC BY 4.0), inlined so no icon font loads.
  eleventyConfig.addShortcode('icon', name => {
    const svg = fs.readFileSync(path.join(here, 'src/_includes/icons', `${name}.svg`), 'utf8');
    return svg.replace(/<!--[\s\S]*?-->/g, '').replace('<svg ', '<svg class="i" aria-hidden="true" focusable="false" ');
  });
```

- [ ] **Step 3: Data for the fixed content**

Add to `site/src/_data/site.js`:

```js
  // Shown as they were written, in English, on every language's page.
  reviews: [
    'A world without blokada is desolate, annoying and too full.',
    'My parents are phone shopping and yes this is a selling point that it works with Blokada as dad said so.',
    'And thanks for making this free app in the first place, it’s a lifesaver.',
  ],
```

Take the three quote texts from `src/views/Home.vue` (`opinions`, entries 2 to 4) exactly as written there, replacing the three lines above if they differ.

- [ ] **Step 4: Port the markup**

Source of truth is the markup the live page renders, not the `.vue` files: `curl -s https://blokada.org/ > /tmp/home-live.html`, then take each block between `<header class="header-global">` and the end of `<footer>`. Use `src/views/Home.vue`, `src/layout/AppHeader.vue` and `src/layout/AppFooter.vue` to see which string key each text comes from. Rules:

1. Keep every class name and wrapper element exactly, so the stylesheet in Task 5 matches.
2. Text: `{{ $t('key') }}` becomes `{{ 'key' | tr }}`; an element with `v-html="$t('key')"` becomes `{{ 'key' | tr | safe }}`; `translateAndReplaceBr('key')` becomes `{{ 'key' | tr | replace(r/<br\s*\/?>/gi, '\n') }}` and keeps `class="newlines"`.
3. Icons: `<i class="fas fa-check"></i>` becomes `{% icon "solid-check" %}`, `fab` becomes `brands-`, Nucleo per the mapping above. Keep any wrapper (`<span class="btn-inner--icon">`, `<div class="icon icon-shape ...">`).
4. Headings, per the spec: hero `h1` is `{{ 'homepage hero heading' | tr }} <span>{{ 'homepage hero heading platforms' | tr }}</span>`; product titles, download header, community, FAQ, support and developer headers are `h2`; download card titles, "Join us", FAQ questions and the support card title are `h3`; add `<h2 class="sr-only">{{ 'homepage header opinions' | tr }}</h2>` to the reviews section if that key exists, otherwise reuse the key of the "Reviews" menu entry. Each keeps its original classes (`display-3`, `title`, `mb-0` and so on); where the old tag carried the size, add the matching Bootstrap class (`h3`, `h4`, `h6`).
5. The 27 feature bullets become `<ul class="list-unstyled mt-5">` with `<li class="py-2">` and a `<span class="mb-0 h6">` for the text, replacing the `h6`.
6. The four product blocks share `home/product.njk`, included with `{% set p = {...} %}` for id, image, title key, description key and the list of bullet keys. Image tag: `<img src="/img/ill/blokada-family.webp" class="img-fluid floating" width="900" height="1221" loading="lazy" decoding="async" alt="{{ p.title | tr }}">`.
7. Menu labels and the footer "Let's stay in touch" line become `<span>` or `<p>` with the same classes, not headings.
8. All `href` and `src` are root-relative (`/img/...`), never relative. The logo links to `{{ hl.path }}`. The guides button links to `{{ guidesPath }}`.
9. Header "Language" button: `<button type="button" class="nav-link nav-link-icon btn-reset" data-languages-open>{% icon "solid-flag" %}<span class="nav-link-inner--text ml-2">{{ hl.code | upper }}</span></button>`. The dialog itself is Task 6.
10. Hooks from the Interfaces block above go on the menu, dropdowns and tabs. Tab labels link to `#download`.
11. Leave out: the donate modal (already gone), `data-toggle` attributes, `router-link` classes, the Vue transition wrappers.
12. Footer year: `{{ buildDate | truncate(4, true, '') }}`.

`layouts/home.njk` body becomes:

```njk
<body>
  {% include "home/header.njk" %}
  <main>
    {% include "home/hero.njk" %}
    {% include "home/products.njk" %}
    {% include "home/download.njk" %}
    {% include "home/community.njk" %}
    {% include "home/reviews.njk" %}
    {% include "home/faq.njk" %}
    {% include "home/support.njk" %}
    {% include "home/developer.njk" %}
  </main>
  {% include "home/footer.njk" %}
</body>
```

(`home/products.njk` includes `home/product.njk` four times.)

- [ ] **Step 5: Run to see them pass**

Run: `cd site && npm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat(site): homepage sections as static markup"
```

---

### Task 5: Stylesheet

**Files:**
- Modify: `site/src/assets/home.css`, `site/test/build.test.js`

**Interfaces:**
- Consumes: the built pages from Task 4.
- Produces: `/assets/home.css`; classes the script toggles keep their rules: `show`, `active`, `js`.

- [ ] **Step 1: Failing size test**

Append to `site/test/build.test.js`:

```js
test('the homepage stylesheet stays small and has no icon fonts', () => {
  const css = read('assets/home.css');
  assert.ok(css.length > 5000, 'stylesheet is empty');
  assert.ok(css.length <= 30 * 1024, `home.css is ${css.length} bytes`);
  assert.ok(!/@font-face/.test(css));
});
```

Run: `cd site && node --test test/build.test.js`. Expected: FAIL, stylesheet is empty.

- [ ] **Step 2: Produce the stylesheet**

```bash
mkdir -p /tmp/blokada-css && cd /tmp/blokada-css
curl -sO https://blokada.org/css/chunk-vendors.390dc6c7.css -O https://blokada.org/css/app.224e5573.css
cd - && cd site && npx @11ty/eleventy --quiet
npx -y purgecss@6 --css /tmp/blokada-css/chunk-vendors.390dc6c7.css /tmp/blokada-css/app.224e5573.css \
  --content dist/index.html dist/de/index.html dist/ja/index.html \
  --safelist show active js sr-only --font-face --keyframes --variables \
  --output /tmp/blokada-css/out
cat /tmp/blokada-css/out/chunk-vendors.390dc6c7.css /tmp/blokada-css/out/app.224e5573.css > src/assets/home.css
```

If the two file names 404, read the current ones from `curl -s https://blokada.org/ | grep -o 'css/[a-z-]*\.[0-9a-f]*\.css'`.

Then delete any remaining `@font-face` blocks and rules whose selectors start with `.fa`, `.fab`, `.fas` or `.ni` by hand, and append:

```css
/* Additions for the static page. */
.i { width: 1em; height: 1em; fill: currentColor; vertical-align: -0.125em; }
.btn-reset { background: none; border: 0; cursor: pointer; }
html:not(.js) .tab-content > .tab-pane { display: block; }
.newlines { white-space: pre-wrap; }
.lang-prompt { margin: 0; padding: 8px 16px; background: #1c1c1e; color: #fff; text-align: center; font-size: 0.875rem; }
.lang-prompt a { color: #fff; text-decoration: underline; }
.lang-prompt button { margin-left: 12px; color: #fff; }
dialog.languages { border: 0; border-radius: 6px; padding: 24px; max-width: 420px; width: calc(100% - 32px); }
dialog.languages::backdrop { background: rgba(0, 0, 0, 0.5); }
dialog.languages ul { list-style: none; margin: 0 0 16px; padding: 0; columns: 2; }
dialog.languages a { display: block; padding: 6px 0; }
dialog.languages [aria-current] { font-weight: 600; }
```

- [ ] **Step 3: Compare with the live page**

```bash
cd site && npx @11ty/eleventy --quiet && (cd dist && python3 -m http.server 8792 >/dev/null 2>&1 &)
C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for w in 1280 390; do
  "$C" --headless=new --hide-scrollbars --window-size=$w,12000 --virtual-time-budget=6000 --screenshot=/tmp/new-$w.png http://localhost:8792/
  "$C" --headless=new --hide-scrollbars --window-size=$w,12000 --virtual-time-budget=6000 --screenshot=/tmp/live-$w.png https://blokada.org/
done
```

Look at both pairs section by section (crop with `magick ... -crop`). Fix differences in markup or by restoring a dropped rule. Expected remaining differences: the hero heading text, heading tags, three fixed reviews.

- [ ] **Step 4: Run tests, commit**

Run: `cd site && npm test`. Expected: all pass.

```bash
pkill -f "http.server 8792"; git add -A && git commit -m "feat(site): homepage stylesheet stripped to what the page uses"
```

---

### Task 6: Script, language dialog and prompt

**Files:**
- Create: `site/src/_includes/js/home.cjs`, `site/src/_includes/home/languages.njk`, `site/test/home-script.test.js`
- Modify: `site/src/_includes/layouts/home.njk`, `site/eleventy.config.js`, `site/test/build.test.js`

**Interfaces:**
- Consumes: the hooks from Task 4.
- Produces (exported from `home.cjs` for tests):
  - `matchLanguage(preferred: string[], codes: string[]): string | null`
  - `langRedirect(search: string, hash: string, langs: {code, path}[]): string | null`
  - `storage(win): { get(key): string | null, set(key, value): void }`, never throws.
  - Markup: `<dialog class="languages" id="languages">`, `<p class="lang-prompt" hidden>` with one `<a data-lang="<code>" hidden>` per language and `<button data-prompt-close>`.
  - Storage keys: `blokada_lang`, `blokada_lang_prompt`.

- [ ] **Step 1: Write the failing tests**

`site/test/home-script.test.js`:

```js
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
```

Run: `cd site && node --test test/home-script.test.js`. Expected: FAIL, cannot find module.

- [ ] **Step 2: Implement the script**

`site/src/_includes/js/home.cjs`:

```js
// Inlined into the homepage. Everything on the page reads and links without
// it; this adds the menu, tabs, language picker and the old ?lang= links.
(function (root) {
  // The first browser language we have a page for. Portuguese readers get
  // the Brazilian page, Traditional Chinese regions the zh-Hant one.
  function matchLanguage(preferred, codes) {
    for (var i = 0; i < preferred.length; i++) {
      var want = String(preferred[i] || '').toLowerCase();
      if (!want) continue;
      if (/^zh-(tw|hk|mo|hant)/.test(want)) want = 'zh-hant';
      else if (/^zh\b/.test(want)) continue;
      else if (/^pt\b/.test(want)) want = 'pt-br';
      for (var j = 0; j < codes.length; j++) {
        var code = codes[j].toLowerCase();
        if (code === want || code === want.split('-')[0]) return codes[j];
      }
    }
    return null;
  }

  // Where an old /?lang=xx link should land, or null to stay.
  function langRedirect(search, hash, langs) {
    var found = /[?&]lang=([A-Za-z-]+)(?:&|$)/.exec(search);
    if (!found) return null;
    for (var i = 0; i < langs.length; i++) {
      if (langs[i].code.toLowerCase() === found[1].toLowerCase()) {
        return langs[i].code === 'en' ? null : langs[i].path + hash;
      }
    }
    return null;
  }

  // localStorage that never throws: private windows and blocked site data.
  function storage(win) {
    return {
      get: function (key) { try { return win.localStorage.getItem(key); } catch (e) { return null; } },
      set: function (key, value) { try { win.localStorage.setItem(key, value); } catch (e) { /* not kept */ } },
    };
  }

  if (typeof module !== 'undefined') module.exports = { matchLanguage: matchLanguage, langRedirect: langRedirect, storage: storage };
  var doc = root.document;
  if (!doc) return;

  var page = doc.documentElement;
  var langs = JSON.parse(page.getAttribute('data-langs'));
  var current = page.getAttribute('data-lang');
  var store = storage(root);

  if (current === 'en') {
    var target = langRedirect(root.location.search, root.location.hash, langs);
    if (target) { root.location.replace(target); return; }
  }
  page.className += ' js';

  function on(selector, handler) {
    Array.prototype.forEach.call(doc.querySelectorAll(selector), function (el) {
      el.addEventListener('click', function (event) { handler(el, event); });
    });
  }

  var menu = doc.getElementById('menu');
  on('[data-menu-open]', function () { menu.classList.add('show'); });
  on('[data-menu-close], #menu a[href^="#"]:not([data-dropdown])', function () { menu.classList.remove('show'); });

  on('[data-dropdown]', function (el, event) {
    event.preventDefault();
    var list = el.parentNode.querySelector('.dropdown-menu');
    var open = list.classList.contains('show');
    Array.prototype.forEach.call(doc.querySelectorAll('.dropdown-menu.show'), function (other) { other.classList.remove('show'); });
    if (!open) list.classList.add('show');
    event.stopPropagation();
  });
  doc.addEventListener('click', function () {
    Array.prototype.forEach.call(doc.querySelectorAll('.dropdown-menu.show'), function (list) { list.classList.remove('show'); });
  });

  on('[data-tab]', function (el, event) {
    event.preventDefault();
    Array.prototype.forEach.call(doc.querySelectorAll('[data-tab]'), function (tab) {
      var active = tab === el;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    Array.prototype.forEach.call(doc.querySelectorAll('[data-pane]'), function (pane) {
      pane.classList.toggle('active', pane.getAttribute('data-pane') === el.getAttribute('data-tab'));
    });
  });

  var dialog = doc.getElementById('languages');
  on('[data-languages-open]', function () { if (dialog.showModal) dialog.showModal(); else dialog.setAttribute('open', ''); });
  on('[data-languages-close]', function () { if (dialog.close) dialog.close(); else dialog.removeAttribute('open'); });
  on('#languages a', function (el) { store.set('blokada_lang', el.getAttribute('data-lang')); });

  var prompt = doc.querySelector('.lang-prompt');
  var wanted = matchLanguage(root.navigator.languages || [root.navigator.language], langs.map(function (l) { return l.code; }));
  if (wanted && wanted !== current && !store.get('blokada_lang') && !store.get('blokada_lang_prompt')) {
    var link = prompt.querySelector('[data-lang="' + wanted + '"]');
    if (link) { link.hidden = false; prompt.hidden = false; }
  }
  on('[data-prompt-close]', function () { prompt.hidden = true; store.set('blokada_lang_prompt', 'closed'); });
  on('.lang-prompt a', function (el) { store.set('blokada_lang', el.getAttribute('data-lang')); });
})(typeof window !== 'undefined' ? window : this);
```

- [ ] **Step 3: Markup and wiring**

`site/src/_includes/home/languages.njk`:

```njk
<p class="lang-prompt" hidden>
  {%- for l in site.homeLangs %}{% if l.code != hl.code %}
  <a href="{{ l.path }}" data-lang="{{ l.code }}" lang="{{ l.tag }}" hreflang="{{ l.tag }}" hidden>{{ 'homepage language prompt' | tr(l.code) }}</a>
  {%- endif %}{% endfor %}
  <button type="button" class="btn-reset" data-prompt-close aria-label="{{ 'universal action close' | tr }}">&times;</button>
</p>
<dialog class="languages" id="languages" aria-labelledby="languages-title">
  <p class="h6" id="languages-title">{{ 'app settings language label' | tr }}</p>
  <ul>
    {%- for l in site.homeLangs %}
    <li><a href="{{ l.path }}" data-lang="{{ l.code }}" lang="{{ l.tag }}" hreflang="{{ l.tag }}"{% if l.code == hl.code %} aria-current="page"{% endif %}>{{ l.name }}</a></li>
    {%- endfor %}
  </ul>
  <button type="button" class="btn btn-link" data-languages-close>{{ 'universal action cancel' | tr }}</button>
</dialog>
```

In `site/eleventy.config.js`, next to the other inlined scripts:

```js
  eleventyConfig.addGlobalData(
    'homeScript',
    fs.readFileSync(new URL('./src/_includes/js/home.cjs', import.meta.url), 'utf8'),
  );
  eleventyConfig.addFilter('langList', langs => JSON.stringify(langs.map(({ code, path }) => ({ code, path }))));
```

In `layouts/home.njk`: the `<html>` tag becomes `<html lang="{{ hl.tag }}" data-lang="{{ hl.code }}" data-langs="{{ site.homeLangs | langList }}">`; `{% include "home/languages.njk" %}` goes first inside `<body>`; `<script>{{ homeScript | safe }}</script>` goes last inside `<body>`.

- [ ] **Step 4: Build tests for the markup**

Append to `site/test/build.test.js`:

```js
test('language dialog links all 19 pages, prompt offers the other 18', () => {
  for (const lang of site.homeLangs) {
    const html = page(lang);
    const dialog = html.slice(html.indexOf('<dialog'), html.indexOf('</dialog>'));
    assert.equal((dialog.match(/<a /g) || []).length, 19, lang.code);
    assert.equal((dialog.match(/aria-current="page"/g) || []).length, 1, lang.code);
    const prompt = html.slice(html.indexOf('class="lang-prompt"'), html.indexOf('<dialog'));
    assert.equal((prompt.match(/<a /g) || []).length, 18, lang.code);
    assert.deepEqual(JSON.parse(attr(html, /data-langs="([^"]+)"/).replace(/&quot;/g, '"')).length, 19);
  }
});

test('the inline script stays small', () => {
  const script = fs.readFileSync(path.join(ROOT, 'src/_includes/js/home.cjs'), 'utf8');
  assert.ok(script.length <= 5 * 1024, `home.cjs is ${script.length} bytes`);
});
```

- [ ] **Step 5: Run, check by hand, commit**

Run: `cd site && npm test`. Expected: all pass.

By hand on `make preview` at 390 px and 1280 px: menu opens and closes, both dropdowns, three tabs, language dialog opens with Escape closing it, `/?lang=de#download` lands on `/de/#download`. With JavaScript disabled: all three download panes visible, all links work.

```bash
git add -A && git commit -m "feat(site): homepage menu, tabs, language picker and prompt"
```

---

### Task 7: Structured data, sitemap, guides links home

**Files:**
- Create: `site/lib/jsonld.js`, `site/test/jsonld.test.js`
- Modify: `site/eleventy.config.js`, `site/src/_data/site.js`, `site/src/_includes/layouts/home.njk`, `site/src/_includes/layouts/base.njk`, `site/src/sitemap.njk`, `site/test/build.test.js`

**Interfaces:**
- Produces:
  - `homeJsonLd(site, lang: {tag, path}, description: string): object` with `@graph` of `Organization`, `WebSite`, three `SoftwareApplication`.
  - `guideJsonLd(site, { url, lang, title, description, updated, isIndex, guidesUrl, guidesTitle }): object` with `@graph` of `BreadcrumbList` and, unless `isIndex`, `Article`.
  - Filter `jsonld`: serialises for a `<script type="application/ld+json">`, escaping `<`.

- [ ] **Step 1: Data**

Add to `site/src/_data/site.js`:

```js
  social: [
    'https://community.blokada.org/',
    'https://github.com/blokadaorg/blokada',
    'https://twitter.com/blokadaorg',
    'https://www.facebook.com/blokadaorg/',
    'https://www.reddit.com/r/blokada',
  ],
  apps: [
    { name: 'Blokada 6', os: 'iOS, Android', url: 'https://apps.apple.com/app/blokada/id1508341781' },
    { name: 'Blokada Family', os: 'iOS, Android', url: 'https://apps.apple.com/app/id6458733529' },
    { name: 'Blokada 5', os: 'Android', url: 'https://go.blokada.org/apk5' },
  ],
```

- [ ] **Step 2: Failing tests**

`site/test/jsonld.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import site from '../src/_data/site.js';
import { homeJsonLd, guideJsonLd, serialise } from '../lib/jsonld.js';

const types = data => data['@graph'].map(node => node['@type']);

test('homepage: organisation, website and the three apps, no ratings or offers', () => {
  const data = homeJsonLd(site, { tag: 'de', path: '/de/' }, 'Beschreibung');
  assert.deepEqual(types(data), ['Organization', 'WebSite', 'SoftwareApplication', 'SoftwareApplication', 'SoftwareApplication']);
  assert.equal(data['@graph'][1].inLanguage, 'de');
  assert.equal(data['@graph'][1].url, 'https://blokada.org/de/');
  assert.ok(!JSON.stringify(data).includes('aggregateRating'));
  assert.ok(!JSON.stringify(data).includes('offers'));
});

test('guide: breadcrumbs and article; index: breadcrumbs only', () => {
  const guide = guideJsonLd(site, { url: '/de/guides/router-ad-blocking/', lang: 'de', title: 'Titel', description: 'Text', updated: '2026-10-02', isIndex: false, guidesUrl: '/de/guides/', guidesTitle: 'Anleitungen' });
  assert.deepEqual(types(guide), ['BreadcrumbList', 'Article']);
  assert.equal(guide['@graph'][0].itemListElement.length, 3);
  assert.equal(guide['@graph'][1].dateModified, '2026-10-02');
  const index = guideJsonLd(site, { url: '/guides/', lang: 'en', title: 'Guides', description: 'Text', isIndex: true, guidesUrl: '/guides/', guidesTitle: 'Guides' });
  assert.deepEqual(types(index), ['BreadcrumbList']);
  assert.equal(index['@graph'][0].itemListElement.length, 2);
});

test('serialise cannot close the script tag', () => {
  const out = serialise({ name: 'a </script><b>"quoted" & l\'apostrophe' });
  assert.ok(!out.includes('</script>'));
  assert.deepEqual(JSON.parse(out), { name: 'a </script><b>"quoted" & l\'apostrophe' });
});
```

Run: `cd site && node --test test/jsonld.test.js`. Expected: FAIL, module not found.

- [ ] **Step 3: Implement**

`site/lib/jsonld.js`:

```js
const organization = site => ({
  '@type': 'Organization',
  '@id': `${site.origin}/#organization`,
  name: 'Blokada',
  url: `${site.origin}/`,
  logo: `${site.origin}/img/blokada-thumb.png`,
  sameAs: site.social,
});

export function homeJsonLd(site, lang, description) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(site),
      { '@type': 'WebSite', name: 'Blokada', url: site.origin + lang.path, inLanguage: lang.tag, description, publisher: { '@id': `${site.origin}/#organization` } },
      ...site.apps.map(app => ({
        '@type': 'SoftwareApplication',
        name: app.name,
        operatingSystem: app.os,
        applicationCategory: 'SecurityApplication',
        url: app.url,
        publisher: { '@id': `${site.origin}/#organization` },
      })),
    ],
  };
}

export function guideJsonLd(site, page) {
  const crumb = (position, name, url) => ({ '@type': 'ListItem', position, name, item: site.origin + url });
  const crumbs = [crumb(1, 'Blokada', '/'), crumb(2, page.guidesTitle, page.guidesUrl)];
  if (!page.isIndex) crumbs.push(crumb(3, page.title, page.url));
  const graph = [{ '@type': 'BreadcrumbList', itemListElement: crumbs }];
  if (!page.isIndex) {
    graph.push({
      '@type': 'Article',
      headline: page.title,
      description: page.description,
      inLanguage: page.lang,
      dateModified: page.updated,
      mainEntityOfPage: site.origin + page.url,
      author: { '@type': 'Organization', name: 'Blokada', url: `${site.origin}/` },
      publisher: { '@type': 'Organization', name: 'Blokada', logo: { '@type': 'ImageObject', url: `${site.origin}/img/blokada-thumb.png` } },
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

// For a <script type="application/ld+json">: text in it must not be able to
// end the element.
export const serialise = data => JSON.stringify(data).replace(/</g, '\\u003c');
```

In `site/eleventy.config.js`:

```js
import { homeJsonLd, guideJsonLd, serialise } from './lib/jsonld.js';
```

```js
  eleventyConfig.addFilter('homeJsonLd', (lang, description) => serialise(homeJsonLd(site, lang, description)));
  eleventyConfig.addFilter('guideJsonLd', page => serialise(guideJsonLd(site, page)));
```

In `layouts/home.njk` `<head>`, last line:

```njk
  <script type="application/ld+json">{{ hl | homeJsonLd(description) | safe }}</script>
```

In `layouts/base.njk` `<head>`, last line, and change the brand link to the language's homepage:

```njk
  <script type="application/ld+json">{{ { url: page.url, lang: lang, title: title, description: description, updated: (updated | isoDate if updated else undefined), isIndex: key == 'index', guidesUrl: site.prefix[lang] + '/guides/', guidesTitle: s.guides } | guideJsonLd | safe }}</script>
```

```njk
        <a class="brand" href="{{ site.prefix[lang] }}/"><img src="/img/brand/white.png" alt="Blokada" height="40"></a>
```

- [ ] **Step 4: Sitemap**

In `site/src/sitemap.njk` replace the hard-coded homepage `<url>` with:

```njk
  {%- for l in site.homeLangs %}
  <url>
    <loc>{{ site.origin }}{{ l.path }}</loc>
    {%- for alt in site.homeLangs %}
    <xhtml:link rel="alternate" hreflang="{{ alt.tag }}" href="{{ site.origin }}{{ alt.path }}"/>
    {%- endfor %}
    <xhtml:link rel="alternate" hreflang="x-default" href="{{ site.origin }}/"/>
  </url>
  {%- endfor %}
```

- [ ] **Step 5: Build tests**

Append to `site/test/build.test.js`:

```js
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
```

Run: `cd site && npm test`. Expected: all pass. If the guide count is not 30 (9 guides and an index in 3 languages), set the number to what `ls site/src/en/*.md | wc -l` gives, times 3, plus 3.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat(site): structured data, homepages in the sitemap"
```

---

### Task 8: Translation completeness gate

**Files:**
- Create: `site/test/untranslated-allow.js`
- Modify: `site/test/build.test.js`

**Interfaces:**
- Consumes: `loadStrings`, `untranslated`.

- [ ] **Step 1: The test**

Append to `site/test/build.test.js`:

```js
import { loadStrings, untranslated } from '../lib/homeStrings.js';
import allow from './untranslated-allow.js';

test('every homepage string is translated in every language', () => {
  const used = new Set();
  const dir = path.join(ROOT, 'src/_includes');
  for (const file of [...fs.readdirSync(path.join(dir, 'home')).map(f => `home/${f}`), 'layouts/home.njk']) {
    for (const [, key] of fs.readFileSync(path.join(dir, file), 'utf8').matchAll(/'([^']+)'\s*\|\s*tr\b/g)) used.add(key);
  }
  assert.ok(used.size > 90, `only ${used.size} strings found`);
  const strings = loadStrings(path.join(ROOT, 'src/locales'), site.homeLangs.map(l => l.code));
  const missing = {};
  for (const { code } of site.homeLangs.slice(1)) {
    const keys = untranslated(strings, code, [...used]).filter(key => !(allow[key] === '*' || (allow[key] || []).includes(code)));
    if (keys.length) missing[code] = keys;
  }
  assert.deepEqual(missing, {}, 'strings still in English');
});
```

(Move the two `import` lines to the top of the file with the others.)

- [ ] **Step 2: The allowlist**

Run the test, read the failures, and for each reported string decide: is the translation legitimately identical to English in that language? Only then allow it. `site/test/untranslated-allow.js`:

```js
// Homepage strings that may read the same as English: product names, and
// words a language borrows unchanged. '*' allows every language.
export default {
  'homepage download action android five': '*', // "Blokada 5 .apk"
  'homepage action dashboard': ['de', 'fr', 'it', 'nl'],
  'homepage faq menu': '*', // "FAQ"
};
```

The three entries are examples of the form; replace the key names and language lists with what the run reports. Never allow these, in any language: `homepage page title`, `homepage hero heading`, `homepage hero heading platforms`, `homepage language prompt`, `homepage download action setup guides`, `homepage download cloud desc`. A sentence-length string identical to English is always a missing translation.

- [ ] **Step 3: Run**

Run: `cd site && node --test test/build.test.js`
Expected: FAIL on "every homepage string is translated in every language", listing only the never-allow strings above for the languages Crowdin has not delivered. That failure is the merge gate and stays until the sync in Task 10.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "test(site): fail while homepage strings are still in English"
```

---

### Task 9: Publish script, `make deploy`, remove the Vue app

**Files:**
- Rewrite: `site/publish.sh`, `site/README.md`, `README.md`
- Delete: `src/`, `public/`, `package.json`, `yarn.lock`, `vue.config.js`, `babel.config.js`, `.postcssrc.js`, `.eslintrc.js`, `.browserslistrc`, `.env`, `release.sh`

- [ ] **Step 1: `site/publish.sh`**

```sh
#!/bin/sh
#
# Builds the site (homepage and guides) and copies it into a
# landing-github-pages checkout. Touches only the paths the site owns, so it
# never disturbs the blocklists, api or mirrors published from elsewhere.
#
# Usage: ./publish.sh ../../landing-github-pages   (or: make deploy)

set -e

if [ -z "$1" ] || [ ! -f "$1/CNAME" ]; then
  echo "usage: $0 <path to landing-github-pages checkout>" >&2
  exit 1
fi
# Absolute before the cd below, or a relative path would resolve elsewhere.
target=$(cd "$1" && pwd)

if [ -n "$(git -C "$target" status --porcelain)" ]; then
  echo "$target has uncommitted changes. Commit or discard them first." >&2
  exit 1
fi
git -C "$target" fetch --quiet
if [ -n "$(git -C "$target" rev-list 'HEAD..@{u}')" ]; then
  echo "$target is behind its remote. Pull first." >&2
  exit 1
fi

cd "$(dirname "$0")"
rm -rf dist
npm ci --silent
npm test
npx @11ty/eleventy --quiet

# Folders only the site writes: replaced whole, so removed pages disappear.
for dir in guides de/guides sv/guides assets; do
  mkdir -p "$target/$dir"
  rsync -a --delete "dist/$dir/" "$target/$dir/"
done
# Everything else is copied over what is there. Language folders also hold
# the guides, and img/ holds files other projects link to, so nothing here
# is ever deleted.
rsync -a --exclude=/guides --exclude=/de/guides --exclude=/sv/guides --exclude=/assets dist/ "$target/"

tag=$(git describe --abbrev=4 --always --dirty)
echo "$tag" > "$target/version.txt"
echo "Copied site ($tag) into $target."
```

- [ ] **Step 2: Check the refusals and a dry copy**

```bash
T=$(mktemp -d) && git clone -q ../landing-github-pages "$T/pages" && touch "$T/pages/dirty" && ./site/publish.sh "$T/pages"; echo "exit $?"
```

Expected: "has uncommitted changes", exit 1. (The translation gate would also stop it at `npm test`; the dirty check comes first.)

- [ ] **Step 3: Remove the Vue app**

```bash
git rm -r -q src public package.json yarn.lock vue.config.js babel.config.js .postcssrc.js .eslintrc.js .browserslistrc .env release.sh
rm -rf node_modules dist
```

Trim the root `.gitignore` to:

```
.DS_Store
/site/dist
/site/node_modules
.idea
.vscode
```

- [ ] **Step 4: READMEs**

Root `README.md`:

```md
# blokada.org

The homepage and the setup guides, as one static site built with Eleventy.
Sources are in `site/`. The published build is in landing-github-pages.

    make preview   # http://localhost:8090/
    make test
    make deploy    # builds, tests, copies into ../landing-github-pages, commits and pushes there

Translations come from the translate repo (the `translate` submodule):
`./sync-translations.sh` updates the homepage strings in `site/src/locales`.
`make deploy` refuses to publish while a homepage string is still in English.
```

In `site/README.md`: title becomes `# Site`; the intro says the folder builds the homepage at `/` and `/<language>/` and the guides at `/guides/`, `/de/guides/`, `/sv/guides/`; replace the `./publish.sh ../../landing-github-pages` line with `make deploy` (from the repo root); add a "Homepage" section listing `src/home.njk`, `_includes/home/`, `assets/home.css`, `_includes/js/home.cjs`, the `tr` filter and the allowlist in `test/untranslated-allow.js`; replace every remaining `guides/` path that means the folder with `site/`.

- [ ] **Step 5: Verify and commit**

Run: `make test`
Expected: everything passes except the translation gate from Task 8.

Run: `git grep -n "guides/publish\|vue\|yarn" -- . ':!docs' ':!translate'`
Expected: no hits.

```bash
git add -A && git commit -m "feat: publish the whole site with make deploy, remove the Vue app"
```

---

### Task 10: Verification and draft PR

- [ ] **Step 1: Screenshots** as in Task 5 Step 3, for `/`, `/de/` and `/ja/` at 1280 and 390 px, against `https://blokada.org/`, `/?lang=de` and `/?lang=ja`. Fix any difference that is not one of the intended ones.

- [ ] **Step 2: Lighthouse**

```bash
cd site && npx @11ty/eleventy --quiet && (cd dist && python3 -m http.server 8792 >/dev/null 2>&1 &)
npx -y lighthouse@12 http://localhost:8792/ --quiet --chrome-flags="--headless=new" --only-categories=performance,seo,accessibility,best-practices --output=json --output-path=/tmp/lh.json
node -e "const r=require('/tmp/lh.json');for(const[k,v]of Object.entries(r.categories))console.log(k,Math.round(v.score*100))"
pkill -f "http.server 8792"
```

Expected: SEO 100, accessibility 90 or more. Performance 90 or more is expected on the published site; the local server does not compress. Fix failing accessibility audits (contrast, names, list markup) where the fix does not change the look; list the ones that would.

- [ ] **Step 3: Keyboard pass** on the preview: Tab through header, menu, dropdowns, tabs, language dialog and prompt. Every control reachable and operable.

- [ ] **Step 4: Draft PR**

```bash
git push -u origin feat/homepage-eleventy
gh pr create --draft --base main --title "feat: homepage as static pages, one URL per language" --body-file /tmp/pr-body.md
```

The body states what changed, the checks run with their numbers, that the translation test fails until Crowdin delivers, and the steps after merge (`make deploy`, resubmit the sitemap).

- [ ] **Step 5: When translations arrive** (not part of the first pass): merge the Crowdin PR in the translate repo, run `./sync-translations.sh`, remove the four hand-added strings' duplicates if the sync did not overwrite `en.json`, run `make test` until green, mark the PR ready.
