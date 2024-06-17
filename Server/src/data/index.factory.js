import argsUtil from "../utils/args.util.js";
import dbConnection from "../utils/db.utils.js"
import winston from "../utils/logger/winston.utils.js";




const environment = argsUtil.env;
//la variable puede ser el ambiente o directamente la persistencia con la que tengo que trabajar
//va a depender de una variable de entorno o del argumento que se pase

let dao = {};

switch (environment) {
  case "test":
    //vamos a usar MEMORY
    winston.INFO("MEMORY CONNECTED");
    const { default: productsMemory } = await import("./memory/products.memory.js")
    dao = { products: productsMemory }
    break;
  case "dev":
    //vamos a usar FS
   
    const { default: productsFs } = await import("./fs/products.fs.js")
    const { default: usersFs } = await import("./fs/users.fs.js")
    const { default: ordersFs } = await import("./fs/orders.fs.js")
    dao = { products: productsFs, users: usersFs, orders: ordersFs}
    break;
  case "prod":
    //vamos a usar MONGO
    //aca es necesario configurar la conexión de mongo
    dbConnection()
      .then(() => winston.INFO("MONGO CONNECTED"))
    const { default: productsMongo } = await import("./mongo/products.mongo.js")
    const { default: usersMongo } = await import("./mongo/users.mongo.js")
    const { default: ordersMongo } = await import("./mongo/orders.mongo.js")
    dao = { products: productsMongo, users: usersMongo, orders: ordersMongo}
    break;
  default:
    break;
}

export default dao;