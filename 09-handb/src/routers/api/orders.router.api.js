import { Router } from "express";
//import products from "../../data/fs/products.fs.js";
import { orders } from "../../data/mongo/manager.mongo.js";
//import propsProducts from "../../middlewares/propsProducts.mid.js";
//import isAdmin from "../../middlewares/isAdmin.mid.js";
//import isCapacityOkMid from "../../middlewares/isCapacityOk.mid.js";
const ordersRouter = Router();

ordersRouter.post("/",async (req, res, next) => {
    try {
      const data = req.body;
      const response = await orders.create(data);
     
        return res.json({
          statusCode: 201,
          response,
        });
    } catch (error) {
    return next(error)

    }
  });
ordersRouter.get("/", async (req, res, next) => {
    try {
      const all = await orders.read();
      //read va a necesitar un parametro para ordenar y filtrar
        return res.json({
          statusCode: 200,
          response: all,
        });
    } catch (error) {
      return next(error)
    }
  });
ordersRouter.get("/:oid", async (req, res, next) => {
    try {
      const { oid } = req.params;
      const one = await orders.readOne(oid);
      return res.json({
        statusCode: 404,
        message: one,
      });
    }catch (error){
      return next(error)
    }
  });
ordersRouter.put("/:oid", async (req, res, next) => {
    try {
      const { oid, quantity } = req.params;
      const response = await orders.soldticket(quantity, oid);
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
 ordersRouter.put("/:oid", async (req, res, next) => {
    try {
      const opt = { new: true };
      const one = await this.orders.update(id, data, opt);
      if (!one) {
        return res.json({
          statusCode: 200,
          message: "there isnt orders",
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
  
ordersRouter.delete("/:oid", async (req, res, next) => {
    try {
      const { oid } = req.params;
      const response = await orders.destroy(oid);
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

export default ordersRouter;