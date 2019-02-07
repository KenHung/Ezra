#!/bin/bash
rm -r bin
mkdir bin
cp ../ezra-style.css src
cp -R ../src src
zip bin/ext.zip manifest.json *.js ../src/*.js ../src/lang/zh-Hant.js ../ezra-style.css images/icon.png