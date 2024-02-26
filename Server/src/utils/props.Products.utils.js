function propsProductsUtils(data) {
    const { title, price } = data;
    if (!title || !price) {
      const error = new Error("name & lastname are required");
      error.statusCode = 404;
      throw error;
    }
  }
  
  export default propsProductsUtils;