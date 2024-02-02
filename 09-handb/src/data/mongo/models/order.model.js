import { model, Schema} from "mongoose";

const collection = "orders";
const schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, default:10},
    poster: {
      type: String,
      default: "https://i.postimg.cc/HxdvTwqJ/events.jpg"},
    stock: { type: Number, default:50},
    capacity: { type: Number, default:50},
    date: {type: Date, default: new Date()}
    },{
      timetamps: true,
    });

const Order = model(collection, schema);
export default Order;