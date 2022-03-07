var express = require("express");
var router = express.Router();

const SupportChats = require("../models/supportChats");
const updateChatStatus = (id) => {
  return new Promise(async (resolve, reject) => {
    await SupportChats.findOneAndUpdate(
      { _id: id },
      {
        seen: true,
      }
    );
    resolve(true);
  });
};
router.post("/mark-as-seen", async function (req, res) {
  JSON.parse(req.body.chatIds).map(async (chatId) => {
    await updateChatStatus(chatId);
  });
  res.json({});
});
module.exports = router;
