PAGES ?= ../landing-github-pages

.PHONY: preview test deploy

preview:
	cd site && npm install --silent && npx @11ty/eleventy --serve --port 8090

test:
	cd site && npm ci --silent && npm test

# Publishes what is committed on main. FORCE=1 publishes another branch or
# uncommitted work.
deploy:
	@if [ -z "$(FORCE)" ] && { [ "$$(git symbolic-ref --short HEAD)" != main ] || [ -n "$$(git status --porcelain)" ]; }; then \
		echo "Deploy from a clean main, or run: make deploy FORCE=1" >&2; exit 1; fi
	./site/publish.sh $(PAGES)
	cd $(PAGES) && git add -A && git status --short && \
		{ git diff --cached --quiet && echo "Nothing to publish." || \
		{ git commit -m "publish site: $$(cat version.txt)" && git push; }; }
