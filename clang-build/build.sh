#!/bin/bash

echo running build.sh...
set -e

cd /mnt/wasi-sdk
ln -s /mnt/llvm-project src/llvm-project
make
