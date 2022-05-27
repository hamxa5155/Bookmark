const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const shortid = require("shortid");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  firstName: String,
  lastName: String,
  email: String,
  dob: Date,
  start: Date,
  phone: Number,
  password: String,
  chats: [ObjectId],
  products: [{ id: String, isbn: Number, isSold: Boolean }],
  cartItems: [String],
  payments: [String],
  refunds: [String],
  pastTransactionUrls: [String],
  stripeSellerId: String,
  university: {
    type: String,
    default: "",
  },
  graduation_year: {
    type: String,
    default: "",
  },
  major: {
    type: String,
    default: "",
  },
  school_email: {
    type: String,
    default: "",
  },
  personal_email: {
    type: String,
    default: "",
  },
  courses: {
    type: String,
    default: "",
  },
  topics: {
    type: String,
    default: "",
  },
  services: {
    type: String,
    default: "",
  },
  billing_name: {
    type: String,
    default: "",
  },
  billing_address: {
    type: String,
    default: "",
  },
  following: { type: Array, default: [] },
  followers: { type: Array, default: [] },
  Permissions: {
    type: Object,

    profilePicture: {
      type: String,
      default: false,
    },
    Major: {
      type: String,
      default: false,
    },
    LastName: {
      type: String,
      default: false,
    },
    Location: {
      type: String,
      default: false,
    },
    GraduationYear: {
      type: String,
      default: false,
    },
    Interests: {
      type: String,
      default: false,
    },
    University: {
      type: String,
      default: false,
    },
  },
});

module.exports = mongoose.model("user", userSchema);
