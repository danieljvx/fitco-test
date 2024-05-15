FROM node:18-alpine

LABEL maintainer="Daniel Villanueva <villanueva.danielx@gmail.com>"

RUN apk update && apk add --no-cache git

WORKDIR /web

COPY package.json ./

RUN yarn install

COPY . .

CMD ["npm", "run", "dev"]