export default {
  lang: 'en',
  layout: 'layouts/guide.njk',
  permalink: data => `/guides/${data.page.fileSlug}/`,
  eleventyComputed: {
    key: data => data.key || data.page.fileSlug,
  },
};
