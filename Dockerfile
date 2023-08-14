FROM node:latest
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY . ./
RUN yarn install
EXPOSE 8080
CMD ["yarn", "dev"]