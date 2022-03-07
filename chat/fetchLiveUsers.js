const express = require("express"),
  router = express.Router();
var mongoose = require("mongoose");
const ChatUsers = require("../models/chatUsers");
const SupportChats = require("../models/supportChats");

router.get("/fetch-live-users", async (req, res) => {
  let count = await ChatUsers.count({});
  let users = [];
  ChatUsers.find({})
    // .populate("user_id")
    .skip(parseInt(req.query.offset) || 0)
    .limit(parseInt(req.query.limit) || 10)
    .sort({ updated_on: -1 })
    .then(async (docs) => {
      let i = 0;
      for (const doc of docs) {
        users[i] = {
          ...doc,
          chats: await SupportChats.find({
            chat_user_id: doc._id,
            sender: "user",
            seen: false,
          }),
        };
        i++;
      }
    })
    .then(() => {
      res.json({ docs: users, count });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

module.exports = router;
