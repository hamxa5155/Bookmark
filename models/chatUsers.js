const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

/* All Schema */

const chatUsersSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    // ref: "registerUser"
  },
  session_id: {
    type: String,
    required: true,
  },
  socket_id: {
    type: String,
    required: true,
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

module.exports = ChatUsers = mongoose.model("chat_users", chatUsersSchema);
