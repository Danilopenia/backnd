import propsProductsUtils from "../utils/props.Products.utils.js";

function propsProducts(req, res, next) {
/*   const { name, place } = req.body;
  if (!name || !place) {
    const error = new Error(`name & place are required`);
    error.statusCode = 404;
    throw error;
  } else {
    return next();
  } */
  try {
    propsProductsUtils(req.body)
    return next()
  } catch (error) {
    return next(error)
  }
}

export default propsProducts;