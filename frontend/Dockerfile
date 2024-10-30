# Base stage for both dev and prod
FROM node:18-alpine as base
WORKDIR /frontend
RUN npm install -g pnpm
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./

RUN pnpm install
COPY . .
EXPOSE 5173
CMD [ "pnpm", "run", "dev"]

