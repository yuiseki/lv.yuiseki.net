FROM ubuntu:24.04

RUN apt update
RUN apt install -y git curl
RUN apt install -y vim htop make jq

RUN curl -Ls https://deb.nodesource.com/setup_18.x | bash
RUN apt update && apt install -y nodejs
RUN npm i -g npm

RUN apt install -y gcc

EXPOSE 30000
EXPOSE 50000

RUN useradd -m user
USER user

ENV RUST_VERSION stable
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain ${RUST_VERSION}
RUN echo 'source /home/user/.cargo/env' >> /home/user/.bashrc
ENV PATH="/home/user/.cargo/bin:${PATH}"

RUN rustup install stable
RUN rustup component add rls rust-analysis
RUN cargo install htmlq

USER root
ARG NONROOT_USER=user
RUN curl -fsSL https://get.docker.com | sh
RUN echo "#!/bin/sh\n\
    sudoIf() { if [ \"\$(id -u)\" -ne 0 ]; then sudo \"\$@\"; else \"\$@\"; fi }\n\
    SOCKET_GID=\$(stat -c '%g' /var/run/docker.sock) \n\
    if [ \"${SOCKET_GID}\" != '0' ]; then\n\
        if [ \"\$(cat /etc/group | grep :\${SOCKET_GID}:)\" = '' ]; then sudoIf groupadd --gid \${SOCKET_GID} docker-host; fi \n\
        if [ \"\$(id ${NONROOT_USER} | grep -E \"groups=.*(=|,)\${SOCKET_GID}\(\")\" = '' ]; then sudoIf usermod -aG \${SOCKET_GID} ${NONROOT_USER}; fi\n\
    fi\n\
    exec \"\$@\"" > /usr/local/share/docker-init.sh \
    && chmod +x /usr/local/share/docker-init.sh

RUN apt install -y rsync

ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]
