import passport from "./passport.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";
import winstonLog from "../utils/logger/index.js";

const passCallBackMid = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      winstonLog.INFO({ error, user, info });
      if (error) {
        return next(error);
      }
      if (!user) {
          CustomError.new(errors.callBackPass(info.message || info.toString(), info.statusCode || 401))
        }
      req.user = user;
      return next();
    })(req, res, next);
  };
};
export default passCallBackMid