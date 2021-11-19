# must be run as root

build: clangd jsonrpc-ws-proxy
	docker build -t xrpl-hooks-compiler .

run:
	docker run -p 127.0.0.1:3001:3001/tcp xrpl-hooks-compiler:latest

shell:
	docker run -it --entrypoint=/bin/bash xrpl-hooks-compiler:latest

clangd:
	cp ~/llvm-project/build/bin/clangd .

jsonrpc-ws-proxy:
	cp -LR ~/jsonrpc-ws-proxy .
	rm -rf jsonrpc-ws-proxy/.git
