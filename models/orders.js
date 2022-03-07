const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const shortid = require('shortid');
/* All Schema */
const ordersSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  book_ids: {
    type: [{ type: String, ref: "books" }],
    default: []
  },
  status: {
    type: String,
    default: "pending"
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

module.exports = mongoose.model('orders', ordersSchema);
