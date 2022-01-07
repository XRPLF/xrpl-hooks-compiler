# must be run as root

CLANG_BUILD_CONTAINER_TAG?=clang-build

all: build1 build2 install

build1:
	docker build -t $(CLANG_BUILD_CONTAINER_TAG) .

build2:
	docker run -v $(realpath ../wasi-sdk):/mnt/wasi-sdk -v $(realpath ../llvm-project):/mnt/llvm-project $(CLANG_BUILD_CONTAINER_TAG):latest

install:
	./copy-subset.py rules.json ../wasi-sdk/build/install/opt/wasi-sdk ../bin/wasi-sdk
	./check-subset.py rules.json ../bin/wasi-sdk
