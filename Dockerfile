FROM node:20.11.1

WORKDIR /home/node/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@9.10.0

ENV SHELL=/bin/bash
ENV PNPM_HOME=/home/node/app/node_modules/.bin

ENV PATH=$PNPM_HOME:$PATH

RUN pnpm setup
RUN pnpm install
RUN pnpm i sharp
RUN pnpm setup && pnpm i -g ts-node

COPY . .
RUN pnpm dlx prisma db push
RUN pnpm dlx prisma db seed

RUN pnpm run build
EXPOSE 40000
CMD pnpm start