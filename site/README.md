# Site

The homepage at `blokada.org/` and `/<language>/`, and the setup guides at
`/guides/`, `/de/guides/` and `/sv/guides/`. Everything is plain HTML, built
with [Eleventy](https://www.11ty.dev/), so search engines can read it without
running JavaScript.

    npm install
    npm run serve   # http://localhost:8090/
    npm test
    make deploy     # from the repo root

## Homepage

- One template, `src/home.njk`, renders a page per language in
  `site.homeLangs` (`src/_data/site.js`). English is `/`, the others are
  `/<code>/` in lowercase.
- The sections are in `src/_includes/home/`, the document head in
  `src/_includes/layouts/home.njk`.
- Text comes from `src/locales/<code>.json`, written by
  `../sync-translations.sh` from the translate repo. In templates,
  `{{ 'key' | tr }}` prints the string in the page's language and falls back
  to English. Add `| safe` only for strings that contain HTML.
- `npm test` fails while a string the homepage uses is identical to English
  in any language. Words a language borrows unchanged ("FAQ", "Newsletter")
  are listed in `test/untranslated-allow.js`.
- `src/assets/home.css` is the old homepage's stylesheet stripped to the
  rules this markup uses, plus a few additions at the end. It expects no
  whitespace between tags, which a transform in `eleventy.config.js` removes.
- `src/_includes/js/home.cjs` is inlined: mobile menu, download tabs,
  language picker, the "read this page in your language" prompt and the old
  `/?lang=xx` links. The page works without it.
- `src/static/` is copied to the site root as it is. `service-worker.js`
  there unregisters the service worker the old homepage installed and has to
  stay published.

## Writing a guide

- One Markdown file per language: `src/en/<slug>.md`, `src/de/<slug>.md`,
  `src/sv/<slug>.md`. The file name is the URL and ties translations together
  for `hreflang`. A language without the file is left out of the alternates.
- Front matter: `title`, `description` (about 160 characters, it is the search
  snippet), `updated`, `order` (position on the index).
- `{% dot %}` and `{% doh %}` print the DNS over TLS and DNS over HTTPS
  addresses, `{% appleProfile %}label{% endappleProfile %}` the profile button.
  They show placeholders, filled in with the reader's own addresses when the
  page is opened from the dashboard (`#tag=<device tag>&name=<name>`, see
  `src/_includes/js/personalise.cjs`).
- Interface strings around the guides are in `src/_data/t.js`.

Every guide ends with the Blokada Cloud call to action (links carry
`src=guides` for attribution) and forum comments embedded from
community.blokada.org.

## Translations (Crowdin)

English is written here, in `src/en/`. German and Swedish come from Crowdin
through the translate repo (the `translate` submodule of this repo):

1. After changing English guides: `./scripts/crowdin.sh export`, then open a
   translate PR with `guides/` only. Crowdin's GitHub integration reads the
   sources from `master`. Leave `build/guides/` alone: Crowdin writes it and
   never reads it.
2. Crowdin keeps the approved translation of every paragraph that didn't
   change, pre-translates the rest, and opens a "New Crowdin updates" PR with
   `build/guides/de_DE` and `sv_SE`.
3. Update the submodule, run `./scripts/crowdin.sh import`, then `npm test`.
   Read the German and Swedish diff before publishing.

`npm test` checks that every translation keeps the English page's
shortcodes, `data-dns` spans, HTML blocks, classes, guide links and headings,
and the same `updated` and `order`. It does not check wording.

### Fixing a translation

Crowdin exports its own pre-translation for any string without an approved
translation, so a fix made only here or in `build/guides/` is overwritten by
the next export. Fix it in Crowdin's editor, or upload the files from the
translate repo:

    cp src/de/*.md ../translate/build/guides/de_DE/    # same for sv, sv_SE
    cd ../translate
    crowdin upload translations --config crowdin-guides.yml -b master \
      -i <project id> -T <token> -l de --auto-approve-imported
    git checkout -- build/guides

- One language per run: `-l de`, then `-l sv-SE`. A second `-l` replaces the
  first, and without `-l` every language's untranslated copy is uploaded as
  an approved translation.
- The guides are stored as one string per paragraph, list item or heading
  (`content_segmentation: 0` in the translate repo's `crowdin.yml`). An upload
  matches block by block, so keep the same blocks as the English.
- A line that stays the same as the English (a date, a host name, a config
  block) is skipped by the upload. Approve it in the editor.
- Afterwards, check in Crowdin that every string of the file is approved.
  The next "New Crowdin updates" PR should then leave the file unchanged.

## Forum comments

Discourse creates one topic per guide URL (so each language has its own) the
first time the page is viewed, from the page's own text. The comment box is an
iframe the forum renders and styles: the guides tag it with
`blokada-guides theme-light|theme-dark`, and `discourse-embedded.css` is the
matching stylesheet. Paste it into the forum theme under Admin → Appearance →
Themes → (active theme) → Edit CSS/HTML → Common → Embedded CSS whenever it
changes; it only applies to frames with that class.
