import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/products.controller.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREM"], create); ////ESTABA EN PUBLIC
    this.read("/", ["PUBLIC"], read);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["PREM", "ADMIN"], update); ///PUBLIC
    this.destroy("/:pid", ["ADMIN", "PREM"], destroy);//PUBLIC
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
