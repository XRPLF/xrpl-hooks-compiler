# must be run as root

all: build1 build2

build1:
	docker build -t clangd-build .

build2:
	docker run -v ~/llvm-project:/llvm-project clangd-build:latest
