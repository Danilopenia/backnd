function propsOrdersUtils(data) {
    const { title, price } = data;
    if (!title || !price) {
      const error = new Error("title & price are required");
      error.statusCode = 404;
      throw error;
    }
  }
  
  export default propsOrdersUtils;