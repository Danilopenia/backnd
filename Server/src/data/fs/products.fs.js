import fs from "fs"
import crypto from "crypto"

class ProductsManager{
    static #products
   static #perGain = 0.3;
   static #totalGain = 0;

   
    init() {
      try{
        const exists = fs.existsSync(this.path);
        if (!exists) {
          const data = JSON.stringify([],null,2 );
          fs.writeFileSync(this.path, data);
        } else {
          this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        }
      }catch(error){
        return error.message;
      }
      } constructor(path){
        this.path = path;
        this.products = [];
        this.init();
    }
      async createProduct(data ) {
        try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title:data.title,
        poster: data.poster || "https://i.postimg.cc/HxdvTwqJ/events.jpg",
        price: data.price || 10,
        stock: data.stock || 50,
        date: data.date || new Date(),
      }; 
      this.products.push(product);
      const jsonData = JSON.stringify(this.products,null,2)
        await fs.promises.writeFile(this.path, jsonData);
        console.log("create"+ product.id);
        return product.id;
    }catch(error){
      console.log(error.message);
      return error.message
    }}
getProducts() {
    try {
    
     if (this.products.length===0) {
       throw new Error("they arent products");
     }else{
       return this.products;
     }
     
    } catch (error) {
     return error.message
    }
   }

 getProductById(id) {
try {
  const one = this.products.find((each) => each.id === id);
   if (!one) { 
    throw new Error ("ERROR the product with id "+id+" doesnt exist");
   }else{
    return one;
   }
  
  } catch (error) {
  return error.message;
}
}

async removeProductById(id) {
  try {
    let one = this.products.find((each) => each.id === id);
    if (!one) {
      throw new Error("There isn't any product");
    } else {
      this.products = this.products.filter((each) => each.id !== id);
      const jsonData = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
      console.log("deleted " + id);
      return id;
    }
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
}

  
async soldticket(quantity, pid) {
  try {
    const one = this.getProductById(pid);
    if (one) {
      if (one.capacity >= quantity) {
        one.capacity = one.capacity - quantity;
        ProductsManager.#totalGain =
        ProductsManager.#totalGain +
          one.price * quantity * ProductsManager.#perGain;
        const jsonData = JSON.stringify(this.products, null, 2);
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



const products = new ProductsManager("./src/data/fs/files/products.json");
export default products
