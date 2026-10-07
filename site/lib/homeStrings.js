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
