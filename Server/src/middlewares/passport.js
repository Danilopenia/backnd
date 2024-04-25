import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import UserDTO from "../dto/user.dto.js";
import dao from "../data/index.factory.js";
import errors from "../utils/errors/errors.js";
import env from "../utils/env.util.js"
import repository from "../repositories/users.rep.js";
const { users } = dao;
const { GOOGLE_ID, GOOGLE_CLIENT, GITHUB_ID, GITHUB_CLIENT, SECRET } = env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        //let one = await users.readByEmail(email);
        let one = await repository.readByEmail(email);
        //if (!one) {
          //
          if (one) {
            //
          //let data = req.body;
          //data.password = createHash(password);
          //data = new UserDTO(data);
          //let user = await users.create(data);
          //return done(null, user);
          return done(null, false,{statusCode:401});
          //

        } else {
          //return done(null, false, errors.register);
       //
        const user = await repository.create(req.body)
        return done(null, user)
       //
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await users.readByEmail(email);
        const verify = verifyHash(password, user.password)
        //if (user && verifyHash(password, user.password))
        //
        if(user?.verified && verify) {
          //
          //const token = createToken({ email, role: user.role });
          //token;
          req.token = createToken({_id: user._id, role: user.role});
          //
          return done(null, user);
        } else {
          return done(null, false, errors.auth);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "google",
  new GoogleStrategy(
    {
      passReqToCallback: true,
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await users.readByEmail(profile.id + "@gmail.com");
        if (!user) {
          user = {
            email: profile.id + "@gmail.com",
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          user = await users.create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "github",
  new GithubStrategy(
    {
      passReqToCallback: true,
      clientID: GITHUB_ID,
      clientSecret: GITHUB_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/github/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await users.readByEmail(profile.id + "@github.com");
        if (!user) {
          user = {
            email: profile.id + "@github.com",
            name: profile.username,
            photo: profile._json.avatar_url,
            password: createHash(profile.id),
          };
          user = await users.create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: SECRET,
    },
    async (payload, done) => {
      try {
        const user = await users.readByEmail(payload.email);
        if (user) {
          user.password = null;
          return done(null, user);
        } else {
          return done(null, false, errors.forbidden);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;