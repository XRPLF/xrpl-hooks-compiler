# Builds a docker image with (proxy of) clangd running on port
# 3001. Run as root, on a Linux machine with docker, after checking
# out the packages going into the docker image.

build:
	$(MAKE) -C clangd-build
	$(MAKE) -C docker-build
