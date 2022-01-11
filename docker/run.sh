#!/bin/sh

echo running run.sh...
set -e

if [ `id -u` -eq 0 ]; then
    /sbin/su-exec appuser "$@"
else
    "$@"
fi
