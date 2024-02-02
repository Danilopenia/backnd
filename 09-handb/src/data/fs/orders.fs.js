import fs from "fs"
import crypto from "crypto"

class OrderManager{
    static #orders
   static #perGain = 0.3;
   static #totalGain = 0;

   
    init() {
      try{
        const exists = fs.existsSync(this.path);
        if (!exists) {
          const data = JSON.stringify([],null,2 );
          fs.writeFileSync(this.path, data);
        } else {
          this.orders = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        }
      }catch(error){
        return error.message;
      }
      } constructor(path){
        this.path = path;
        this.orders = [];
        this.init();
    }
      async createOrder(data ) {
        try {
      const order = {
        id: crypto.randomBytes(12).toString("hex"),
        name:data.name,
        price: data.price || 10,
        poster: data.poster || "https://i.postimg.cc/HxdvTwqJ/events.jpg",
        stock: data.stock || 50,
        capacity: data.capacity || 50,
        date: data.date || new Date(),
      }; 
      this.orders.push(order);
      const jsonData = JSON.stringify(this.orders,null,2)
        await fs.promises.writeFile(this.path, jsonData);
        console.log("create"+ order.id);
        return order.id;
    }catch(error){
      console.log(error.message);
      return error.message
    }}
getOrders() {
    try {
    
     if (this.orders.length===0) {
       throw new Error("they arent orders");
     }else{
       return this.orders;
     }
     
    } catch (error) {
     return error.message
    }
   }

 getOrdersById(id) {
try {
  const one = this.orders.find((each) => each.id === id);
   if (!one) { 
    throw new Error ("ERROR the order with id "+id+" doesnt exist");
   }else{
    return one;
   }
  
  } catch (error) {
  return error.message;
}
}

async removeOrderById(id) {
  try {
    let one = this.orders.find((each) => each.id === id);
    if (!one) {
      throw new Error("There isn't any order");
    } else {
      this.orders = this.orders.filter((each) => each.id !== id);
      const jsonData = JSON.stringify(this.orders, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("deleted " + id);
      return id;
    }
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

  
async soldOrder(quantity, pid) {
  try {
    const one = this.getOrdersById(pid);
    if (one) {
      if (one.capacity >= quantity) {
        one.capacity = one.capacity - quantity;
        OrderManager.#totalGain =
        OrderManager.#totalGain +
          one.price * quantity * OrderManager.#perGain;
        const jsonData = JSON.stringify(this.orders, null, 2);
        await fs.promises.writeFile(this.path, jsonData);
        console.log("Capacity available " + one.capacity);
        return one.capacity;
      } else {
        throw new Error("There aren't stock");
      }
    } else {
      throw new Error("There isn't any product");
    }
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}
}


const orders = new OrderManager("./src/data/fs/files/orders.json");
export default orders
