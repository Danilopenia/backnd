import "dotenv/config.js";

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
//import products from "./src/data/fs/products.fs.js";
import socketUtils from "./src/utils/socket.utils.js";

import router from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import __dirname from "./utils.js";
import dbConnection from "./src/utils/db.js";
const server = express();
const PORT = process.env.PORT || 8080;
const ready = () => {
  console.log("server ready on port" + PORT);
  dbConnection();
};
//server.listen(PORT, ready)

const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", socketUtils);
/*socketServer.on("connection", (socket)=>{
//console.log(socket);
console.log(socket.id);
socket.emit("welcome", "welcome")
socket.on("new product", async(data)=>{
    try {
      console.log(data);

     await products.createProduct(data)
     socket.emit("new success", "well done!")
    } catch (error) {
    console.log(error);    
    }
 
});*/

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));

//routers
//enrutadores
//catch de error
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

export { socketServer };
