PAGES ?= ../landing-github-pages

.PHONY: preview test deploy

preview:
	cd site && npm install --silent && npx @11ty/eleventy --serve --port 8090

test:
	cd site && npm ci --silent && npm test

deploy:
	./site/publish.sh $(PAGES)
	cd $(PAGES) && git add -A && git status --short && \
		git commit -m "publish site: $$(cat version.txt)" && git push
