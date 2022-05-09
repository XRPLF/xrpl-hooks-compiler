# must be run as root

CLEANER_BUILD_CONTAINER_TAG?=cleaner-build

all: build1 build2 install

build1:
	docker build -t $(CLEANER_BUILD_CONTAINER_TAG) .

build2:
	docker run -v $(realpath ../hook-cleaner-c):/mnt/hook-cleaner $(CLEANER_BUILD_CONTAINER_TAG):latest

install:
	cp ../hook-cleaner-c/cleaner ../bin

clean:
	-rm ../hook-cleaner-c/cleaner
