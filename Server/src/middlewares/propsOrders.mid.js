//import propsOrderUtils from "../utils/propsOrders.utils.js";

function propsOrders(req, res, next) {
/*   const { name, place } = req.body;
  if (!name || !place) {
    const error = new Error(`name & place are required`);
    error.statusCode = 404;
    throw error;
  } else {
    return next();
  } */
  try {
    propsOrdersUtils(req.body)
    return next()
  } catch (error) {
    return next(error)
  }
}

export default propsOrders;