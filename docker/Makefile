# must be run as root

build1:
	docker build -t xrpl-hooks-compiler .

build2:
	docker run -v ~/llvm-project:/llvm-project xrpl-hooks-compiler:latest
