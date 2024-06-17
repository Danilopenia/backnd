/*import CustomRouter from "../CustomRouter.js";

import products from "../../data/mongo/products.mongo.js";

import productsRouter from "./products.view.js";
import sessionsRouter from "./sessions.view.js";
//import ordersRouter from "./orders.view.js";


export class ViewsRouter extends CustomRouter {
  init() {
    this.router.use("/products", productsRouter);
    //this.router.use("/orders", ordersRouter);
    this.router.use("/sessions", sessionsRouter);
 

    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        
        const options = {
          limit: req.query.limit || 4,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        }; 
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          options.sort.title = "desc";
        }
        const all = await products.read({ filter, options });
        return res.render("index"), {
          products: all.docs,
          //next: all.nextPage,
          //prev: all.prevPage,
         // title: "INDEX",
          //filter: req.query.title,
        };
      } catch (error) {
        next(error);
      }
    })
  

const router = new ViewsRouter();
export default router.getRouter();*/





import CustomRouter from "../CustomRouter.js";
import products from "../../data/mongo/products.mongo.js";

import productsRouter from "./products.view.js";

import sessionsRouter from "./sessions.view.js";
import ordersRouter from "./orders.view.js";

//export default 
 class ViewsRouter extends CustomRouter {
  init() {
    this.router.use("/products", productsRouter); //this.router.use
    this.router.use("/orders", ordersRouter);
    this.router.use("/sessions", sessionsRouter);
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const options = {
          limit: 3, //req.query.limit ||
          page: req.query.page || 1,
          sort: { category: 1 },
          lean: true,
        };
        const filter = {};
        if (req.query.category) {
          filter.category = new RegExp(req.query.category.trim(), "i");
        }
        if (req.query.sort === "desc") {
          options.sort.category = "desc";
        }
        const all = await products.read({ filter, options });
        return res.render("index", {
          products: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          title: "INDEX",
          filter: req.query.category,
        });
      } catch (error) {
        next(error);
      }
    });
  }
}

const router = new ViewsRouter();
export default router.getRouter();