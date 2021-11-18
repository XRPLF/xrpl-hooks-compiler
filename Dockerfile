FROM debian
MAINTAINER Vaclav Barta "vaclav@equilibrium.co"
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y build-essential
RUN apt-get install -y python3
RUN apt-get install -y cmake
RUN apt-get install -y ninja-build
ADD build.sh .
CMD ./build.sh
