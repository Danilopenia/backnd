class ProductManager {
    static #products = [];
  
    id;
    title;
    poster;
    price;
    stock;
  
    create(data) {
      const propsList = ["title", "poster", "price", "stock"];
      const keyList = Object.keys(data);
  
      const missingProps = [];
  
      for (let i = 0; i < propsList.length; i++) {
        !propsList.includes(keyList[i]) ? missingProps.push(propsList[i]) : null;
      }
  
      if (missingProps.length) {
        console.log(`Propiedades faltantes: ${missingProps.join(" ")}`);
      } else {
        const id =
          ProductManager.#products[ProductManager.#products.length - 1]?.id + 1 ||
          1;
  
        ProductManager.#products.push({ id, ...data });
      }
    }
  
    read() {
      return ProductManager.#products;
    }
  
    readOne(id) {
      return ProductManager.#products.find((el) => el.id == id);
    }
  }
  removeProductById(id) 
    try {
      let one = this.Products.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any product with id=" + id);
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
  
  const ProdManager = new ProductManager();
  
  ProdManager.create({
    title: "el mundo de tomas 1 ",
    photo: "https://i.pravatar.cc/300",
    price: 200,
    stock: 100,
  });
  
  console.log(ProdManager.readOne(1));
  
  ProdManager.create({
    title: "el mundo de tomas 2",
    poster: "https://i.pravatar.cc/300",
    price: 200,
  });
  
  console.log(ProdManager.read());