#!/usr/bin/env sh
set -e

# Replace html base tag to fetch static resources from the
# correct path instead of root.
if [ -z "$BASE_HREF" ]
then
    echo "\$BASE_HREF is not set. Keep origin index.html file."
else
    sed --in-place 's~<base href="/">~<base href="'$BASE_HREF'">~' /usr/share/nginx/html/index.html
fi

cat /usr/share/nginx/html/index.html

TMPFILE=$(mktemp)
CONFIGFILE="/usr/share/nginx/html/assets/config.js"
envsubst < "$CONFIGFILE" > "$TMPFILE" && cat "$TMPFILE" > "$CONFIGFILE"

nginx -g 'daemon off;'
