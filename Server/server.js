import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"
import compression from "express-compression"

import swaggerJSDoc from "swagger-jsdoc"
import {serve, setup} from "swagger-ui-express"


import { engine } from "express-handlebars"

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import winstonLog from "./src/utils/logger/index.js";
import winston from "./src/middlewares/winston.js";



import cluster from "cluster"
import { cpus } from "os";


import options from "./src/utils/swagger.js";




//server
const server = express();
const PORT = process.env.PORT || 8080;
const ready = () => winstonLog.INFO("server ready on port " + PORT);








//middlewares
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);


//swagger
const specs = swaggerJSDoc(options)
server.use("/api/docs", serve, setup(specs))

server.use(cookieParser(process.env.SECRET));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.static("public"));
//
server.use(winston);
server.use(express.static("public"));
server.use(compression());
/*
server.use(compression({
  brotli:{ enabled: true, zlib:{}}
}))
*/


//VIEWS
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//endpoints
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);


//cluster



console.log(cluster.isPrimary)
if (cluster.isPrimary) {
  console.log("PRIMARY ID:"+ process.pid);
  const numberOfProcess = cpus().lenght
  console.log("NUMBER OF PROCESS OF MY COMPUTER: "+ numberOfProcess);
  cluster.fork()
}else{
  console.log("WORKER ID:"+process.pid);
  server.listen(PORT, ready);
}