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
        const all = await users.getUser();
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
        const one = await users.getUserById(uid);
          return res.json({
            statusCode: 404,
            message: one,
          });
      } catch (error) {
        return next(error)
      }
});
//usersRouter.put("/:uid"),async(req,res,next)=>{})
//usersRouter.delete("/:uid",async,(req,res,next)=>{})


export default usersRouter;