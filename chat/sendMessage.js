const express = require("express"),
  router = express.Router();

var socketApi = require("../socketApi");

router.post("/send-message", async (req, res) => {
  console.log("sen message")
  try {
    const { message, user_id, chat_user_id, session_id } = req.body;

    const docs = await socketApi.sendNotification({
      message,
      user_id,
      chat_user_id,
      session_id,
    });
    res.json(docs);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
