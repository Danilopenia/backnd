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
    this.create("/", ["USER"], create); ////ESTABA EN PUBLIC
    this.read("/", ["PUBLIC"], read);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["USER"], update); ///PUBLIC
    this.destroy("/:pid", ["USER"], destroy);//PUBLIC
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
