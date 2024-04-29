import { Router } from "express";
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