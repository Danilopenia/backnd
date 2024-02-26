import { Router } from "express";
import usersRouter from "./users.router.api.js";
import productsRouter from "./products.router.api.js";
import ordersRouter from "./orders.router.api.js";
import cookiesRouter from "./cookies.router.api.js";
import sessionRouter from "./sessions.router.api.js";


const apiRouter = Router()

apiRouter.use("/users", usersRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/orders", ordersRouter)
//  apiRouter.use("/cookies", cookiesRouter)
apiRouter.use("/sessions", sessionRouter)

export default apiRouter