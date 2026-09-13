#!/bin/sh
find /srv/http -type f -name "*.js" -exec sed -i "s|__VITE_BASE_URL__|${VITE_BASE_URL:-http://localhost:3000}|g" {} +
exec /gostatic -fallback index.html
