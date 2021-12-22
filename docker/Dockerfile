FROM --platform=linux/amd64 node:17-alpine
MAINTAINER Vaclav Barta "vaclav@equilibrium.co"

COPY clangd /usr/bin
WORKDIR /app
COPY c2wasm-api/clang/includes ./clang/includes
COPY c2wasm-api/package.json .
COPY c2wasm-api/yarn.lock .
COPY c2wasm-api/tsconfig.json .
COPY c2wasm-api/src ./src
COPY wasi-sdk ./clang/wasi-sdk
ADD compile_flags.txt /etc/clangd/compile_flags.txt
ADD .clang-tidy /work/.clang-tidy
RUN cp -alf ./clang/includes /work/c && cp -alf clang/wasi-sdk/share/wasi-sysroot/include /usr && mkdir -p /usr/include/clang/14.0.0 && cp -alf clang/wasi-sdk/lib/clang/14.0.0/include /usr
RUN yarn && yarn build
EXPOSE $PORT
CMD ["node", "dist/index.js"]

# COPY bin/clangd /usr/bin

# WORKDIR /app

# COPY c2wasm-api/clang/includes ./clang/includes
# COPY c2wasm-api/package.json .
# COPY c2wasm-api/yarn.lock .
# COPY c2wasm-api/tsconfig.json .
# COPY c2wasm-api/src ./src

# COPY bin/wasi-sdk ./clang/wasi-sdk
# ADD ./docker/compile_flags.txt /etc/clangd/compile_flags.txt
# WORKDIR /work/c
# ADD ./docker/.clang-tidy .
# WORKDIR /app
# RUN cp -alf ./clang/includes/. /work/c && cp -alf clang/wasi-sdk/share/wasi-sysroot/include /usr && mkdir -p /usr/include/clang/14.0.0 && cp -alf clang/wasi-sdk/lib/clang/14.0.0/include /usr
# RUN yarn && yarn build

# EXPOSE $PORT
# CMD ["node", "dist/index.js"]
