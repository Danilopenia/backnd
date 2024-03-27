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

      const options = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort:{name: 1}
      }
      const filter = {}
      if (req.query.email) {
        filter.email = new RegExp(req.query.email.trim(), 'i')
      }
      if (req.query.email==="desc") {
        options.sort.name = 1
      }else{
        options.sort.name = -1
      }
        const all = await users.read({filter, options});
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
            statusCode: 200,
            response: one,
          });
      } catch (error) {
        return next(error)
      }
});
usersRouter.get('/:email', async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await users.readByEmail(email);

    if (user) {
      return res.json({
        statusCode: 200,
        response: user,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: 'Usuario no encontrado',
      });
    }
  } catch (error) {
    return next(error);
  }
});
usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await users.update(uid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

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