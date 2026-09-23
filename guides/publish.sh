#!/bin/sh
#
# Builds the guides and copies them into a landing-github-pages checkout, next
# to the homepage build. Touches only the paths the guides own, so it never
# disturbs the homepage, blocklists or app assets published from elsewhere.
#
# Usage: ./publish.sh ../../landing-github-pages

set -e

target="$1"
if [ -z "$target" ] || [ ! -f "$target/CNAME" ]; then
  echo "usage: $0 <path to landing-github-pages checkout>" >&2
  exit 1
fi

cd "$(dirname "$0")"
rm -rf dist
npm ci --silent
npm test
npx @11ty/eleventy --quiet

for dir in guides de/guides sv/guides; do
  mkdir -p "$target/$dir"
  rsync -a --delete "dist/$dir/" "$target/$dir/"
done
cp dist/sitemap.xml dist/robots.txt "$target/"

tag=$(git describe --abbrev=4 --always --dirty)
echo "Copied guides ($tag) into $target."
echo "Commit there with: git add guides de/guides sv/guides sitemap.xml robots.txt && git commit -m \"publish guides: $tag\""
