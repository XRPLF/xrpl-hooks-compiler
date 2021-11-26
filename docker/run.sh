#!/bin/sh

echo running run.sh...
set -e

# what https://docs.docker.com/config/containers/multi-service_container/ calls "very naive"...
cd /jsonrpc-ws-proxy && node dist/server.js --port 3001 --languageServers servers.yml &

cd /c2wasm-api && node dist/index.js &

wait -n
exit $?
