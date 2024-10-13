FROM node:20-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . ./sample-http-server

WORKDIR /sample-http-server

RUN apt-get update && apt-get install -y curl telnet
RUN ls
RUN pnpm install
RUN pnpm run build
EXPOSE 8000
ENTRYPOINT ["pnpm", "run", "start"]

