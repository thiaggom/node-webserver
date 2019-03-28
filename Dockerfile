FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY . /app

EXPOSE 4000

RUN npm install

CMD ["npm", "start"]