import { Router } from "express";

const sessionRouter = Router();

//login
sessionRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (email && password === "hola1234") {
      req.session.email = email;
      req.session.role = "user"
      return res.json({
        statusCode: 200,
        message: "logged in!",
        session: req.session,
      });
    }
    const error = new Error("bad auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
});
sessionRouter.post("/", async (req, res, next) => {
  try {
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        message: "session with email: " + req.session.email,
      });
    } else {
      const error = new Error("No auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});
/*
sessionRouter.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
});


*/
//signout
sessionRouter.post("/signout", async (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        message: "signed out",
      });
    } else {
      const error = new Error("No auth");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});
export default sessionRouter;
