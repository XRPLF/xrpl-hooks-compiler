# C2WasmCli

## Install

`npm install c2wasm-cli`

## Add .env variables

Copy the `.env.sample` to `.env`.

Update the `API_HOST` variable

## Usage

`c2wasm-cli contracts build`

This will build the `contracts` directory and output the wasm files into the `build` directory.

## Development / Deployment

### Build Repo

`yarn run build`

### Build Executable Package

`pkg .`

### Publish NPM Package

`npm publish`