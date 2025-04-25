FROM ubuntu:latest
LABEL authors="Florian Schlager"

ENTRYPOINT ["top", "-b"]