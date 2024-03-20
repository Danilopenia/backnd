import { Router } from "express";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

const productsRouter = Router()

productsRouter.get("/new", passCallBack("jwt"), isAdmin, (req, res, next) => {
  try {
    return res.render("new", { title: "CREATE MOVIE" });
  } catch (error) {
    next(error);
  }
});

export default productsRouter