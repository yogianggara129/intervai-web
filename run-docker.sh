#!/usr/bin/env bash
set -euo pipefail

set -a; source .env; set +a

IMAGE_NAME="intervai-web"
CONTAINER_NAME="intervai-web"

HOST_PORT="${PORT:-8043}"
docker rm -f "$CONTAINER_NAME" 2>/dev/null || true
docker build -t "$IMAGE_NAME" --build-arg VITE_BASE_URL="$VITE_BASE_URL" .
docker run -d --name "$CONTAINER_NAME" --rm -p "$HOST_PORT:8043" "$IMAGE_NAME"

echo "Running at http://localhost:$HOST_PORT (VITE_BASE_URL=$VITE_BASE_URL)"
