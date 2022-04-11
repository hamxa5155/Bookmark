const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const shortid = require('shortid');

/* About Us Schema */
const contactUsSchema = new Schema({
    // _id: {
    //     type: String,
    //     default: shortid.generate
    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        // required: true
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('contacus', contactUsSchema);
