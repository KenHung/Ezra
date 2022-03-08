#!/bin/bash
ver=$(git describe --abbrev=0)
int=$(openssl dgst -sha384 -binary dist/ezra.js | openssl base64 -A)

cat > docs/_data/ezra.yml << EOL
main:
  version: ${ver}
  integrity: ${int}
EOL