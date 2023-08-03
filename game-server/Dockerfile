FROM node:20.3-buster

WORKDIR /neko-game-server
COPY package*.json ./
RUN npm install
COPY . .
CMD npm start