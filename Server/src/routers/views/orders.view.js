import { Router } from "express";
import orders from "../../data/fs/orders.fs.js"


const ordersRouter = Router()


ordersRouter.post("/", async (req, res) => {
    try {
      const data = req.body;
      const response = await orders.createOrder(data);
      if (response === "Please, insert title & price") {
        return res.json({
          statusCode: 400,
          message: response,
        });
      } else {
        return res.json({
          statusCode: 201,
          message: "created",
          response,
        });
      }
    } catch (error) {
  next (error)
    }
  });

    //GETORDERS
    ordersRouter.get("/", async (req, res) => {
        try {
          const all = await orders.getOrders();
          if (Array.isArray(all)) {
            return res.json({
              statusCode: 200,
              response: all,
            });
          } else {
            return res.json({
              statusCode: 404,
              message: all,
            });
          }
        } catch (error) {
       
        }
      });

    
  //GETORDERSBYID
  ordersRouter.get("/", async (req, res) => {
    try {
      const { oid } = req.params;
      const one = await orders.getOrderById(oid);
      if (typeof one === "string") {
        return res.json({
          statusCode: 404,
          message: one,
        });
      } else {
        return res.json({
          statusCode: 200,
          response: one,
        });
      }
    } catch (error) {
    
    }
  });   

    //DELETEORDERS
    ordersRouter.delete("/:oid", async (req, res) => {
        try {
          const { oid } = req.params;
          const response = await orders.removeOrderById(pid);
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
       
        }
      });


      //PRODUCTSUPDATEID
  ordersRouter.put("/:oid", async (req, res) => {
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
    
    }
  });
ordersRouter.get("/", async(req, res, next)=>{
    try {
       const all = await orders.getOrders()
       return res.render("orders", { orders: all })
    } catch (error) {
     next(error)   
    }
});

ordersRouter.get("/new", (req, res, next)=>{
    try {
        return res.render("new")
    } catch (error) {
      next (error)  
    }
})

export default ordersRouter