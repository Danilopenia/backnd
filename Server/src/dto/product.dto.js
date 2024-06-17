import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class ProductDTO {
  constructor(data) {
    argsUtil.env !== "MONGO" && //"prod"
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.title = data.title;
    this.poster = data.poster || "https://i.postimg.cc/HxdvTwqJ/events.jpg"
    this.price = data.price || 10;
    this.stock = data.stock || 50;
    this.category = data.category || "varios"
    this.date = data.date || new Date();
    argsUtil.env !== "MONGO" && (this.updatedAt = new Date()); // argsUtil.env !== "prod" && (this.updatedAt = new Date());
    argsUtil.env !== "MONGO" && (this.createdAt = new Date()); // argsUtil.env !== "prod" && (this.createdAt = new Date());
  }
}

export default ProductDTO;