import { Router } from "express";
//import products from "../../data/fs/products.fs.js";
import { products } from "../../data/mongo/manager.mongo.js";
//import propsProducts from "../../middlewares/propsProducts.mid.js";
//import isAdmin from "../../middlewares/isAdmin.mid.js";
//import isCapacityOkMid from "../../middlewares/isCapacityOk.mid.js";
const productsRouter = Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.create(data);

    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await products.read();
    //read va a necesitar un parametro para ordenar y filtrar
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.json({
      statusCode: 404,
      message: one,
    });
  } catch (error) {
    return next(error);
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
    return next(error);
  }
});
productsRouter.put("/:pid", async (req, res, next) => {
  try {
    const opt = { new: true };
    const one = await this.products.update(id, data, opt);
    if (!one) {
      return res.json({
        statusCode: 200,
        message: "there isnt product",
      });
    } else {
      return res.json({
        statusCode: 200,
        one,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.destroy(pid);
    if (!one) {
      return res.json({
        statusCode: 200,
        message: "there isnt product",
      });
    } else {
      return res.json({
        statusCode: 200,
        one,
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
