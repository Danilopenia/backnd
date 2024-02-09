import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import Order from "./models/order.model.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";

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
  /* async read(data) {
    try {
      const one = await this.model.find();
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }*/
  async read({ filter, orderAndPaginate }) {
    try {
      const all = await this.model
      .paginate(filter,orderAndPaginate)
      console.log(all.docs);
     if (all.totalPages === 0) {
      const error = new Error("there aren't any document");
      error.statusCode = 404;
      throw error;
     }
      return all;
    } catch (error) {
      throw error;
    }
  }
 

  //READ BY EMAIL
  /*async readByEmail(obj) {
    try {
      //const obj = data.email
       let { email } = obj;
      const one = await this.model.findByEmail(email);
      notFoundOne(one)
      return one
    } catch (error) {
      throw error;
    }
  }*/

  //
  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
async stats({ filter }){
  try {
    let stats = await this.model.find(filter).explain("executionStats");
  console.log(stats);
  stats = {
    quantity: stats.executionStats.nReturned,
    time: stats.executionStats.executionTimeMillis
  }
  return stats
  } catch (error) {
    throw error
  }
}
}


const users = new MongoManager(User);
const products = new MongoManager(Product);
const orders = new MongoManager(Order);
//
export { products, users, orders };
