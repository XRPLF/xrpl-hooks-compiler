# must be run as root

MAIN_CONTAINER_TAG?=xrpl-hooks-compiler

build: wasi-sdk c2wasm-api clangd jsonrpc-ws-proxy
	docker build -t $(MAIN_CONTAINER_TAG) .

run:
	docker run -p 127.0.0.1:3001:3001/tcp -p 127.0.0.1:9000:9000/tcp $(MAIN_CONTAINER_TAG):latest

shell:
	docker run -it --entrypoint=/bin/sh $(MAIN_CONTAINER_TAG):latest

wasi-sdk: ../bin/wasi-sdk
	cp -a $< .

clangd: ../bin/clangd
	cp $< .

jsonrpc-ws-proxy:
	cp -LR ../jsonrpc-ws-proxy .
	rm -rf jsonrpc-ws-proxy/.git

c2wasm-api:
	cp -LR ../c2wasm-api .
	rm -rf c2wasm-api/.git

clean:
	-rm -rf c2wasm-api clangd jsonrpc-ws-proxy wasi-sdk
