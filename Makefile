all: checkout build

# Checks out submodules. Run after git clone.
checkout:
	git submodule update --init --recursive

bin:
	mkdir $@

doc:
	mkdir $@

# Builds a docker image with (API of) clang & clangd running on port
# 9000. Run as root, on a Linux machine with docker.
build: bin
	$(MAKE) -C clang-build
	$(MAKE) -C clangd-build
	$(MAKE) -C docker

doc-build: doc
	$(MAKE) -C clangd-build DOC_FLAG=1 doc-clean build1 build2 doc-install

bin.zip: bin
	zip -r $@ $<

doc.zip: doc
	zip -r $@ $<
