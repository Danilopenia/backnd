import ProductDTO from "../dto/product.dto.js";
import dao from "../data/index.factory.js";
import products from "../data/mongo/products.mongo.js";

//const { products } = dao;

class ProductsRep {
  constructor() {
    this.model = products;
  }
  create = async (data) => await this.model.create(new ProductDTO(data));
  read = async ({ filter, options }) => await this.model.read({ filter, options });
  readOne = async (id) => await this.model.readOne(id);
  readByEmail = async (email) => await this.model.readByEmail(email);
  update = async (id, data) => await this.model.update(id, data);
  destroy = async (id) => await this.model.destroy(id);
}

const repository = new ProductsRep();
export default repository;