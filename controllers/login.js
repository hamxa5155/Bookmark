const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = (app) => {
  app.use(passport.initialize()); // Checks req.session object created by express-session for passport.user
  app.use(passport.session()); // Uses req.session.passport.user to re-initialize req.user through deserializing

  // Called whenever passport.authenticate is called
  // Feeds result into authenticate function
  // If successful, the user is serialized with passport.serializeUser and added to req.session.passport
  passport.use(
    new LocalStrategy((username, password, cb) => {
      User.findOne({ email: username }, (err, user) => {
        if (err) {
          return cb(err); // (err, user)
        }
        if (user) {
          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          });
        } else {
          return cb(null, false);
        }
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  //
  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      if (err) {
        return cb(err);
      } else {
        return cb(null, user);
      }
    });
  });

  app.post("/login", (req, res, next) => {
    // console.log(req.body);

    // Attaches passport property to req.session
    // Attaches seralized user to req.session.passport.user and full user to req.user
    console.log("shfjashdjkshdjkashdjkshdjkahd");
    passport.authenticate("local", (err, user, info) => {
      if (!user) {
        console.log("user not found");

        res.json(null);
      } else {
        const token = jwt.sign({ user }, "adminsecret");
        console.log("token==", token);

        // res.status(200).send({ token, message: "Successfull Login" });
        // Establishes a login session assigning user to req.user
        req.login(user, (err) => {
          res.json({ user, token });
        });
      }
    })(req, res, next);
  });
};
