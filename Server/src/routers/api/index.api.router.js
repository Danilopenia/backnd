
import CustomRouter from "../CustomRouter.js";
import usersRouter from "./users.router.api.js";
import productsRouter from "./products.router.api.js";
import ordersRouter from "./orders.router.api.js";
import sessionsRouter from "./sessions.router.api.js";
import commentsRouter from "./comments.router.api.js";
//import authRouter from "./auth.router.api.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/products", productsRouter);
    this.use("/orders", ordersRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/comments", commentsRouter);
    //this.use("/auth", authRouter);
    }
  }

const apiRouter = new SessionsRouter();
export default apiRouter.getRouter();

