#!/bin/bash

echo running copyheaders.sh...
set -e

if [ -d /work/c ]
then
    rm /work/c/*.h
else
    mkdir -p /work/c
fi
cp clang/includes/*.h /work/c

if [ -d /app/clang/includes ]
then
    rm /app/clang/includes/*.h
else
    mkdir -p /app/clang/includes
fi
cp clang/includes/*.h /app/clang/includes
