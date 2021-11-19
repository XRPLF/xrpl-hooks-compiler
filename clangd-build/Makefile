# must be run as root

build1:
	docker build -t clangd-build .

build2:
	docker run -v ~/llvm-project:/llvm-project clangd-build:latest
