import { connect } from "mongoose";
import env from "./env.util.js";


export default async () => {
  try {
    await connect(env.DB_LINK)
    winstonLog.INFO("mongo database connected");
  } catch (error) {
  }
};