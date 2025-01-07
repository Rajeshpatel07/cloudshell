FROM node:lts-alpine

WORKDIR /home/app

COPY package.json yarn.lock ./

RUN yarn

COPY .env ./

COPY . ./

RUN yarn prisma migrate dev

RUN yarn build

EXPOSE 5000

WORKDIR ./dist

CMD ["node","index.js"]

