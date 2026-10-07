// Copies Crowdin's German and Swedish guides from the translate repo into
// src/de and src/sv. Only languages the guides are published in; Crowdin's
// other languages are left where they are.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LANGS = { de: 'de_DE', sv: 'sv_SE' };
const guides = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const translate = path.resolve(process.argv[2] || path.join(guides, '..', 'translate'));

// Front matter that isn't text: take it from English, whatever came back.
const FIXED_KEYS = ['updated', 'order'];

function frontMatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error('no front matter');
  return match;
}

function withFixedKeys(translated, english) {
  const [, enBlock] = frontMatter(english);
  const [whole, block] = frontMatter(translated);
  let fixed = block;
  for (const key of FIXED_KEYS) {
    const line = enBlock.split('\n').find(l => l.startsWith(`${key}:`));
    if (!line) continue;
    const re = new RegExp(`^${key}:.*$`, 'm');
    fixed = re.test(fixed) ? fixed.replace(re, line) : `${fixed}\n${line}`;
  }
  return translated.replace(whole, `---\n${fixed}\n---\n`);
}

let copied = 0;
for (const [lang, locale] of Object.entries(LANGS)) {
  const from = path.join(translate, 'build', 'guides', locale);
  if (!fs.existsSync(from)) {
    console.log(`${lang}: nothing in ${from}`);
    continue;
  }
  for (const name of fs.readdirSync(path.join(guides, 'src', 'en')).filter(n => n.endsWith('.md'))) {
    const source = path.join(from, name);
    if (!fs.existsSync(source)) continue;
    const english = fs.readFileSync(path.join(guides, 'src', 'en', name), 'utf8');
    const translated = fs.readFileSync(source, 'utf8');
    // Crowdin exports untranslated files as copies of the English.
    if (translated.trim() === english.trim()) {
      console.log(`${lang}/${name}: not translated yet, skipped`);
      continue;
    }
    fs.writeFileSync(path.join(guides, 'src', lang, name), withFixedKeys(translated, english));
    copied += 1;
  }
}
console.log(`Imported ${copied} translated guides. Run npm test to check them.`);
