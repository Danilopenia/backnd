import propsUsersUtils from "../utils/propsUsers.utils.js";

function propsUsers(req, res, next) {
/*   const { name, place } = req.body;
  if (!name || !place) {
    const error = new Error(`name & place are required`);
    error.statusCode = 404;
    throw error;
  } else {
    return next();
  } */
  try {
    propsUsersUtils(req.body)
    return next()
  } catch (error) {
    return next(error)
  }
}

export default propsUsers;