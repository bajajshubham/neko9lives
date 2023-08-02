//===================IMPORTS=======================//
const dotenv = require("dotenv");
const app = require("./app");
const http = require("http");

//===================CONFIGS=======================//
dotenv.config();
const server = http.createServer(app);

//===================SERVER=======================//
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("Backend server is up and running!");
})