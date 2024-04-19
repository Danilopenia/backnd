import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "products";
const schema = new Schema({
  title: { type: String, required: true, index: true},
  poster: {
    type: String,
    default: "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2023/05/03/16831330322016.png",
  },
  price: { type: Number, default: 10 },
  stock: { type: Number, default: 50 }
});
schema.plugin(mongoosePaginate)
const Product = model(collection, schema);
export default Product;
