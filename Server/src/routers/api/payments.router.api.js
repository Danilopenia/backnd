/*import { Router } from "express";
import checkoutController from "../../controllers/payments.controller.js";

const paymentsRouter = Router();

paymentsRouter.post("/checkout", checkoutController);

export default paymentsRouter;*/

import CustomRouter from "../CustomRouter.js";
import checkoutController from "../../controllers/payments.controller.js"

class PaymentsRouter extends CustomRouter {
    init() {
        this.create("/checkout", ["USER"], checkoutController);
    }
}

const paymentsRouter = new PaymentsRouter();
export default paymentsRouter.getRouter();