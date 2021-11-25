FROM --platform=linux/amd64 node:17-alpine
MAINTAINER Vaclav Barta "vaclav@equilibrium.co"
# hook example uses standard include (although it probably shouldn't)
RUN apk --no-cache add --update musl-dev
ADD clangd /usr/bin
ADD jsonrpc-ws-proxy /jsonrpc-ws-proxy
WORKDIR /jsonrpc-ws-proxy
RUN npm install && npm run prepare
ADD c2wasm-api /c2wasm-api
ADD wasi-sdk /c2wasm-api/clang/wasi-sdk
WORKDIR /c2wasm-api
RUN npm install && npm run build
WORKDIR /
ADD run.sh .
CMD /run.sh
