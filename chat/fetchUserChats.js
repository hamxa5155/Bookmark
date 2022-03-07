const express = require("express"),
  router = express.Router();

const SupportChats = require("../models/supportChats");
const ChatUsers = require("../models/chatUsers");

router.get("/fetch-user-chats", async (req, res) => {
  const user = await ChatUsers.findOne({ session_id: req.query.session_id });
  if (user) {
    SupportChats.find({ chat_user_id: user._id })
      .populate("chat_user_id")
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ err });
      });
  } else {
    res.json([]);
  }
});

module.exports = router;
