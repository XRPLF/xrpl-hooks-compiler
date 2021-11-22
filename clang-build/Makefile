# must be run as root

all: build1 build2

build1:
	docker build -t clang-build .

build2:
	docker run -v ~/wasi-sdk:/wasi-sdk clang-build:latest
