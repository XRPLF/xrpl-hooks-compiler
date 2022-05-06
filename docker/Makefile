# must be run as root

MAIN_CONTAINER_TAG?=xrpl-hooks-compiler

build: wasi-sdk c2wasm-api clangd cleaner
	docker build -t $(MAIN_CONTAINER_TAG) .

run:
	docker run -p 127.0.0.1:9000:9000/tcp $(MAIN_CONTAINER_TAG):latest

shell:
	docker run -it --entrypoint=/bin/sh $(MAIN_CONTAINER_TAG):latest

../wasi-sdk.ts: ../bin/wasi-sdk
	-rm -rf wasi-sdk
	cp -a ../bin/wasi-sdk .
	date > $@

wasi-sdk: ../wasi-sdk.ts

clangd: ../bin/clangd
	cp $< .

cleaner: ../bin/cleaner
	cp $< .

c2wasm-api: ../c2wasm-api
	cp -LR $< .
	rm -rf c2wasm-api/.git

clean:
	-rm -rf c2wasm-api clangd wasi-sdk
