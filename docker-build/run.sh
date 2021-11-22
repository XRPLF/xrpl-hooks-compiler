#!/bin/bash

echo running run.sh...
set -e

cd /jsonrpc-ws-proxy && node dist/server.js --port 3001 --languageServers servers.yml &

cd /c2wasm-api && node dist/index.js
