function propsProductsUtils(data) {
    const { title, price, category } = data;
    if (!title || !price || !category) {
      const error = new Error("title, price & category are required");
      error.statusCode = 404;
      throw error;
    }
  }
  
  export default propsProductsUtils;