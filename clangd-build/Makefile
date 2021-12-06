# must be run as root

CLANGD_BUILD_CONTAINER_TAG?=clangd-build

all: build1 build2 install

build1:
	docker build -t $(CLANGD_BUILD_CONTAINER_TAG) .

build2:
	docker run -v $(realpath ../llvm-project):/mnt/llvm-project $(CLANGD_BUILD_CONTAINER_TAG):latest

install:
	cp ../llvm-project/build/bin/clangd ../bin
