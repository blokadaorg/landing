#!/bin/sh

echo "Syncing strings"

cd translate/scripts
git checkout master
git pull
hash=$(git rev-parse --short HEAD)
commit="translate: sync strings to: $hash"

echo $commit

# translate.py writes to <target>/src/locales.
./translate.py -a landing -t ../../site

cd ../../

git commit -am "$commit"

echo "Done"
