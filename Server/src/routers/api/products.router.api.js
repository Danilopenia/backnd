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
    this.create("/", ["PUBLIC"], create); ////ESTABA EN PUBLIC
    this.read("/", ["USER", "PREM"], read);
    this.read("/:pid", ["USER", "PREM"], readOne);
    this.update("/:pid", ["USER", "PREM"], update); ///PUBLIC
    this.destroy("/:pid", ["USER", "PREM"], destroy);//PUBLIC
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
