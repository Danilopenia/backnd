import CustomRouter from "../CustomRouter.js"
import usersRouter from "./users.router.api.js";
import ProductsRouter from "./products.router.api.js";
import ordersRouter from "./orders.router.api.js";
//import cookiesRouter from "./cookies.router.api.js";
import sessionRouter from "./sessions.router.api.js";

//import passCallBackMid from "../../middlewares/passCallBack.mid.js";
const product = new ProductsRouter()


export default class ApiRouter extends CustomRouter{
init(){
    this.router.use("/users", usersRouter)
    this.router.use("/products", product.getRouter())
    this.router.use("/orders", ordersRouter)
    this.router.use("/sessions", sessionRouter)
}
}
