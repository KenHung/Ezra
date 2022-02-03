#!/bin/bash
ver=$(git describe --abbrev=0)
int=$(openssl dgst -sha384 -binary dist/ezra.js | openssl base64 -A)

cat > docs/_config.yml << EOL
name: Ezra's Project Site
path: https://kenhung.github.io/Ezra
ezra:
  version: ${ver}
  integrity: ${int}
EOL