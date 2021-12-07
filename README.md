# XRPL Hooks compiler

This repository contains build scripts for the docker image with clang
& clangd, plus git submodules of the projects actually going into the
image.


## Getting Started

Running `make` in this directory after checkout should produce the
image, but

1) It must be run as root (or at least an account privileged enough to
build & run docker containers), and

2) checking out the submodules as root writes files into the .git
directory that non-priviledged users cannot update,

so it's recommended to split the build into 2 steps:

```bash
$ make checkout

# make build```

Note that unless you have a credential manager set up for your github
account, running the `checkout` target will ask for your credentials,
once for every private submodule. The final container is called
`xrpl-hooks-compiler`.


## Shortcuts

Building LLVM (twice - the current setup shares LLVM repo but not the
build directory between clang & clangd) takes hours, and might not
work on non-Linux computers (certainly it doesn't work on Mac), so
some binaries are maintained in releases of
[xrpl-hooks-compiler](https://github.com/eqlabs/xrpl-hooks-compiler/). These
binaries can be extracted from the file bin.zip in the top-level
directory, providing the results of running `make` in clang-build and
clangd-build directories, so that running the top-level make `build`
target can be replaced by running just the (default) make `build`
target in the docker directory. This also allows skipping the checkout
of the `llvm-project` and `wasi-sdk` submodules; the other submodules
are still needed, so running the `checkout` target should be replaced
by

```bash
git submodule update --init c2wasm-api jsonrpc-ws-proxy```

in the top-level directory.
