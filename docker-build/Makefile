# must be run as root

build: wasi-sdk c2wasm-api clangd jsonrpc-ws-proxy
	docker build -t xrpl-hooks-compiler .

run:
	docker run -p 127.0.0.1:3001:3001/tcp -p 127.0.0.1:9000:9000/tcp xrpl-hooks-compiler:latest

shell:
	docker run -it --entrypoint=/bin/bash xrpl-hooks-compiler:latest

wasi-sdk:
	cp -a ../wasi-sdk/build/install/opt/wasi-sdk .

clangd:
	cp ../llvm-project/build/bin/clangd .

jsonrpc-ws-proxy:
	cp -LR ../jsonrpc-ws-proxy .
	rm -rf jsonrpc-ws-proxy/.git

c2wasm-api:
	cp -LR ../c2wasm-api .
	rm -rf c2wasm-api/.git

clean:
	-rm -rf c2wasm-api clangd jsonrpc-ws-proxy wasi-sdk
