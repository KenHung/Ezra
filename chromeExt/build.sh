#!/bin/bash
# create zip package for publishing in Chrome web store
# to test locally, unzip bin/dist.zip and load bin/dist/
rm -r dist
mkdir -p dist/tmp
npx browserify contentScript.js > dist/tmp/contentScript.js
npx browserify background.js > dist/tmp/background.js
zip -j dist/ext.zip \
    manifest.json \
    *.html \
    options.js \
    dist/tmp/*.js \
    ../dist/ezra-style.css \
    images/icon.png
zip -r dist/ext.zip _locales
unzip dist/ext.zip -d dist/unpacked/