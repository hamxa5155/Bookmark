const mongoose = require('mongoose');
const shortid = require('shortid');

const tempUserSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    start: Date,
    phone: Number,
    password: String,

    code: String
});

module.exports = mongoose.model('temp-user', tempUserSchema);