const SupportChats = require("../../models/supportChats");
const ChatUsers = require("../../models/chatUsers");
const mongoose = require("mongoose");
const StoreChats = (params) => {
  return new Promise(async (resolve, reject) => {
    let user = {};
    if (params.sender === "user") {
      user = await ChatUsers.findOne({ session_id: params.user_id });
      if (user === null) {
        const newChatUser = new ChatUsers({
          user_id:
            params.is_loggedin === "yes"
              ? params.user_id
              : mongoose.Types.ObjectId(),
          session_id: params.user_id,
          socket_id: params.socket_id,
          updated_on: Date.now(),
        });
        user = await newChatUser.save();
      } else {
        await ChatUsers.findOneAndUpdate(
          { session_id: params.session_id },
          {
            socket_id: params.socket_id,
            updated_on: Date.now(),
          }
        );
      }
    }
    const newSupportChat = new SupportChats({
      chat_user_id: params.sender === "user" ? user._id : params.chat_user_id,
      user_id:
        params.is_loggedin === "yes"
          ? params.user_id
          : mongoose.Types.ObjectId(),
      message: params.message,
      sender: params.sender,
      image: params.image,
      updated_on: Date.now(),
    });
    newSupportChat
      .save()
      .then((docs) => {
        console.log(docs);
        resolve(docs);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
module.exports = StoreChats;
