const User = require("../models/user");
const TempUser = require("../models/tempUser");
const bcrypt = require("bcryptjs");
const randomize = require("randomatic");
const emailDispatcher = require("../aws/emailDispatcher");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const saltRounds = 10;
const request = require("request");

module.exports = (app) => {
  app.post("/signup", async (req, res) => {
    if (req.session.newUserId) {
      await TempUser.findByIdAndDelete(req.session.newUserId);
      delete req.session.newUserId;
    }
    await User.findOne({ email: req.body.email }, async (err, user) => {
      // Only if email isn't associated with an existing user will a new user be created
      if (user) {
        res.json({ isEmailAvailable: false });
      } else {
        console.log("usre data", req.body.email);
        var options = {
          method: "POST",
          url: "https://us14.api.mailchimp.com/3.0/lists/f2bdbaf80e/members",
          headers: {
            "cache-control": "no-cache",
            Authorization:
              "Basic YW55c3RyaW5nOjg5MWY1NDA4ODc3NDcxYThhMzgxNzZjMmI0YzQzMmQyLXVzMTQ=",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email_address: req.body.email,
            status: "subscribed",
          }),
        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log("responser", response.body);
        });

        const passwordHash = await new Promise((resolve, reject) => {
          bcrypt.genSalt(function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
              resolve(hash);
            });
          });
        });

        const code = randomize("A0", 5);

        const newUser = new TempUser({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: passwordHash,
          email: req.body.email,
          phone: req.body.phone,
          dob: req.body.dob,
          start: req.body.start,

          code,
        });

        //emailDispatcher(newUser.email, 'SIGNUP', code);
        console.log("::CODE::", code);
        req.session.newUserId = newUser.id;

        newUser.save((err) => {
          setTimeout(async () => {
            await TempUser.findByIdAndDelete(req.session.newUserId);
          }, 30 * 60 * 1000); // Signup expires in 30 minutes
        });

        res.json({ isEmailAvailable: true });
      }
    });
  });

  app.get("/signup-status", (req, res) => {
    if (req.session.newUserId) {
      TempUser.findById(req.session.newUserId, (err, tempUser) => {
        if (tempUser) {
          res.json({ isInfoFilled: true });
        } else {
          delete req.session.newUserId;
          res.json({ signupError: "Signup session has timed out" });
        }
      });
    } else {
      res.json({ isInfoFilled: false });
    }
  });

  app.post("/signup-confirm", (req, res) => {
    if (req.session.newUserId) {
      TempUser.findById(req.session.newUserId, (err, tempUser) => {
        if (tempUser && tempUser.code === req.body.code) {
          const newUser = new User({
            firstName: tempUser.firstName,
            lastName: tempUser.lastName,
            email: tempUser.email,
            dob: tempUser.dob,
            start: tempUser.start,
            phone: tempUser.phone,
            password: tempUser.password,
          });

          newUser.save(async (err) => {
            await TempUser.findByIdAndDelete(req.session.newUserId);
            delete req.session.newUserId;
          });

          res.json({ isSignupSuccessful: true });
        } else if (tempUser) {
          res.json({ signupError: "Incorrect signup code" });
        } else {
          res.json({ signupError: "Signup session has timed out" });
        }
      });
    } else {
      res.json({ signupError: "Signup session has timed out" });
    }
  });

  app.post("/forgot-password", (req, res) => {
    const { email } = req.body;
    console.log("email", email);

    User.findOne({ email: email })
      .exec()
      .then(async (authObj) => {
        if (authObj) {
          console.log("Object Found", authObj);
          const token = jwt.sign(
            {
              _id: authObj._id,
              email: authObj.email,
              firstName: authObj.firstname,
              lastName: authObj.lastname,
            },
            "adminsecret",
            { expiresIn: "60d" }
          );
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "moversconnectionsalert@gmail.com",
              pass: "WSF002021",
            },
          });

          var mailOptions = {
            from: "moversconnectionsalert@gmail.com",
            to: `${email}`,
            subject: "Account activation link",
            html: `
                                  <h2>please click on the following link to activate your account</h2>
                                  <a href="http://localhost:3000/resetpasword/${token}">click on the link to reset password</a>
                                  `,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

          res.status(201).json({
            message: "please check your email for account activation",
          });
        } else {
          res.status(403).json({
            message: "Email Not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Email Not found",
          error: err,
        });
      });
  });

  app.post("/change-password", (req, res) => {
    console.log("changePassword ahamxa??", req.body);
    const decodedToken = jwt.verify(req.body.token, "adminsecret");
    console.log("decodedToken", decodedToken.user.email);
    const password = req.body.newPassword;
    User.findOne({ email: decodedToken.user.email })
      .exec()
      .then(async (foundObject) => {
        console.log("updatePassword", foundObject.password);
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            foundObject.password = hash;
            foundObject
              .save()
              .then(() => {
                res.status(201).json({
                  message: "password updated successfully",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      })
      .catch((err) => {
        console.log("Error Occur", err.message);
        res.status(500).json({
          error: err,
          message: "internal server error",
        });
      });
  });
};
