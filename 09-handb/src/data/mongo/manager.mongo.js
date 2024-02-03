import User from "./models/user.model.js"
import Product from "./models/product.model.js"
import Order from "./models/order.model.js"

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      throw error;
    }
  }
  async read() {
    try {
      const all = await this.model.find();
      if (all.length === 0) {
        const error = new error("there arent events");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      if (!one) {
        const error = new Error("there isnt event");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id,data) {
    try {
        const opt = { new: true}
       const one = await this.model.findByIdAndUpdate(id,data,opt) 
       if (!one) {
        const error = new Error("there isnt event");
        error.statusCode = 404;
        throw error;
    } return one;
  }catch (error) {
        throw error
    }
  }
  async destroy(id) {
    try {
        const one = await this.model.findByIdAndDelete(id);
        if (!one) {
            const error = new Error("there isnt event");
            error.statusCode = 404;
            throw error;
            }
            return one
    } catch (error) {
      throw error  
    }
  }
}

const users = new MongoManager(User);
const products = new MongoManager(Product);
const orders = new MongoManager(Order);
//
export { products, users, orders} 
