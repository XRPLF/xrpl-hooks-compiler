# must be run as root

CLANGD_BUILD_CONTAINER_TAG?=clangd-build

DOC_FLAG?=0

all: build1 build2 install

build1:
	docker build -t $(CLANGD_BUILD_CONTAINER_TAG) .

build2:
	docker run -v $(realpath ../llvm-project):/mnt/llvm-project -e DOC_FLAG=$(DOC_FLAG) $(CLANGD_BUILD_CONTAINER_TAG):latest

doc-install:
	cp ../llvm-project/build/tools/clang/tools/extra/docs/html/_static/*.css ../doc
	cp ../llvm-project/build/tools/clang/tools/extra/docs/html/_static/*.png ../doc
	./munge-doc.py ../llvm-project/build/tools/clang/tools/extra/docs/html/clang-tidy/checks/hooks-* ../doc

install:
	cp ../llvm-project/build/bin/clangd ../bin
