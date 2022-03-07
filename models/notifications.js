const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const shortid = require('shortid');
/* All Schema */
const notificationSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  notification: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
    ref: "user"
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  updated_on: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('notifications', notificationSchema);
