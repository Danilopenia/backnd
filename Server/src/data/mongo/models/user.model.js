import mongoosePaginate from "mongoose-paginate-v2";
import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0, enum: [0, 1, 2] },
    verified: { type: Boolean, default: false },
    verifiedCode: { type: String, required: true }
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const User = model(collection, schema);
export default User;
