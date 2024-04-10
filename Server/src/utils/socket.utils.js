import { socketServer } from "../../server.js";
import events from "../data/fs/products.fs.js";
import propsProductsUtils from "./props.Products.utils.js";

export default (socket) => {
  console.log("client " + socket.id + " connected");
  socket.emit("movies", products.readProducts());
  socket.on("newMovie", async (data) => {
    try {
      propsProductsUtils(data);
      await products.createProduct(data);
      socketServer.emit("movies", events.readProduct());
    } catch (error) {
      console.log(error);
      //emitir al cliente un mensaje de alerta
    }
  });
};