const express = require("express"),
  router = express.Router();

const SupportChats = require("../models/supportChats");

router.get("/fetch-chats", async (req, res) => {
  console.log("fetch chat");
  SupportChats.find({ chat_user_id: req.query.user_id })
    .populate("chat_user_id")
    // .populate("chat_user_id user_id")
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

module.exports = router;
// "socket.io": "^4.2.0",