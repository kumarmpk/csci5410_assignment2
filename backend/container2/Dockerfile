FROM node:12.16

WORKDIR /app

COPY package.json /app

RUN npm install

COPY  .  /app

CMD node loginApp.js

EXPOSE 3002