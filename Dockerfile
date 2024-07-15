FROM arm32v7/debian:latest

LABEL maintainer="alexchristianqr@gmail.com"
LABEL version="1.0"
LABEL description="Docker container with Raspbian for Raspberry Pi"

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
    curl \
    wget \
    sudo \
    nano \
    git && \
    apt-get clean

CMD [ "bash" ]