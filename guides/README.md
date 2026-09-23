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
