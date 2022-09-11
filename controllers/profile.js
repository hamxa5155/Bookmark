const User = require("../models/user");
const bcrypt = require("bcryptjs");
const user = require("../models/user");

module.exports = (app, authRequired) => {
  app.get("/user", authRequired, (req, res) => {
    res.json(req.user);
  });

  // Searching user based on email
  // app.post('/user-email', authRequired, (req, res) => {
  //     User.findOne({ email: req.body.email }, (err, res) => {
  //         if (user) {
  //             res.json(user);
  //         } else {
  //             res.json(null);
  //         }
  //     });
  // });

  app.post("/edit-profile", authRequired, async (req, res) => {
    User.findOne({ _id: req.user.id }, async (err, existingUser) => {
      req.user.firstName = req.body.firstName || "";
      req.user.lastName = req.body.lastName || "";
      req.user.university = req.body.university || "";
      req.user.graduation_year = req.body.graduation_year || "";
      req.user.major = req.body.major || "";
      req.user.school_email = req.body.school_email || "";
      req.user.personal_email = req.body.personal_email || "";
      req.user.courses = req.body.courses || "";
      req.user.topics = req.body.topics || "";
      req.user.services = req.body.services || "";
      req.user.billing_name = req.body.billing_name || "";
      req.user.billing_address = req.body.billing_address || "";
      await req.user.save();
      res.json({ isChangeSuccess: true });
    });
  });

  app.post("/change-email", authRequired, async (req, res) => {
    User.findOne({ email: req.body.newEmail }, async (err, existingUser) => {
      if (existingUser) {
        res.json({ isChangeSuccess: false });
      } else {
        req.user.email = req.body.newEmail;
        await req.user.save();
        res.json({ isChangeSuccess: true });
      }
    });
  });

  app.post("/change-password", authRequired, async (req, res) => {
    bcrypt.compare(req.body.newPassword, req.user.password, (err, result) => {
      if (result) {
        res.json({ isChangeSuccess: false });
      } else {
        bcrypt.genSalt((err, salt) => {
          bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
            req.user.password = hash;
            req.user.save((err) => {
              res.json({ isChangeSuccess: true });
            });
          });
        });
      }
    });
  });

  app.post("/change-phone", authRequired, async (req, res) => {
    if (req.user.phone === req.body.newPhone) {
      res.json({ isChangeSuccess: false });
    } else {
      req.user.phone = req.body.newPhone;
      await req.user.save();
      res.json({ isChangeSuccess: true });
    }
  });

  // app.patch("/Follo-wing", async (req, res) => {
  //   console.log("req.body following===???", req.body);

  //   let following = await User.findOneAndUpdate(

  //     { _id: req.body.following_id },
  //     {
  //       $push: {
  //         followers: req.body.follower_id,
  //       },
  //     },
  //     { new: true }

  //   );
  //   console.log("following===", following);

  //   let follower = await User.findOneAndUpdate(
  //     { _id: req.body.follower_id },
  //     {
  //       $push: {
  //         following: req.body.following_id,
  //       },
  //     },
  //     { new: true }
  //   );
  //   console.log("follower", follower);
  //   console.log("following", following);
  // });
  app.patch("/Follo-wing", async (req, res) => {
    try {
      console.log("req.body following===???", req.body);
      let follower = await User.find({
        _id: req.body.follower_id,
        following: req.body.following_id,
      });

      if (follower.length > 0) {
        console.log("user already following");
      } else {
        console.log("add user to following");
        await User.findOneAndUpdate(
          { _id: req.body.follower_id },
          {
            $push: {
              following: req.body.following_id,
            },
          },
          { new: true }
        );
        res.json({ success: { message: " You  follows this user" } });
      }
      let following = await User.find({
        _id: req.body.following_id,
        followers: req.body.follower_id,
      });
      if (following.length > 0) {
        res.json({ error: { message: " You already follows this user" } });
        console.log("user already follows");
      } else {
        console.log("add user to followers");
        await User.findOneAndUpdate(
          { _id: req.body.following_id },
          {
            $push: {
              followers: req.body.follower_id,
              notification: {
                follower: req.body.follower_id,
                show: false,
              },
            },
          },
          // {
          //   $push: {
          //     notification: req.body.follower_id,
          //   },
          // },
          { new: true }
        );
        res.json({ success: { message: " You2  follows this user" } });
      }
    } catch (error) {
      console.log("user error ", error);
    }
  });

  app.patch("/unFollow", async (req, res) => {
    try {
      console.log("req.body unfollowing===???", req.body);
      let follower = await User.find({
        _id: req.body.follower_id,
        following: req.body.following_id,
      });
      console.log("  follower", follower);
      if (follower) {
        await User.findOneAndUpdate(
          { _id: req.body.follower_id },
          {
            $pull: {
              following: req.body.following_id,
            },
          },
          { new: true }
        );
        res.json({ success: { message: " You  unfollow this user" } });
      }
      // remove follower:id from following(whom u unfollows) user data
      let following = await User.find({
        _id: req.body.following_id,
        followers: req.body.follower_id,
      });
      console.log("hamza my follower?", following);

      if (following) {
        await User.findOneAndUpdate(
          { _id: req.body.following_id },
          {
            $pull: {
              followers: req.body.follower_id,
            },
          },
          { new: true }
        );
        res.json({ success: { message: " You  unfollow this user" } });
      }
    } catch (error) {
      console.log("user error ", error);
    }
  });

  app.put("/edit-permissions", async (req, res) => {
    console.log("oermission apiii", req.body.permissions);

    let Permission = await User.findOne({ email: req.body.currentUser });
    await Permission.update({
      Permissions: req.body.permissions,
      new: true,
    });
  });
  app.get("/get-users", async (req, res) => {
    user
      .find()
      .then((data) => {
        console.log("All users??", data);
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        });
      });
  });
};
