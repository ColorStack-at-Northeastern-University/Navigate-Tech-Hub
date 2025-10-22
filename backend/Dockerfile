FROM node:18-alpine

# Install build dependencies for Sharp
RUN apk update && apk add --no-cache \
    build-base gcc autoconf automake zlib-dev libpng-dev \
    nasm bash vips-dev git

WORKDIR /opt/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn global add node-gyp
RUN yarn config set network-timeout 600000 -g
RUN yarn install --frozen-lockfile

# Install PostgreSQL driver (missing from package.json)
RUN yarn add pg

# Rebuild sharp for Alpine
RUN yarn add sharp --ignore-engines

COPY . .

EXPOSE 1337

CMD ["yarn", "develop"]