#!/bin/sh
#
# Builds the site (homepage and guides) and copies it into a
# landing-github-pages checkout. Touches only the paths the site owns, so it
# never disturbs the blocklists, api or mirrors published from elsewhere.
#
# Usage: ./publish.sh ../../landing-github-pages   (or: make deploy)

set -e

if [ -z "$1" ] || [ ! -f "$1/CNAME" ]; then
  echo "usage: $0 <path to landing-github-pages checkout>" >&2
  exit 1
fi
# Absolute before the cd below, or a relative path would resolve elsewhere.
target=$(cd "$1" && pwd)

if [ -n "$(git -C "$target" status --porcelain)" ]; then
  echo "$target has uncommitted changes. Commit or discard them first." >&2
  exit 1
fi
git -C "$target" fetch --quiet
if [ -n "$(git -C "$target" rev-list 'HEAD..@{u}')" ]; then
  echo "$target is behind its remote. Pull first." >&2
  exit 1
fi

cd "$(dirname "$0")"
rm -rf dist
npm ci --silent
npm test
npx @11ty/eleventy --quiet

# Folders only the site writes: replaced whole, so removed pages disappear.
for dir in guides de/guides sv/guides assets; do
  mkdir -p "$target/$dir"
  rsync -a --delete "dist/$dir/" "$target/$dir/"
done
# Everything else is copied over what is there. Language folders also hold
# the guides, and img/ holds files other projects link to, so nothing here
# is ever deleted.
rsync -a --exclude=/guides --exclude=/de/guides --exclude=/sv/guides --exclude=/assets dist/ "$target/"

tag=$(git describe --abbrev=4 --always --dirty)
echo "$tag" > "$target/version.txt"
echo "Copied site ($tag) into $target."
