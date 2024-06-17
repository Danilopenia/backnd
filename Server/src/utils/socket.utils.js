import { socketServer } from "../../server.js";
import products from "../data/fs/products.fs.js";
import propsProductsUtils from "./props.Products.utils.js";
import winstonLog from "../utils/logger/index.js";

export default (socket) => {
  winstonLog.INFO("client " + socket.id + " connected");
  socket.emit("", products.readProducts());
  socket.on("newMovie", async (data) => {
    try {
      propsProductsUtils(data);
      await products.createProduct(data);
      socketServer.emit("movies", products.readProduct());
    } catch (error) {
      winstonLog.ERROR(error);
      //emitir al cliente un mensaje de alerta
    }
  });
};