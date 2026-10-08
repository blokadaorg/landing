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
  const crumbs = [crumb(1, 'Blokada', page.homeUrl), crumb(2, page.guidesTitle, page.guidesUrl)];
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
