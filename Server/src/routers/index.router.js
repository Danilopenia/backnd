
import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.api.router.js";
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


/*import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.api.router.js";
import viewsRouter from "./views/index.view.js";
import { Router } from 'express'; // Importa el Router de express

class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", apiRouter);

    // Añade las nuevas rutas /simplex y /complex
    this.router.get("/simplex", (req, res, next) => {
      try {
        let total = 1;
        for (let i = 1; i < 100; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });

    this.router.get("/complex", (req, res, next) => {
      try {
        let total = 1;
        for (let i = 1; i < 1000000000; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });

    this.router.use("/", viewsRouter);

    this.router.use("/sms", async (req, res, next) => {
      try {
        await sendSms("+541130556904")
        return res.json({
          statusCode: 200,
          message: "enviado",
        })
      } catch (error) {
        return next(error)
      }
    })
    
  }
}

const router = new IndexRouter();
export default router.getRouter();*/
