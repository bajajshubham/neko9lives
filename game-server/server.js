//===================IMPORTS=======================//
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const db = require("./db");
const http = require("http");
const socketIO = require("socket.io");
const { createGame } = require("./logic/sockets/room");

//===================CONFIGS=======================//
dotenv.config();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//===================WEB SOCKETS=======================//

// Create a namespace for the game
const gameNamespace = io.of("/game");

createGame(gameNamespace);

//===================SERVER=======================//
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("Backend server is up and running!");
  db.createConnections(process.env.MONGO_URI);
});
