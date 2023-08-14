FROM node:18-alpine as BUILD_IMAGE
WORKDIR /home/node/app

COPY package.json . 

RUN yarn install

COPY . . 

RUN yarn build

FROM node:18-alpine as PROD_IMAGE
WORKDIR /home/node/app

COPY --from=BUILD_IMAGE /home/node/app/dist/ /home/node/app/dist/

COPY package.json . 
COPY vite.config.js .

EXPOSE 8080

CMD [ "yarn", "preview" ]