import passport from "passport";
import local from "passport-local";
import userService from "../models/userModel.js";
import GitHubStrategy from "passport-github2";
import jwt from "passport-jwt";
import { createHash, isValidatePassword } from "../../utils/utils.js";
import userRole from "../../utils/usersRole.js";


//instancias
const localStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["coderCookieToken"];
  }
  return token;
};

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        const { first_name, last_name, age } = req.body;
        const { role } = userRole(email);
        try {
          let user = await userService.findOne({ email });
          if (user) {
            console.log("El usuario ya existe");
           
            return done(null, false, { message: 'El usuario ya está registrado' });
          }

          if (
            !first_name ||
            !last_name ||
            !email ||
            !age ||
            !password ||
            !role
          ) {
            // Check if all required fields are present in the request body
            console.log("Faltan campos obligatorios");
            return done(null, false, { message: 'Faltan campos obligatorios' });
          }

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role,
          };
          let result = await userService.create(newUser);
          return done(null, result);
        } catch (error) {
          console.error("Error al obtener el usuario: ", error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userService.findOne({ email: username });
          if (!user) {
            return done(null, false);
          }

          if (!isValidatePassword(password, user)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "rociogaitan98.rg@gmail.com",
        clientSecret: "pkslnhxlaypnhqzs",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userService.findOne({ email: profile._json.email });
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 31,
              email: profile._json.email,
              password: "",
            };
            let result = await userService.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "coderhouse",
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userService.findById(id);
    done(null, user);
  });
};

//exports
export default initializePassport;