import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js"
import ordersRouter from "./orders.view.js";
// import products from "../../data/fs/products.fs.js";
import { products } from '../../data/mongo/manager.mongo.js'

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const response = await products.read({})
    const all = response.docs.map((product) => product.toJSON())

    return res.render("index", { products: all });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/pag", async (req, res, next) => {
  try {
    const response = await products.read()
    const all = response.docs.map((product) => product.toJSON())
    return res.render("products", { products: all })
  } catch (error) {
    next(error)
  }
});

viewsRouter.use("/products", productsRouter)
viewsRouter.use("/users", usersRouter)
viewsRouter.use("/orders", ordersRouter)
export default viewsRouter;