#!/bin/bash
# create zip package for publishing in Chrome web store
# to test locally, unzip bin/dest.zip and load bin/dest/
rm -r bin
mkdir bin
zip bin/dest.zip \
    manifest.json \
    *.js \
    ../src/*.js \
    ../src/lang/*.js \
    ../ezra-style.css \
    images/icon.png