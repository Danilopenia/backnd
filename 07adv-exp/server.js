import express from "express";
import users from "./data/fs/users.fs.js";
import products from "./data/fs/products.fs.js";
import nodemon from "nodemon";
const { removeAllListeners } = nodemon;

const server = express();

const PORT = 8080;
const ready = console.log("server ready on port" + PORT);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

//endpoints
//CREATE PRODUCTS
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
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
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
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
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
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
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
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
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
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

//GETUSER BYID
server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const one = await users.getUserById(uid);
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
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

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
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

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
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

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
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});