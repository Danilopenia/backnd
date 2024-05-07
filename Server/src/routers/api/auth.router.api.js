/*import { Router } from "express";
import {
  register,
  login,
  signout,
  verifyAccount,
} from "../../controllers/auth.controller.js";
import passCallback from "../../middlewares/passCallback.js";

const authrouter = Router();

authrouter.post("/register", passCallback("register"), register);
authrouter.post("/login", passCallback("login"), login);
authrouter.post("/signout", passCallback("jwt"), signout);
authrouter.post("/", verifyAccount);

export default authrouter;




import { Router } from "express";
import { register, login, signout, verifyAccount } from "../../controllers/auth.controller.js";
import passCallback from "../../middlewares/passCallback.js";

const authrouter = Router();

authrouter.post("/register", passCallback("register"), register);
authrouter.post("/login", passCallback("login"), login);
authrouter.post("/signout", passCallback("jwt"), signout);
authrouter.post("/", verifyAccount);

export default authrouter;
*/


/*const authrouter = Router();

authrouter.post("/register", passCallback("register"), register);
authrouter.post("/login", passCallback("login"), login);
authrouter.post("/signout", passCallback("jwt"), signout);
authrouter.post("/", verifyAccount);

export default authrouter;*/

import CustomRouter from "../CustomRouter.js";
import {
  register,
  login,
  signout,
  verifyAccount,
} from "../../controllers/auth.controller.js";
import passCallback from "../../middlewares/passCallback.js";


class AuthRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passCallback("register"), register);
    this.create("/login", ["PUBLIC"], passCallback("login"), login); 
    this.create("/signout", ["USER"], signout);
    this.create("/", ["PUBLIC"], verifyAccount);
  }
}

const authRouter = new AuthRouter();
export default authRouter.getRouter();