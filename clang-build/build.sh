#!/bin/sh

echo running build.sh...
set -e

cd /mnt/wasi-sdk

if ! [ -L src/llvm-project ]; then
    ln -s /mnt/llvm-project src/llvm-project
fi

make
