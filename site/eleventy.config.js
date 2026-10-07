import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import site from './src/_data/site.js';
import { loadStrings, translate } from './lib/homeStrings.js';

const LANGS = ['en', 'de', 'sv'];

const here = path.dirname(fileURLToPath(import.meta.url));
const homeStrings = loadStrings(path.join(here, 'src/locales'), site.homeLangs.map(l => l.code));

// Heading ids that read well in any of the languages: "FRITZ!Box" is
// "fritz-box", "Was dein Router können muss" is "was-dein-router-konnen-muss".
function slug(text) {
  return text
    .replace(/&[a-z]+;|&#\d+;/g, ' ')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets/guides.css': 'guides/assets/guides.css' });
  // Files served from the site root as they are: 404 page, icons, images and
  // the service worker that unregisters the old homepage's one.
  eleventyConfig.addPassthroughCopy({ 'src/static': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/home.css': 'assets/home.css' });
  eleventyConfig.ignores.add('src/locales/**');

  // The homepage's strings come from the translate repo, keyed like the
  // Vue app's. `hl` is the language of the page being rendered.
  eleventyConfig.addFilter('tr', function (key, code) {
    return translate(homeStrings, code || this.ctx.hl.code, key);
  });
  // The hero paragraph's first sentence is the search description.
  eleventyConfig.addFilter('firstSentence', text => {
    const end = text.search(/[.!?](?=\s)|。|\.$/);
    return end === -1 ? text : text.slice(0, end + 1);
  });

  // Inlined into every guide: one small script, no extra request, and nothing
  // for a crawler to wait on.
  eleventyConfig.addGlobalData(
    'personaliseScript',
    fs.readFileSync(new URL('./src/_includes/js/personalise.cjs', import.meta.url), 'utf8'),
  );
  eleventyConfig.addGlobalData(
    'uiScript',
    fs.readFileSync(new URL('./src/_includes/js/ui.js', import.meta.url), 'utf8'),
  );

  // For notices that end on a date, such as the Mullvad shutdown.
  eleventyConfig.addGlobalData('buildDate', new Date().toISOString().slice(0, 10));

  eleventyConfig.addCollection('guides', api =>
    api.getFilteredByGlob('src/*/*.md').sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99)),
  );

  // Every language version of the page with this key, for hreflang and the
  // language switcher. A language without a translation is simply not listed,
  // so an alternate never points at a missing page.
  eleventyConfig.addFilter('alternates', (all, key) =>
    all
      .filter(p => p.data.key === key && LANGS.includes(p.data.lang))
      .sort((a, b) => LANGS.indexOf(a.data.lang) - LANGS.indexOf(b.data.lang))
      .map(p => ({ lang: p.data.lang, url: p.url })),
  );

  // Splits a rendered guide at its h2 headings: each heading gets an id, each
  // part becomes a <section>, and the headings make the "On this page" list.
  eleventyConfig.addFilter('outline', html => {
    const used = new Set();
    const toc = [];
    const withIds = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
      const text = inner.replace(/<[^>]+>/g, '').trim();
      const base = slug(text) || 'section';
      let id = base;
      for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`;
      used.add(id);
      toc.push({ id, text });
      return `<h2 id="${id}">${inner}</h2>`;
    });
    const [intro, ...parts] = withIds.split(/(?=<h2 id=")/);
    const head = intro.trim() ? `<div class="guide-intro">${intro}</div>` : '';
    return {
      html: head + parts.map(part => `<section class="guide-section">${part}</section>`).join(''),
      toc,
    };
  });

  // A copy box followed by punctuation ("enter only <box>.") keeps the two
  // together, so a narrow screen never starts a line with a lone full stop.
  eleventyConfig.addTransform('copyPunctuation', function (html) {
    if (!(this.page.outputPath || '').endsWith('.html')) return html;
    return html.replace(
      /(<span class="copy"><code[^>]*>[^<]*<\/code><\/span>)([.,;:!?)]+)/g,
      '<span class="copy-tail">$1<span>$2</span></span>',
    );
  });

  eleventyConfig.addFilter('byLang', (items, lang) => items.filter(p => p.data.lang === lang));
  eleventyConfig.addFilter('isoDate', date => new Date(date).toISOString().slice(0, 10));

  // Placeholders the personalise script replaces when the page was opened
  // with a device tag. Without one they read as instructions.
  const placeholder = ctx => ctx.t[ctx.lang].placeholder;
  // Wrapped in .copy so ui.js can give each a copy button.
  eleventyConfig.addShortcode('dot', function () {
    return `<span class="copy"><code data-dns="dot">${placeholder(this.ctx)}.cloud.blokada.org</code></span>`;
  });
  eleventyConfig.addShortcode('doh', function () {
    return `<span class="copy"><code data-dns="doh">https://cloud.blokada.org/${placeholder(this.ctx)}</code></span>`;
  });
  // This page's own link with the reader's device in it, to open in Safari.
  eleventyConfig.addShortcode('pageLink', function () {
    return `<span class="copy"><code data-dns="page">${this.ctx.site.origin}${this.page.url}</code></span>`;
  });
  eleventyConfig.addShortcode('ip', function (which) {
    const ip = this.ctx.site.dnsIps[which];
    if (!ip) throw new Error(`Unknown resolver IP: ${which}`);
    return `<span class="copy"><code>${ip}</code></span>`;
  });
  eleventyConfig.addShortcode('appleUrl', function () {
    return `<span class="copy"><code data-dns="apple">https://api.cloud.blokada.org/apple?device_tag=${placeholder(this.ctx)}</code></span>`;
  });
  eleventyConfig.addPairedShortcode('appleProfile', function (label) {
    return `<a class="btn" data-dns="apple" href="${this.ctx.site.dashboard}/setup?src=guides">${label.trim()}</a>`;
  });

  return {
    dir: { input: 'src', output: 'dist', includes: '_includes', data: '_data' },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['md', 'njk'],
  };
}
