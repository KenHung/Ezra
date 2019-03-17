#!/bin/bash
# create zip package for publishing in Chrome web store
# to test locally, unzip bin/dist.zip and load bin/dist/
rm -r dist
mkdir dist
zip -j dist/ext.zip \
    manifest.json \
    *.js \
    ../src/*.js \
    ../src/lang/*.js \
    ../ezra-style.css \
    images/icon.png