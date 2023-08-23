FROM node:20.3-buster

WORKDIR /neko-game-client
COPY package*.json ./

RUN npm config set legacy-peer-deps true
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]