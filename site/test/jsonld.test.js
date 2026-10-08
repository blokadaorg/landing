import test from 'node:test';
import assert from 'node:assert/strict';
import site from '../src/_data/site.js';
import { homeJsonLd, guideJsonLd, serialise } from '../lib/jsonld.js';

const types = data => data['@graph'].map(node => node['@type']);

test('homepage: organisation, website and the three apps, no ratings or offers', () => {
  const data = homeJsonLd(site, { tag: 'de', path: '/de/' }, 'Beschreibung');
  assert.deepEqual(types(data), ['Organization', 'WebSite', 'SoftwareApplication', 'SoftwareApplication', 'SoftwareApplication']);
  assert.equal(data['@graph'][1].inLanguage, 'de');
  assert.equal(data['@graph'][1].url, 'https://blokada.org/de/');
  assert.ok(!JSON.stringify(data).includes('aggregateRating'));
  assert.ok(!JSON.stringify(data).includes('offers'));
});

test('guide: breadcrumbs and article; index: breadcrumbs only', () => {
  const guide = guideJsonLd(site, { url: '/de/guides/router-ad-blocking/', lang: 'de', title: 'Titel', description: 'Text', updated: '2026-10-02', isIndex: false, homeUrl: '/de/', guidesUrl: '/de/guides/', guidesTitle: 'Anleitungen' });
  assert.deepEqual(types(guide), ['BreadcrumbList', 'Article']);
  assert.equal(guide['@graph'][0].itemListElement.length, 3);
  assert.equal(guide['@graph'][0].itemListElement[0].item, 'https://blokada.org/de/');
  assert.equal(guide['@graph'][1].dateModified, '2026-10-02');
  const index = guideJsonLd(site, { url: '/guides/', lang: 'en', title: 'Guides', description: 'Text', isIndex: true, homeUrl: '/', guidesUrl: '/guides/', guidesTitle: 'Guides' });
  assert.deepEqual(types(index), ['BreadcrumbList']);
  assert.equal(index['@graph'][0].itemListElement.length, 2);
});

test('serialise cannot close the script tag', () => {
  const out = serialise({ name: 'a </script><b>"quoted" & l\'apostrophe' });
  assert.ok(!out.includes('</script>'));
  assert.deepEqual(JSON.parse(out), { name: 'a </script><b>"quoted" & l\'apostrophe' });
});
