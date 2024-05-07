/*import { Router } from "express";
import apiRouter from "./api/index.api.js";
import sendSms from "../utils/sendSms.utils.js";
import ViewsRouter from "./views/index.view.js";
const router = Router();

router.use("/api", apiRouter);
router.use("/views", ViewsRouter)


router.get("/sms",async(req,res, next)=>{
    try {
        await sendSms("+541130556904")
        return res.json({
            statusCode:200,
            message:"enviado",
        })
    } catch (error) {
        return next (error)
    }
})

export default router;
*/


import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.view.js";

class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", apiRouter);
    this.router.use("/", viewsRouter);
    this.router.use("/sms", async(req,res, next)=>{
      try {
          await sendSms("+541130556904")
          return res.json({
              statusCode:200,
              message:"enviado",
          })
      } catch (error) {
          return next (error)
      }
  })
  }
}

const router = new IndexRouter();
export default router.getRouter();


/*
import { Router } from "express";
import apiRouter from "./api/index.router.api.js";
import sendSms from "../utils/sendSms.utils.js";

const router = Router();
router.use("/api", apiRouter);
router.get("/sms", async (req, res, next) => {
  try {
    await sendSms("+543412596847");
    return res.json({
      statusCode: 200,
      message: "enviado",
    });
  } catch (error) {
    return next(error);
  }
}); 

export default router;*/