#!/bin/sh

echo "Publishing to live (will push)"

hash=$(git rev-parse --short HEAD)
commit="publish landing: $hash"

cd landing-github-pages
git checkout master
git pull
cd ..

yarn build
cp -r dist/* landing-github-pages/

echo $commit
cd landing-github-pages
git commit -am "$commit"
git push

cd ..
git commit -am "$commit"
git push

echo "Done"
