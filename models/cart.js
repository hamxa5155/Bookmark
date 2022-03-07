const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const shortid = require('shortid');
/* All Schema */
const cartSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  book_id: {
    type: String,
    required: true,
    ref: "books"
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

module.exports = mongoose.model('cart', cartSchema);
