export default {
  lang: 'de',
  layout: 'layouts/guide.njk',
  permalink: data => `/de/guides/${data.page.fileSlug}/`,
  eleventyComputed: {
    key: data => data.key || data.page.fileSlug,
  },
};
