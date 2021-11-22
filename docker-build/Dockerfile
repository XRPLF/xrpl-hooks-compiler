FROM debian
MAINTAINER Vaclav Barta "vaclav@equilibrium.co"
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y nodejs npm
ADD clangd /usr/bin
ADD jsonrpc-ws-proxy /jsonrpc-ws-proxy
WORKDIR ./jsonrpc-ws-proxy
RUN npm install && npm run prepare
CMD node dist/server.js --port 3001 --languageServers servers.yml
