# Guides

Static setup guides served at `blokada.org/guides/`, `/de/guides/` and
`/sv/guides/`. They are plain HTML, built with [Eleventy](https://www.11ty.dev/),
so search engines can read them without running JavaScript. The homepage (the
Vue app in `../src`) is not involved.

    npm install
    npm run serve   # http://localhost:8090/guides/
    npm test        # the device-tag script
    ./publish.sh ../../landing-github-pages

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

1. After changing English guides: `./scripts/crowdin.sh export`, then commit
   and push `guides/` in the translate repo. Crowdin's GitHub integration
   picks it up.
2. When Crowdin has translated (it commits to `build/guides/de_DE` and
   `sv_SE` in the translate repo): update the submodule, run
   `./scripts/crowdin.sh import`, then `npm test`.

`npm test` checks that every translation keeps the English page's
shortcodes, `data-dns` spans, HTML blocks, classes and guide links, and the
same `updated` and `order`. Fix a failing file by hand, or in Crowdin.

## Forum comments

Discourse creates one topic per guide URL (so each language has its own) the
first time the page is viewed, from the page's own text. The comment box is an
iframe the forum renders and styles: the guides tag it with
`blokada-guides theme-light|theme-dark`, and `discourse-embedded.css` is the
matching stylesheet. Paste it into the forum theme under Admin → Appearance →
Themes → (active theme) → Edit CSS/HTML → Common → Embedded CSS whenever it
changes; it only applies to frames with that class.
