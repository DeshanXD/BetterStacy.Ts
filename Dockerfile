FROM node:17-alpine3.12

WORKDIR /usr/src/bot

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start"]