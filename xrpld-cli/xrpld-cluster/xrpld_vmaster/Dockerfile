FROM transia/hooksv3d-binary:latest as rippled

WORKDIR /app

LABEL maintainer="dangell@transia.co"

RUN export LANGUAGE=C.UTF-8; export LANG=C.UTF-8; export LC_ALL=C.UTF-8; export DEBIAN_FRONTEND=noninteractive

# COPY config /config
COPY entrypoint /entrypoint.sh
COPY genesis.json /genesis.json

RUN chmod +x /entrypoint.sh && \
    echo '#!/bin/bash' > /usr/bin/server_info && echo '/entrypoint.sh server_info' >> /usr/bin/server_info && \
    chmod +x /usr/bin/server_info

EXPOSE 5005 6006 51235 51235/udp

ENTRYPOINT [ "/entrypoint.sh" ]
