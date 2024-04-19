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
    this.create("/", ["PUBLIC"], create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["PUBLIC"], update);
    this.destroy("/:pid", ["PUBLIC"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
