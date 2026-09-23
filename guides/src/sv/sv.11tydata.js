export default {
  lang: 'sv',
  layout: 'layouts/guide.njk',
  permalink: data => `/sv/guides/${data.page.fileSlug}/`,
  eleventyComputed: {
    key: data => data.key || data.page.fileSlug,
  },
};
