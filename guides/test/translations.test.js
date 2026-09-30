// Every translated guide must keep what the page is built from: the
// shortcodes that print the reader's details, the spans the personalise
// script fills, HTML blocks, classes and links to other guides. Translators
// (and Crowdin's AI) only change the words around them.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
const LANGS = ['de', 'sv'];

const PATTERNS = {
  shortcodes: /{%.*?%}/g,
  expressions: /{{.*?}}/g,
  details: /data-dns="[^"]*"/g,
  classes: /class="[^"]*"/g,
  htmlBlocks: /<\/?(?:div|pre|code|span|ol|p)\b/g,
  guideLinks: /\]\(\.\.\/[^)]*\)/g,
};

function signature(text) {
  const body = text.replace(/^---\n[\s\S]*?\n---\n/, '');
  const result = {};
  for (const [name, re] of Object.entries(PATTERNS)) {
    result[name] = (body.match(re) || []).sort();
  }
  return result;
}

function fixedKeys(text) {
  const block = text.match(/^---\n([\s\S]*?)\n---\n/)[1];
  return Object.fromEntries(
    block.split('\n').filter(l => /^(updated|order):/.test(l)).map(l => l.split(/:\s*/)),
  );
}

const english = fs.readdirSync(path.join(SRC, 'en')).filter(n => n.endsWith('.md'));

for (const lang of LANGS) {
  for (const name of english) {
    const file = path.join(SRC, lang, name);
    if (!fs.existsSync(file)) continue;
    test(`${lang}/${name} keeps the structure of the English`, () => {
      const en = fs.readFileSync(path.join(SRC, 'en', name), 'utf8');
      const tr = fs.readFileSync(file, 'utf8');
      assert.deepEqual(signature(tr), signature(en));
      assert.deepEqual(fixedKeys(tr), fixedKeys(en));
      const fm = tr.match(/^---\n([\s\S]*?)\n---\n/)[1];
      assert.match(fm, /^title: \S/m);
      assert.match(fm, /^description: \S/m);
    });
  }
}
