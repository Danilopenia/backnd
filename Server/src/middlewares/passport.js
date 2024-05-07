/*import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { verifyHash, createHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import UserDTO from "../dto/user.dto.js";
import dao from "../data/index.factory.js";
import errors from "../utils/errors/errors.js";
import env from "../utils/env.util.js"
import repository from "../repositories/users.rep.js";
//const { users } = dao;
const { GOOGLE_ID, GOOGLE_CLIENT, GITHUB_ID, GITHUB_CLIENT, SECRET } = 
process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await repository.readByEmail(email);
        
        if (one) {
          return done(null, false, { statusCode: 401 });}
         //  if (one) {
            //
            else{
              const user = await repository.create(req.body);//(req.body)
              console.log(user);
              return done(null, user);}
           
          /*let data = req.body;
          data.password = createHash(password);
          data = new UserDTO(data);
          let user = await users.create(data);
          return done(null, user);
          //return done(null, false,{statusCode:401});
          //

        } else {
          //return done(null, false, errors.register);
       //
        return done(null, false, errors.register)
       //
        }*/
      /*
      
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
        const user = await repository.readByEmail(email);
        const verify = verifyHash(password, user.password);
        if (user?.verified && verify) {
          req.token = createToken({ _id: user._id, role: user.role });
          return done(null, user);
        } else {
          return done(null, false, { statusCode: 401 });
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
        let user = await repository.readByEmail(profile.id + "@gmail.com");
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
        let user = await repository.readByEmail(profile.id + "@github.com");
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
    {secretOrKey: SECRET, //process.env.SECRET
      jwtFromRequest: ExtractJwt.fromExtractors([ (req) => req?.cookies["token"], ]),},
     
    async (payload, done) => {
      try {
        const user = await repository.readOne(payload._id);
        if (user) {
          //user.password = null;
          return done(null, user);
        } else {
          return done(null, false, {statusCode:403});//errors.forbidden
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;*/


import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import repository from "../repositories/users.rep.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await repository.readByEmail(email);
        if (one) {
          return done(null, false, { statusCode: 401 });
        } else {
          const user = await repository.create(req.body);
          console.log(user);
          return done(null, user);
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
        const user = await repository.readByEmail(email);
        const verify = verifyHash(password, user.password);
        if (user?.verified && verify) {
          req.token = createToken({ _id: user._id, role: user.role, email});
          return done(null, user);
        } else {
          return done(null, false, { statusCode: 401 });
        }
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
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
    },
    async (payload, done) => {
      try {
        const user = await repository.readOne(payload._id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false, { statusCode: 403 });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;