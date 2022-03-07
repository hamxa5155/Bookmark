const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/* All Schema */

const supportChatsSchema = new Schema({
  chat_user_id: {
    type: String,
    ref: "chat_users",
    required: true,
  },
  user_id: {
    type: String,
    // ref: "registerUser",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  sender: {
    type: String, //admin | user
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_on: {
    type: Date,
    required: true,
  },
});

module.exports = SupportChats = mongoose.model(
  "support_chats",
  supportChatsSchema
);
