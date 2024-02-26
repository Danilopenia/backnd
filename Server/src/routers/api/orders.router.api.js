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
      const one = await orders.create(data);
     
        return res.json({
          statusCode: 201,
          response: one,
        });
    } catch (error) {
    return next(error)

    }
  });
  ordersRouter.get("/:oid",async(req,res, next)=>{
    try {
        const { oid } = req.params;
        const one = await orders.readOne(oid);
          return res.json({
            statusCode: 200,
            response: one,
          });
      } catch (error) {
        return next(error)
      }
});
  ordersRouter.get("/",async(req,res, next)=>{
    try {

      const orderAndPaginate = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort:{product_id: 1}
      }
      const filter = {}
      if (req.query.user_id) {
        filter.user_id= new RegExp(req.query.user_id.trim(), 'i')
      }
      if (req.query.user_id==="desc") {
        orderAndPaginate.sort.product_id = 1
      }else{
        orderAndPaginate.sort.product_id = -1
      }
        const all = await orders.read({filter, orderAndPaginate});
          return res.json({
            statusCode: 200,
            response: all,
          });
      } catch (error) {
       return next(error)
      }
})
/*ordersRouter.get("/", async (req, res, next) => {
    try {
      const all = await orders.read();
      return res.json({
        statusCode: 200,
        response: all,
      });
    }catch (error){
      return next(error)
    }
  });*/
  ordersRouter.get("/bills/:uid", async(req,res,next)=>{
    try {
      const { uid } = req.params
      const report = await orders.reportBill(uid)
      return res.json({
        statusCode: 200,
        response: report
      })
    } catch (error) {
      return next(error)
    }
  })
  /*ordersRouter.get("/:uid", async (req, res, next) => {
    try {
      const { uid } = req.params
      const filter = { user_id: uid}
      /*if (req.query.user_id) {
        filter = { user_id: req.query.user_id}
      }
      const all = await orders.readOne({filter});
      //read va a necesitar un parametro para ordenar y filtrar
        return res.json({
          statusCode: 200,
          response: all
        });
    } catch (error) {
      return next(error)
    }
  });/*
/*ordersRouter.put("/:oid", async (req, res, next) => {
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
  });*/
 ordersRouter.put("/:oid", async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const one = await orders.update(oid, data);
        return res.json({
          statusCode: 200,
          response: one
        });
    } catch (error) {
      return next(error);
    }
  });
  
ordersRouter.delete("/:oid", async (req, res, next) => {
    try {
      const { oid } = req.params;
      const one = await orders.destroy(oid);
        return res.json({
          statusCode: 200,
          response: one,
        });
    } catch (error) {
    return next(error)
    }
  });

export default ordersRouter;