FROM --platform=linux/amd64 node:17-alpine
MAINTAINER Vaclav Barta "vaclav@equilibrium.co"
ADD clangd /usr/bin
ADD jsonrpc-ws-proxy /jsonrpc-ws-proxy
WORKDIR /jsonrpc-ws-proxy
RUN npm install && npm run prepare
ADD c2wasm-api /c2wasm-api
ADD wasi-sdk /c2wasm-api/clang/wasi-sdk
ADD compile_flags.txt /etc/clangd/compile_flags.txt
ADD .clang-tidy /tmp
RUN cp -al /c2wasm-api/clang/includes /tmp/c && cp -al /c2wasm-api/clang/wasi-sdk/share/wasi-sysroot/include /usr && mkdir -p /usr/include/clang/14.0.0 && cp -al /c2wasm-api/clang/wasi-sdk/lib/clang/14.0.0/include /usr/include/clang/14.0.0/include
WORKDIR /c2wasm-api
RUN npm install && npm run build
WORKDIR /
ADD run.sh .
CMD /run.sh
