import { Router } from "express";

import products from "../../data/mongo/products.mongo.js";
//import isAdmin from "../../middlewares/isAdmin.mid.js";
import passCallBack from "../../middlewares/passCallBack.js";

const productsRouter = Router()

productsRouter.get("/new", passCallBack("jwt"), /*isAdmin,*/ (req, res, next) => {
  try {
    return res.render("new", { title: "CREATE MOVIE" });
  } catch (error) {
    next(error);
  }
});


productsRouter.get("/form", passCallBack("jwt"), /*isAdmin,*/ (req, res, next) => {
  try {
    return res.render("form", { title: "CREATE MOVIE" });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.render("detail", { product: one, title: one.title.toUpperCase() });
  } catch (error) {
    next(error);
  }
});


export default productsRouter