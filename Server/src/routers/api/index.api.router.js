/*import CustomRouter from '../CustomRouter.js';
import UsersRouter from "./users.router.api.js";
import ProductsRouter from "./products.router.api.js";
import ClothesRouter from './clothes.router.api.js';
import SessionsRouter from './sessions.router.api.js';
import CategoriesRouter from './categories.router.api.js';
import SizesRouter  from "./sizes.router.api.js";
import OrdersRouter from './orders.router.api.js';

const session = new SessionsRouter();
const clothes = new ClothesRouter();
const categories = new CategoriesRouter();
const sizes = new SizesRouter();
const orders = new OrdersRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    this.use('/sessions', session.getRouter());
    this.use('/clothes', clothes.getRouter());
    this.use('/categories', categories.getRouter());
    this.use("/sizes", sizes.getRouter())
    this.use("/orders", orders.getRouter())
  }
}


import { fork } from "child_process";

import CustomRouter from "../CustomRouter.js";
//import usersRouter from "./users.router.api.js";
import productsRouter from "./products.router.api.js";
//import ordersRouter from "./orders.router.api.js";
//import sessionsRouter from "./sessions.router.api.js";
//import commentsRouter from "./comments.router.api.js";

class ApiRouter extends CustomRouter {
  init() {
    //this.use("/users", usersRouter);
    this.use("/products", productsRouter);
    //this.use("/orders", ordersRouter);
    //this.use("/sessions", sessionsRouter);
    //this.use("/comments", commentsRouter);
    this.read("/sum", ["PUBLIC"], async (req, res) => {
      try {
        console.log("global process id: " + process.pid);
        const child = fork("./src/utils/sum.util.js");
        child.send("start");
        child.on("message", (result) => res.success200(result));
        //const child1 = fork("./src/utils/sum.util.js");
        //const child2 = fork("./src/utils/subtract.util.js");
        //child1.send("start");
        //child2.send("start");
        //const results = {}
        //child1.on("message", (result) => results.sum = result);
        //child2.on("message", (result) => results.substract = result);
        //return res.success200(results)
      } catch (error) {
        return next(error);
      }
    });
  }
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
*/



/*
import { Router } from "express";
import notesRouter from "./notes.router.api.js";
import authRouter from "./auth.router.api.js";
import usersRouter from "./users.router.api.js"
import productsRouter from "./products.router.api.js"

const apiRouter = Router();


//apiRouter.use("/notes", notesRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);

export default apiRouter;*/


/*import { fork } from "child_process";

import CustomRouter from "../CustomRouter.js";
import usersRouter from "./users.router.api.js";
import productsRouter from "./products.router.api.js";
import ordersRouter from "./orders.router.api.js";
import sessionsRouter from "./sessions.router.api.js";
import commentsRouter from "./comments.router.api.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/products", productsRouter);
    this.use("/orders", ordersRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/comments", commentsRouter);
    //this.read("/sum", ["PUBLIC"], async (req, res) => {
      try {
       console.log("global process id: " + process.pid);
        const child = fork("./src/utils/sum.util.js");
        child.send("start");
        child.on("message", (result) => res.success200(result));
        const child1 = fork("./src/utils/sum.util.js");
        const child2 = fork("./src/utils/subtract.util.js");
        child1.send("start");
        child2.send("start");
        const results = {}
        child1.on("message", (result) => results.sum = result);
        child2.on("message", (result) => results.substract = result);
        return res.success200(results)
      } catch (error) {
        return next(error);
      }
    }//);
  }
//}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();








import { Router } from "express";
import notesRouter from "./notes.router.api.js";
import authRouter from "./auth.router.api.js";

const apiRouter = Router();

apiRouter.use("/notes", notesRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;*/

import CustomRouter from "../CustomRouter.js";
import usersRouter from "./users.router.api.js";
import productsRouter from "./products.router.api.js";
import ordersRouter from "./orders.router.api.js";
import sessionsRouter from "./sessions.router.api.js";
import commentsRouter from "./comments.router.api.js";
//import authRouter from "./auth.router.api.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/products", productsRouter);
    this.use("/orders", ordersRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/comments", commentsRouter);
    //this.use("/auth", authRouter);
    }
  }

const apiRouter = new SessionsRouter();
export default apiRouter.getRouter();

