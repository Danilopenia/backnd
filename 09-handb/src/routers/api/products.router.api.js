import { Router } from "express";
import products from "../../data/fs/products.fs.js";
import propsProducts from "../../middlewares/propsProducts.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import isCapacityOkMid from "../../middlewares/isCapacityOk.mid.js";
const productsRouter = Router();

productsRouter.post("/", isAdmin, propsProducts,async (req, res, next) => {
    try {
      const data = req.body;
      const response = await products.createProduct(data);
     
        return res.json({
          statusCode: 201,
          message: "created",
          response,
        });
    } catch (error) {
    return next(error)

    }
  });
productsRouter.get("/", async (req, res, next) => {
    try {
      const all = await products.getProducts();
      //read va a necesitar un parametro para ordenar y filtrar
        return res.json({
          statusCode: 200,
          response: all,
        });
    } catch (error) {
      return next(error)
    }
  });
productsRouter.get("/:pid", async (req, res, next) => {
    try {
      const { pid } = req.params;
      const one = await products.getProductById(pid);
    } catch (error) {
   return next (error)
    }
  });
productsRouter.put("/:pid", async (req, res, next) => {
    try {
      const { pid, quantity } = req.params;
      const response = await products.soldticket(quantity, pid);
      if (typeof response === "number") {
        return res.json({
          statusCode: 200,
          response: "capacity available: " + response,
        });
      } else if (response === "There isn't any product") {
        return res.json({
          statusCode: 404,
          message: response,
        });
      } else {
        return res.json({
          statusCode: 400,
          message: response,
        });
      }
    } catch (error) {
      return next (error)
    }
  });
productsRouter.delete("/:pid", async (req, res, next) => {
    try {
      const { pid } = req.params;
      const response = await products.removeProductById(pid);
      if (response === "There isn't any product") {
        return res.json({
          statusCode: 404,
          message: response,
        });
      } else {
        return res.json({
          statusCode: 200,
          response,
        });
      }
    } catch (error) {
    return next(error)
    }
  });

export default productsRouter;