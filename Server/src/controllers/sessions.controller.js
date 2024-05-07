class SessionsController {
    register = async (req, res, next) => {
      try {
        return res.success201("Registered!");
      } catch (error) {
        return next(error);
      }
    };
    login = async (req, res, next) => {
      try {
        return res
          .cookie("token", req.token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            //httpOnly: true,              //////SE COMENTO PORQUE NO DEJA BORRAR LA COOKIE PARA EL SIGNOUT
          })
          .success200("Logged in!");
      } catch (error) {
        return next(error);
      }
    };
    google = async (req, res, next) => {
      try {
        return res.success200("Logged in with Google!");
      } catch (error) {
        return next(error);
      }
    };
    github = async (req, res, next) => {
      try {
        return res.success200("Logged in with Github!");
      } catch (error) {
        return next(error);
      }
    };
    me = async (req, res, next) => {
      try {
        const user = {
          email: req.user.email,
          role: req.user.role,
          photo: req.user.photo,
        };
        return res.success200(user);
      } catch (error) {
        return next(error);
      }
    };
    signout = async (req, res, next) => {
      try {
        // Borra la cookie "token"
        res.clearCookie("token");
        
        // Envía una respuesta al cliente indicando que se ha cerrado la sesión correctamente
        res.status(200).json({ message: "Signed out!" });
      } catch (error) {
        // Si hay un error, pasa al siguiente middleware de manejo de errores
        return next(error);
      }
    };
    badauth = (req, res, next) => {
      try {
        return res.error401();
      } catch (error) {
        return next(error);
      }
    };
  }
  
  export default SessionsController;
  const controller = new SessionsController();
  const { register, login, google, github, me, signout, badauth } = controller;
  export { register, login, google, github, me, signout, badauth };