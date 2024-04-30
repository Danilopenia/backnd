import "dotenv/config.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"

import { engine } from "express-handlebars"

import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";

//server
const server = express();
const PORT = process.env.PORT || 8080;
const ready = () => console.log("server ready on port " + PORT);
server.listen(PORT, ready);

//middlewares
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);
server.use(cookieParser(process.env.SECRET));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.static("public"));



//VIEWS
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//endpoints
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);