import express from "express"
import router from "./src/routers/index.router.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";

const server = express();
const PORT = 8080
const ready = ()=>console.log("server ready on port" + PORT);
server.listen(PORT, ready)




server.post("/api/products", async (req, res) => {
    try {
      const data = req.body;
      const response = await products.createProduct(data);
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
  
    }
  });
  server.post("/api/users", async (req, res) => {
    try {
      const data = req.body;
      const response = await users.createUser(data);
      if (response === "Please, insert name & lastname") {
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
    
    }
  });
  server.post("/api/orders", async (req, res) => {
    try {
      const data = req.body;
      const response = await users.createOrder(data);
      if (response === "Please, insert name & lastname") {
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
    
    }
  });
  //GETPRODUCTS
  server.get("/api/products", async (req, res) => {
    try {
      const all = await products.getProducts();
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
  //GETUSERS
  server.get("/api/users", async (req, res) => {
    try {
      const all = await users.getUser();
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
  //GETORDERS
  server.get("/api/orders", async (req, res) => {
    try {
      const all = await orders.getOrder();
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
  
  //GETPRODUCTSBYID
  server.get("/api/products/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const one = await products.getProductById(pid);
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
  
  //GETORDERBYID
  server.get("/api/orders/:uid", async (req, res) => {
    try {
      const { oid } = req.params;
      const one = await users.getOrderById(oid);
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

  //DELETEPRODUCT
  server.delete("/api/products/:pid", async (req, res) => {
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
   
    }
  });
  //DELETEUSER
  server.delete("/api/users/:uid", async (req, res) => {
    try {
      const { uid } = req.params;
      const response = await users.removeUserById(uid);
      if (response === "There isn't any user") {
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
//DELETEORDER
server.delete("/api/orders/:uid", async (req, res) => {
  try {
    const { oid } = req.params;
    const response = await orders.removeOrderById(oid);
    if (response === "There isn't any user") {
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
  server.put("/api/products/:pid/:quantity", async (req, res) => {
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
    
    }
  });
//ORDERSUPDATEID
server.put("/api/orders/:pid/:quantity", async (req, res) => {
  try {
    const { oid, quantity } = req.params;
    const response = await orders.soldticket(quantity, oid);
    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: "capacity available: " + response,
      });
    } else if (response === "There isn't any  order") {
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


//MIDDLEWARES
server.use(express.json())
server.use(express.urlencoded({ extended: true}))
server.use(express.static(__dirname+'/public'))
server.use(morgan("dev"))



server.use("/", router)
server.use(errorHandler)
server.use(pathHandler)