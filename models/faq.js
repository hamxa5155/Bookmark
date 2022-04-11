const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const shortid = require('shortid');

/* About Us Schema */
const faqSchema = new Schema({
    // _id: {
    //     type: String,
    //     default: shortid.generate
    // },
    question: {
        type: String,
        required: true
    },
    anwser: {
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

module.exports = mongoose.model('faq', faqSchema);
