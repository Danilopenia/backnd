import { Router } from "express";

import users from "../../data/fs/users.fs.js"

const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
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
  
  }
});


 //GETUSERS
 usersRouter.get("/", async (req, res) => {
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

  }
});
//GETUSERBYID
usersRouter.get("/", async (req, res) => {
  try {
    const { oid } = req.params;
    const one = await users.getOrderById(oid);
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
  
  }
});

  //DELETEUSER
  usersRouter.delete("/uid", async (req, res) => {
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
    
    }
  });

  
usersRouter.use("/profile", (req, res, next)=>{
  try {
    const one = users.getUser("daee422ee0199c15f5ab4884");
    console.log(one);
    return res.render("profile", { one });
  } catch (error) {
    next(error)
  }
})

export default usersRouter;
