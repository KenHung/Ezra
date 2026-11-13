#!/bin/bash
if [ -z "$WIDGET_VERSION" ]; then
  echo "Set WIDGET_VERSION to the widget release tag (for example, 3.5)." >&2
  exit 1
fi

ver=$WIDGET_VERSION
int=$(openssl dgst -sha384 -binary dist/ezra.js | openssl base64 -A)

cat > docs/_data/ezra.yml << EOL
main:
  version: ${ver}
  integrity: ${int}
EOL