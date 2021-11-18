#!/bin/bash

echo running build.sh...

# instructions from https://github.com/llvm/llvm-project/tree/main/clang-tools-extra/clangd#building-and-testing-clangd
export LLVM_ROOT=`realpath ./llvm-project`
echo LLVM_ROOT=$LLVM_ROOT
cd $LLVM_ROOT
if [ -d build ]; then
    cd build
else
    mkdir build
    cd build
    cmake $LLVM_ROOT/llvm/ -DCMAKE_BUILD_TYPE=Release -DLLVM_ENABLE_PROJECTS="clang;clang-tools-extra" -G Ninja
fi

cmake --build $LLVM_ROOT/build --target clangd
