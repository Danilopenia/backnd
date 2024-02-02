import { Router } from "express";
import usersRouter from "./users.router.api.js";
import productsRouter from "./products.router.api.js";



const apiRouter = Router()
apiRouter.use("/users", usersRouter)
apiRouter.use("/products", productsRouter)

export default apiRouter