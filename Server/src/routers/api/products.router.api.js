import CustomRouter from "../CustomRouter.js";
//import products from "../../data/fs/products.fs.js";
import { products } from "../../data/mongo/manager.mongo.js";
//import propsProducts from "../../middlewares/propsProducts.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import isCapacityOkMid from "../../middlewares/isCapacityOk.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

export default class ProductsRouter extends CustomRouter{
  init(){
this.create("/",["ADMIN", "PREM"], passCallBack("jwt"), isAdmin, /*propsProducts,*/ async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.create(data);

    return res.success201(response)
  } catch (error) {
    return next(error);
  }
});
this.read("/", ["PUBLIC"],async (req, res, next) => {
  try {

    const options = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true,
    }
    const filter = {}
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), 'i')
    }
    if (req.query.sort === "desc") {
      options.sort.title = "desc";
    } 
    const all = await products.read({ filter, options });
    return res.success200(all)
  } catch (error) {
    return next(error)
  }
})
/*this.read("/",["PUBLIC"], async (req, res, next) => {
  try {
    //const filter = { category: req.query.category}
    //const order = { name: req.query.order}
    const all = await products.read({});
    //read va a necesitar un parametro para ordenar y filtrar
    return res.success200(one)
  } catch (error) {
    return next(error);
  }
});*/

this.read("/:pid",["PUBLIC"], async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    return res.success200(one)
  } catch (error) {
    return next(error);
  }
});
/*this.read("/:pid:quantity",["PUBLIC"], isCapacityOkMid, async (req, res, next) => {
  try {
    const { pid, quantity } = req.params;
    const response = await products.soldticket(quantity, pid);
    /*if (typeof response === "number") {
     return res.json({
        statusCode: 200,
        response: "capacity available: " + response,
      });
    } else if (response === "There isn't any product") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {*/////
    /*return res.success200(response)
    //}
  } catch (error) {
    return next(error);
  }
});*/
this.update("/:pid",["PREM", "ADMIN"] ,async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const response = await products.update(pid, data);
    return res.success200(response)
  } catch (error) {
    return next(error);
  }
});

this.destroy("/:pid",["PREM", "ADMIN"], async (req, res, next) => {
  try {
    const { pid } = req.params;
    const response = await products.destroy(pid);
    /*if (!one) {
      return res.json({
        statusCode: 200,
        message: "there isnt product",
      });
    } else {*/
    return res.success200(response)

  } catch (error) {
    return next(error);
  }
});

  }
}




