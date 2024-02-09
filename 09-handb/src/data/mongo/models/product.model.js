import { model, Schema } from "mongoose";

const collection = "products";
const schema = new Schema({
  title: { type: String, required: true, index: true},
  poster: {
    type: String,
    default: "https://i.postimg.cc/HxdvTwqJ/events.jpg",
  },
  price: { type: Number, default: 10 },
  stock: { type: Number, default: 50 },
  date: { type: Date, default: new Date() },
});

const Product = model(collection, schema);
export default Product;
