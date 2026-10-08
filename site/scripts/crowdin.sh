#!/bin/sh
#
# Syncs the guides with Crowdin through the translate repo (the landing
# repo's `translate` submodule by default). English is written here in
# src/en/; Crowdin translates it from the translate repo and commits the
# results under build/guides/.
#
#   ./scripts/crowdin.sh export [translate dir]   English -> translate/guides/
#   ./scripts/crowdin.sh import [translate dir]   translations -> src/de, src/sv
#
# After export, open a translate PR with guides/ only; Crowdin reads sources
# from master and never reads build/guides/. After import, run `npm test`: it
# fails if a translation lost a shortcode, a device detail, a link or a
# heading. The README has the steps for fixing a translation in Crowdin.

set -e

cd "$(dirname "$0")/.."
translate=${2:-../translate}

if [ ! -f "$translate/crowdin.yml" ]; then
  echo "No translate repo at $translate" >&2
  exit 1
fi

case "$1" in
  export)
    mkdir -p "$translate/guides"
    cp src/en/*.md "$translate/guides/"
    echo "Copied $(ls src/en/*.md | wc -l | tr -d ' ') English guides to $translate/guides/"
    ;;
  import)
    node scripts/import-translations.js "$translate"
    ;;
  *)
    echo "usage: $0 export|import [translate dir]" >&2
    exit 1
    ;;
esac
