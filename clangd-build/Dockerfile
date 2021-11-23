FROM --platform=linux/amd64 node:17-buster
MAINTAINER Vaclav Barta "vaclav@equilibrium.co"
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y build-essential python3 cmake ninja-build
ADD build.sh .
CMD ./build.sh
