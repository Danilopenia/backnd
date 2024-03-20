import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "products";
const schema = new Schema({
  title: { type: String, required: true, index: true},
  photo: {
    type: String,
    default: "https://i.postimg.cc/HxdvTwqJ/events.jpg",
  },
  price: { type: Number, default: 10 },
  stock: { type: Number, default: 50 }
});
schema.plugin(mongoosePaginate)
const Product = model(collection, schema);
export default Product;
