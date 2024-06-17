import CustomRouter from "../CustomRouter.js";
import products from "../../data/mongo/products.mongo.js"; //!!!!se debe importar desde DAO o Factory en caso de que este como factory
// import isAdmin from "../../middlewares/isAdmin.mid.js";
//import winstonLog from "../../utils/logger/index.js"

class ProductsRouter extends CustomRouter {


  init() {
    this.read("/new", ["PUBLIC"] ,/*isAdmin,*/ (req, res, next) => { //passcalback("jwt")
      try {
        return res.render("new", { title: "CREATE MOVIE" });
      } catch (error) {
        next(error);
      }
    });

    this.read("/form",["PUBLIC"], /*isAdmin,*/ (req, res, next) => { //passcalback("jwt")
      try {
        return res.render("form", { title: "CREATE MOVIE" });
      } catch (error) {
        next(error);
      }
    });

    this.read("/:pid",["PUBLIC"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const one = await products.readOne(pid);
        console.log(one);
        return res.render("products", { product: one, category: one.category.toUpperCase() });
      } catch (error) {
        next(error);
      }
    });
  }
}

const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();
