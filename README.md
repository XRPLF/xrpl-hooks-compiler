# XRPL Hooks compiler

This repository contains build scripts for the docker image with clang
& clangd, plus git submodules of the projects actually going into the
image.

## Getting Started

Running `make` in this directory after checkout should produce the
image, but

1. It must be run as root (or at least an account privileged enough to
   build & run docker containers), and

2. checking out the submodules as root writes files into the .git
   directory that non-priviledged users cannot update,

so it's recommended to split the build into 2 steps:

```bash
$ make checkout

# make build
```

Note that unless you have a credential manager set up for your github
account, running the `checkout` target will ask for your credentials,
once for every private submodule.

The final container is called `xrpl-hooks-compiler` and can be run by
the `run` target of Makefile in the docker directory.

## Shortcuts

Building LLVM (twice - the current setup shares LLVM repo but not the
build directory between clang & clangd) takes hours, and might not
work on non-Linux computers (certainly it doesn't work on Mac), so the
LLVM binaries are maintained in releases of
[xrpl-hooks-compiler](https://github.com/eqlabs/xrpl-hooks-compiler/).
These binaries can be extracted from the file bin.zip in the top-level
directory, providing the results of running `make` in clang-build and
clangd-build directories, so that running the top-level make `build`
target can be replaced by running just the (default) make `build`
target in the docker directory. This also allows skipping the checkout
of the `llvm-project` and `wasi-sdk` submodules; the other submodules
are still needed, so running the `checkout` target should be replaced
by running

```bash
git submodule update --init c2wasm-api jsonrpc-ws-proxy
```

in the top-level directory.

## Developing c2wasm-api without building

Make sure you have Docker installed. Clone this project. Download latest `bin.zip` file from the releases of this GitHub repository and put it project root, make sure it is named `bin.zip`

- Run `make bin.zip` on the project root
- CD to docker folder `cd docker`
- Run `docker-compose build`
- Run `docker-compose up` or `docker-compose up -d`
- This should start server at port `:9000`, the actual compiling endpoint is this: [http://localhost:9000/api/build](localhost:9000/api/build). Note that it takes a while to start.

Endpoint only accepts `HTTP POST`.

You can send for example following payload to endpoint:

```json
{
  "output": "wasm",
  "compress": true,
  "files": [
    {
      "type": "c",
      "name": "file.c",
      "options": "-g -O3",
      "src": "#include <stdio.h>\n\nint main()\n{\n\n   printf(\"Hello World\");\n   return 0;\n}"
    }
  ]
}
```

Payload itself is quite self-explanatory, but the code you want to compile is under files arrays src property, you can also add some options for the compiler itself. When you POST this payload to the endpoint you should get back following response:

```json
{
  "success": true,
  "message": "Success",
  "output": "eJzUXQecVcXVv21uee/t7iv7...",
  "tasks": [
    {
      "name": "building file.c",
      "file": "file.c",
      "console": "",
      "success": true,
      "output": "eJx1UU2LE..."
    },
    {
      "name": "linking wasm",
      "console": "",
      "success": true
    }
  ]
}
```
