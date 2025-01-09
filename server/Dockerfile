FROM node:22-alpine

WORKDIR /home/app

RUN apk update && apk add curl openssl 

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile 

COPY . .

RUN yarn build 

RUN curl -o wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x wait-for-it.sh 

RUN yarn prisma generate

CMD ["node", "./dist/index.js"]

