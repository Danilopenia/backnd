import { Router } from "express";
import users from "../../data/fs/users.fs.js";
import propsUsers from "../../middlewares/propsUsers.mid.js";

const usersRouter = Router()

usersRouter.post("/",propsUsers , async (req, res, next) => {
  try {
    const data = req.body;
    const response = await users.createUser(data);
    
      return res.json({
        statusCode: 201,
        message: "created",
        response,
      });
  } catch (error) {
  return next(error)

  }
});

usersRouter.post("/",async(req,res, next)=>{
    try {
        const data = req.body;
        const response = await users.createUser(data);
        if (response === "Please, insert name & lastname") {
          return res.json({
            statusCode: 400,
            message: response,
          });
        } else {
          return res.json({
            statusCode: 201,
            message: "created",
            response,
          });
        }
      } catch (error) {
       return next (error)
      }
    });
usersRouter.get("/",async(req,res, next)=>{
    try {
        const all = await users.getUser();
        if (Array.isArray(all)) {
          return res.json({
            statusCode: 200,
            response: all,
          });
        } else {
          return res.json({
            statusCode: 404,
            message: all,
          });
        }
      } catch (error) {
       return next(error)
      }
})
usersRouter.get("/:eid",async(req,res, next)=>{
    try {
        const { uid } = req.params;
        const one = await users.getUserById(uid);
        if (typeof one === "string") {
          return res.json({
            statusCode: 404,
            message: one,
          });
        } else {
          return res.json({
            statusCode: 200,
            response: one,
          });
        }
      } catch (error) {
        return next(error)
      }
})
usersRouter.delete("/:eid",async(req,res, next)=>{
    try {
        const { uid } = req.params;
        const response = await users.removeUserById(uid);
        if (response === "There isn't any user") {
          return res.json({
            statusCode: 404,
            message: response,
          });
        } else {
          return res.json({
            statusCode: 200,
            response,
          });
        }
      } catch (error) {
      return next(error)
      }
})


export default usersRouter;