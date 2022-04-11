const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const shortid = require('shortid');
const adminSchema = new Schema({
    // _id: {
    //     type: String,
    //     default: shortid.generate
    // },
    image: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('admin', adminSchema);
