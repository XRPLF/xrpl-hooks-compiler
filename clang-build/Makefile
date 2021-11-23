# must be run as root

all: build1 build2

build1:
	docker build -t clang-build .

build2:
	docker run -v $(realpath ../wasi-sdk):/mnt/wasi-sdk clang-build:latest
