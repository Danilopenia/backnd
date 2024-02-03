import { Router } from "express";
//import users from "../../data/fs/users.fs.js";
import { users } from "../../data/mongo/manager.mongo.js";
const usersRouter = Router()

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.create(data);
    
      return res.json({
        statusCode: 201,
        response,
      });
  } catch (error) {
  return next(error)

  }
});

usersRouter.get("/",async(req,res, next)=>{
    try {
        const all = await users.read();
          return res.json({
            statusCode: 200,
            response: all,
          });
      } catch (error) {
       return next(error)
      }
})
usersRouter.get("/:uid",async(req,res, next)=>{
    try {
        const { uid } = req.params;
        const one = await users.readOne(uid);
          return res.json({
            statusCode: 404,
            message: one,
          });
      } catch (error) {
        return next(error)
      }
});
//usersRouter.put("/:uid"),async(req,res,next)=>{})
usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid, quantity } = req.params;
    const response = await users.soldticket(quantity, uid);
    if (typeof response === "number") {
      return res.json({
        statusCode: 200,
        response: "capacity available: " + response,
      });
    } else if (response === "There isn't any product") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 400,
        message: response,
      });
    }
  } catch (error) {
    return next (error)
  }
});
usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const opt = { new: true };
    const one = await this.users.update(id, data, opt);
    if (!one) {
      return res.json({
        statusCode: 200,
        message: "there isnt product",
      });
    } else {
      return res.json({
        statusCode: 200,
        one,
      });
    }
  } catch (error) {
    return next(error);
  }
});
//usersRouter.delete("/:uid",async,(req,res,next)=>{})
usersRouter.delete("/:uid", async (req, res, next) => {
  try {
      const { uid } = req.params;
      const one = await users.destroy(uid);
      if (!one) {
        return res.json({
          statusCode: 200,
          message: "there isnt product",
        });
      }else {
        return res.json({
          statusCode: 200,
          one,
        });
      }
    } catch (error) {
      return next(error)
      }
    });

export default usersRouter;