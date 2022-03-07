const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const shortid = require('shortid');

/* All Schema */

const bookSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  isbn: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    default: "",
  },
  author: {
    type: String,
    default: "",
  },
  notes: {
    type: String,
    default: "",
  },
  publisher:{
    type: String,
    default: "",
  },
  price:{
    type: Number,
    default: 0,
  },
  isSold: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model('books', bookSchema);
