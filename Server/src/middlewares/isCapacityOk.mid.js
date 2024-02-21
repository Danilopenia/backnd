import products from "../data/fs/products.fs.js";

export default (req, res, next) => {
  try {
    const { pid, quantity } = req.params;
    const one = products.getProductById(pid);
    if (one.capacity >= quantity) {
      return next()
    } else {
      const error = new Error("there aren't capacity");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error)
  }
}