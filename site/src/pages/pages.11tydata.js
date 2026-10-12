// English-only pages outside the guides: download, legal, products. They use
// the guides' look without the device details, comments and guides crumb.
export default {
  lang: 'en',
  layout: 'layouts/page.njk',
  standalone: true,
  permalink: data => `/${data.page.fileSlug}/`,
  eleventyComputed: {
    key: data => data.key || `page-${data.page.fileSlug}`,
  },
};
