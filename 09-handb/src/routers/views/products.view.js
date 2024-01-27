import { Router } from "express";
import products from "../../data/fs/products.fs.js"


const productsRouter = Router()


productsRouter.post("/", async (req, res) => {
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
  next (error)
    }
  });

    //GETPRODUCTS
    productsRouter.get("/", async (req, res) => {
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

    
  //GETPRODUCTSBYID
  productsRouter.get("/", async (req, res) => {
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

    //DELETEPRODUCT
    productsRouter.delete("/:pid", async (req, res) => {
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


      //PRODUCTSUPDATEID
  productsRouter.put("/:pid", async (req, res) => {
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
productsRouter.get("/pag", async(req, res, next)=>{
    try {
       const all = await products.getProducts()
       return res.render("products", { products: all })
    } catch (error) {
     next(error)   
    }
});

productsRouter.get("/new", (req, res, next)=>{
    try {
        return res.render("new")
    } catch (error) {
      next (error)  
    }
})

export default productsRouter