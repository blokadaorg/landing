import fs from 'node:fs';

const LANGS = ['en', 'de', 'sv'];

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'guides/assets' });

  // Inlined into every guide: one small script, no extra request, and nothing
  // for a crawler to wait on.
  eleventyConfig.addGlobalData(
    'personaliseScript',
    fs.readFileSync(new URL('./src/_includes/js/personalise.cjs', import.meta.url), 'utf8'),
  );

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

  eleventyConfig.addFilter('byLang', (items, lang) => items.filter(p => p.data.lang === lang));
  eleventyConfig.addFilter('isoDate', date => new Date(date).toISOString().slice(0, 10));

  // Placeholders the personalise script replaces when the page was opened
  // with a device tag. Without one they read as instructions.
  const placeholder = ctx => ctx.t[ctx.lang].placeholder;
  eleventyConfig.addShortcode('dot', function () {
    return `<code data-dns="dot">${placeholder(this.ctx)}.cloud.blokada.org</code>`;
  });
  eleventyConfig.addShortcode('doh', function () {
    return `<code data-dns="doh">https://cloud.blokada.org/${placeholder(this.ctx)}</code>`;
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
