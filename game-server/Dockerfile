FROM node:20.3-buster

WORKDIR /neko-game-server
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000
CMD npm start