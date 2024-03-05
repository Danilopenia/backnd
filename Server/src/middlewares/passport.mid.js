import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { users } from "../data/mongo/manager.mongo.js";

passport.use(
  "register",
  new localStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await users.readByEmail(email); //puedo poner email en ves de req.body.email
        if (!one) {
          let data = req.body;
          data.password = createHash(password);
          let user = await users.create(data);
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new localStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await users.readByEmail(email);
        if (user) {
          const verify = verifyHash(password, user.password);
          if (verify) {
            req.session.email = email;
            req.session.role = user.role;
            return done(null, user);
          } else {
            return done(null, false);
          }
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
