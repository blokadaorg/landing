# Homepage on Eleventy, one URL per language

Date: 2026-10-07. Status: awaiting review.

## Goal

The homepage becomes a static page built by the Eleventy project that already
builds the guides. Each language gets its own URL that search engines can
index. Head tags, headings and structured data are correct. The page looks the
same as today.

Success means:

- Lighthouse mobile on the published homepage: performance and SEO at 90 or
  above (today 72 and 92).
- Every translated homepage is reachable at its own URL, with a
  self-referencing canonical and reciprocal hreflang.
- Nothing is lost for current visitors: download links, `?lang=` links and
  anchors such as `#download` keep working.

## Decisions

Agreed with kar on 2026-10-07:

- Same design and copy, new engine. Only the title, main heading, heading
  levels and structured data change.
- One Eleventy site for homepage and guides. The Vue app is deleted.
- 19 languages: English plus the 18 in today's picker (bg, cs, de, es, fi, fr,
  hu, id, it, ja, nl, pl, pt-BR, ro, ru, sv, tr, zh-Hant). Arabic, Portuguese
  (Portugal) and Hindi stay out.
- No automatic language switch. A visitor whose browser language differs from
  the page, and is one we have, sees a one-line dismissible prompt.
- English title: "Blokada: ad blocker, parental control and VPN for Android
  and iOS". Main heading: "Ad blocker and privacy apps" with "for Android and
  iOS" as the lighter second line. "Open source" stays in the hero paragraph.
- The PR is not merged until Crowdin has translated the new strings for all 18
  languages.
- `make deploy` publishes.
- Translations keep coming from Crowdin through the translate repo. Hosting
  stays on GitHub Pages through `landing-github-pages`.

## Out of scope

Pricing, per-product, on-site FAQ and legal pages. Trust content, new
testimonials, a larger share image. Removing old bundles and PNGs from
`landing-github-pages` (follow-up after launch).

## Project layout

`guides/` is renamed to `site/`. Guide sources, URLs and tests do not change.

```
site/
  eleventy.config.js
  publish.sh
  src/
    _data/
      site.js            origin, languages, app and store data
      t.js               guide interface strings (unchanged)
      home.js            loads src/locales/*.json, fallback to English
    _includes/
      layouts/base.njk   guides layout (unchanged, gains JSON-LD)
      layouts/home.njk   homepage shell: head, header, footer, script
      home/*.njk         one partial per section
      icons/*.svg        the icons the homepage uses
      js/home.js         inlined
    home.njk             paginates over the 19 languages
    assets/home.css      passthrough to /assets/home.css
    static/              404.html, service-worker.js, favicon.png,
                         apple-touch-icon.png, img/
    en/ de/ sv/          guides (unchanged)
    sitemap.njk robots.njk
  src/locales/           written by sync-translations.sh
  test/
Makefile
```

Deleted: `src/` (Vue app), `public/`, `package.json`, `yarn.lock`,
`vue.config.js`, `babel.config.js`, `.postcssrc.js`, `.eslintrc.js`,
`.browserslistrc`, `.env`, `release.sh`. Images, favicon, `404.html` and
`service-worker.js` move from `public/` to `site/src/static/`.

## URLs

| Language | URL |
|---|---|
| English | `/` |
| others | `/<code>/`, lowercase: `/de/`, `/sv/`, `/pt-br/`, `/zh-hant/` |

Each page has:

- `<html lang>` with the proper tag (`pt-BR`, `zh-Hant`).
- a self-referencing absolute canonical.
- hreflang links to all 19 pages and `x-default` pointing at `/`.
- its own title and description. The description is the first sentence of the
  existing `homepage hero desc`.
- Open Graph and Twitter tags with absolute URLs, `og:locale` per language.

`/index.html` gets the canonical `/` like any other page.

Old links:

- `/?lang=xx` is handled by the inline script on `/`: a known code replaces
  the location with that language's URL, keeping the hash. An unknown code is
  ignored. Codes are matched case-insensitively.
- `/es/`, `/fr/`, `/it/`, `/nl/` are 2020 redirect stubs in
  `landing-github-pages`. The build overwrites them with real pages.
- Section ids are unchanged: `family`, `cloud`, `about`, `vpn`, `download`,
  `community`, `opinions`, `faq`, `donate`, `crypto`, `developer`.

## Translations

`sync-translations.sh` changes its target to `-t ../../site`, so
`translate.py` writes `site/src/locales/<lang>.json` in the same format as
today. `translate.py` itself is not changed.

`home.js` loads those files and exposes a lookup per language. The `t` filter
returns the language's string, or the English one when the key is missing or
equal to an empty string. Strings containing HTML (`<br>`, links) are output
unescaped, as `v-html` does today; all others are escaped.

New source strings, added to the translate repo in
blokadaorg/translate#473:

- `homepage page title`
- `homepage hero heading`
- `homepage hero heading platforms`
- `homepage language prompt` ("Read this page in your language")

`homepage hero title` and `homepage hero opensource` are no longer used.

Text that stays untranslated, as today: product names in the menu and download
cards, the testimonials, the `404.html` page.

## Page structure

Sections in today's order. Heading levels are fixed:

- `h1`: hero heading (both lines, the second in a `<span>`).
- `h2`: each product block, "Download Blokada", "The Community", a visually
  hidden "Reviews" heading, "Frequently Asked Questions", "Support the
  project", the developer heading.
- `h3`: download card titles, "Join us and say hi!", FAQ questions, "Blokada
  is dependent on you".
- Feature bullets become a `<ul>`, not `h6`.
- Menu labels and the footer line are not headings.

Visual sizes stay as they are, through classes, whatever the tag.

Reviews: three fixed quotes per page, the first three of the current list. No
random pick.

Images: the four WebP illustrations with dimensions, alt text from the product
title and lazy loading, as now. The logo keeps its PNG.

Icons: about 20 inline SVGs from Font Awesome 5 Free and Nucleo, included
through a shortcode with `aria-hidden`. No icon fonts.

Fonts: Open Sans from Google Fonts with `display=swap` and preconnect, as now.

## Styling

`site/src/assets/home.css` is a plain file, produced once: take the two
stylesheets the current build ships, remove every rule the page does not use,
remove icon-font rules, and commit the result. Target 30 KB or less
uncompressed. No Sass and no CSS build step afterwards; later changes are
edits to that file.

The homepage and the guides keep separate stylesheets.

## JavaScript

One inline script, 5 KB or less with its comments, no dependencies:

- mobile menu open and close.
- the "About" and "More" dropdowns.
- download tabs. Without JavaScript all three panes are visible, stacked.
- language picker: a `<dialog>` listing the 19 languages as plain links.
  Following one stores the choice in `localStorage`.
- language prompt: shown when the browser language is one of the 19, differs
  from the page, and the visitor has neither dismissed the prompt nor picked a
  language. The prompt's text and link are in the HTML for every language,
  hidden; the script reveals the matching one.
- `?lang=` redirect on `/`.
- guides link: each page links to its own language's guides when they exist
  (`/de/guides/`, `/sv/guides/`), otherwise `/guides/`. This is build time,
  not script.

No analytics. `src=landing` stays on outgoing links.

## Structured data

Homepage, one JSON-LD block:

- `Organization`: name, url, logo, `sameAs` (forum, GitHub, Twitter, Facebook,
  Reddit).
- `WebSite`: name, url, `inLanguage`.
- `SoftwareApplication` for Blokada 6, Blokada Family and Blokada 5:
  name, `operatingSystem`, `applicationCategory`, store or download URL. No
  `aggregateRating`, no `offers`.

Guides: `Article` (headline, description, `dateModified`, `inLanguage`,
publisher) and `BreadcrumbList` (Home, Guides, the guide). The guides index
gets `BreadcrumbList` only.

No `FAQPage`.

## Sitemap and robots

`sitemap.njk` lists the 19 homepages with `xhtml:link` alternates and
`x-default`, then the guides as today. `robots.txt` is unchanged.

## Publishing

`site/publish.sh <pages checkout>`:

1. `npm ci`, `npm test`, build.
2. Refuse to continue if the pages checkout has uncommitted changes or is
   behind its remote.
3. Sync what the site owns into the checkout:
   - with `--delete`: `guides/`, `de/guides/`, `sv/guides/`, `assets/`.
   - without delete: `index.html` at the root, one `index.html` per language
     folder, `404.html`, `service-worker.js`, `favicon.png`,
     `apple-touch-icon.png`, `img/`, `sitemap.xml`, `robots.txt`.
   Language folders are never synced with `--delete`, because `de/` and `sv/`
   also hold the guides. Nothing else in the checkout is touched.
4. Write `version.txt`.

`Makefile` at the repo root:

- `make preview`: Eleventy dev server on `localhost:8090`.
- `make test`: the test suite.
- `make deploy`: runs `publish.sh` against `PAGES` (default
  `../landing-github-pages`), then commits there as `publish site: <version>`
  and pushes. It prints the staged file list before committing.

The self-unregistering `service-worker.js` stays published.

## Testing

`npm test` runs `node --test`. New tests work on the built output:

- all 19 homepages exist at the expected paths.
- each has exactly one `h1`, a title, a description and `<html lang>`.
- canonical is absolute and self-referencing.
- each page lists all 19 hreflang alternates and `x-default`, and the set is
  identical on every page.
- every `href="#..."` points at an id on the same page; every internal path
  points at a built file.
- the JSON-LD parses and has the expected types.
- translation completeness: for each non-English language, every string the
  homepage uses differs from English, except an allowlist of strings that are
  legitimately identical (product names, "FAQ", "Newsletter" and similar).
  This is the check that keeps the PR unmerged until Crowdin delivers.
- the sitemap lists every built page once.
- `home.css` is 30 KB or less; the inline script is 5 KB or less.

The existing guides tests stay as they are.

Manual, before the PR is marked ready:

- screenshots of the new English page against the live one at 390 px and
  1280 px wide, section by section.
- the same for German and Japanese.
- Lighthouse mobile on the local build.
- keyboard: menu, dropdowns, tabs, language dialog, prompt.

## Rollout

1. Merge blokadaorg/translate#473 so Crowdin picks up the new strings.
2. Build on `feat/homepage-eleventy`. Local preview with `make preview`.
3. Open the PR as a draft. The completeness test fails until translations
   arrive.
4. When Crowdin has delivered: sync, tests green, mark ready, merge.
5. `make deploy`. Check the live site, then resubmit the sitemap in Search
   Console.
6. Follow-up: remove old bundles, PNG illustrations and QR codes from
   `landing-github-pages`.

## Risks

- **Visual drift.** Stripping CSS by usage can drop rules for states that are
  not in the static HTML (open menu, active tab, open dialog). The stripping
  step keeps the classes the script toggles, and the manual check covers those
  states.
- **Pages checkout layout.** The sync list must match what the site owns.
  The publish script only ever writes the paths listed above.
- **Crowdin timing.** Launch waits on 18 languages for four strings.
