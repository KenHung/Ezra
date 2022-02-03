#!/bin/bash
# create zip package for publishing in Chrome web store
# to test locally, unzip bin/dist.zip and load bin/dist/
rm -r dist
mkdir -p dist/tmp
npx browserify content.js --debug > dist/tmp/content.js
zip -j dist/ext.zip \
    manifest.json \
    *.html \
    background.js \
    options.js \
    dist/tmp/*.js \
    ../dist/ezra-style.css \
    images/icon.png
zip -r dist/ext.zip _locales
unzip dist/ext.zip -d dist/unpacked/