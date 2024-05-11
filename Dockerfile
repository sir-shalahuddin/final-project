FROM node:18.20-alpine

WORKDIR /app

ENV VITE_HOST=https://midterm-3hwmderlmq-et.a.run.app
ENV VITE_WS_HOST=wss://midterm-3hwmderlmq-et.a.run.app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]
