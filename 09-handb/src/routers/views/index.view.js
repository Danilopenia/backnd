import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js"
import ordersRouter from "./orders.view.js";
import products from "../../data/fs/products.fs.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  try {
    const mainProducts = ["remerita", "gorrito"]
    const date = new Date()
    return res.render("index", {products: mainProducts, date});
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/pag", async(req, res, next)=>{
  try {
     const all = await products.getProducts()
     return res.render("products", { products: all })
  } catch (error) {
   next(error)   
  }
});

viewsRouter.use("/products", productsRouter)
viewsRouter.use("/users", usersRouter)
viewsRouter.use("/orders", ordersRouter)
export default viewsRouter;
