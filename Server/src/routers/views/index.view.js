import { Router } from "express";
import productsRouter from "./products.view.js";
import sessionsRouter from "./sessions.view.js"
import ordersRouter from "./orders.view.js";
// import products from "../../data/fs/products.fs.js";
import { products } from '../../data/mongo/manager.mongo.js'

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const orderAndPaginate = {
      limit: req.query.limit || 4,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true
    };
    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }
    if (req.query.sort === "desc") {
      options.sort.title = "desc";
    }
    const all = await products.read({ filter, orderAndPaginate });

    return res.render("index", {
      products: all.docs,
      next: all.nextPage,
      prev: all.prevPage,
      title: "INDEX",
      filter: req.query.title,
    });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/products", productsRouter)
viewsRouter.use("/sessions", sessionsRouter)
viewsRouter.use("/orders", ordersRouter)
export default viewsRouter;