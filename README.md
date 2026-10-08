# blokada.org

The homepage and the setup guides, as one static site built with Eleventy.
Sources are in `site/`. The published build is in landing-github-pages.

    make preview   # http://localhost:8090/
    make test
    make deploy    # builds, tests, copies into ../landing-github-pages, commits and pushes there

Translations come from the translate repo (the `translate` submodule):
`./sync-translations.sh` updates the homepage strings in `site/src/locales`.
`make deploy` refuses to publish while a homepage string is still in English.
