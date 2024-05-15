import winstonLog from "../utils/logger/index.js";
class OrderManager {
  static #orders = [];

  id;
  title;
  photo;
  price;
  stock;

  create(data) {
    const propsList = ["title", "photo", "price", "stock"];
    const keyList = Object.keys(data);

    const missingProps = [];

    for (let i = 0; i < propsList.length; i++) {
      !propsList.includes(keyList[i]) ? missingProps.push(propsList[i]) : null;
    }

    if (missingProps.length) {
      winstonLog.INFO(`Propiedades faltantes: ${missingProps.join(" ")}`);
    } else {
      const id =
        OrderManager.#orders[OrderManager.#orders.length - 1]?.id + 1 ||
        1;

      OrderManager.#orders.push({ id, ...data });
    }
  }

  read() {
    return OrderManager.#orders;
  }

  readOne(id) {
    return OrderManager.#orders.find((el) => el.id == id);
  }
}
removeOrderById(id) 
  try {
    let one = this.Orders.find((each) => each.id === id);
    if (!one) {
      throw new Error("There isn't any order with id=" + id);
    } else {
      this.products = this.orders.filter((each) => each.id !== id);
      const jsonData = JSON.stringify(this.orders, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      winstonLog.INFO("deleted " + id);
      return id;
    }
  } catch (error) {
    winstonLog.ERROR(error.message);
    return error.message;
  }

const OrdManager = new OrderManager();

OrdManager.create({
  title: "el mundo de tomas 1 ",
  photo: "https://i.pravatar.cc/300",
  price: 200,
  stock: 100,
});

winstonLog.INFO(OrdManager.readOne(1));

OrdManager.create({
  title: "el mundo de tomas 2",
  photo: "https://i.pravatar.cc/300",
  price: 200,
});

winstonLog.INFO(OrdManager.read());