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

echo "$hash" > landing-github-pages/version.txt

echo $commit
cd landing-github-pages
git add .
git commit -am "$commit"
git tag "$hash"
git push
git push --tags

cd ..
git commit -am "$commit"
git tag "$hash"
git push
git push --tags


echo "Done"
