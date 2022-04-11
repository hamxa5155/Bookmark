const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const shortid = require('shortid');

/* About Us Schema */
const aboutUsSchema = new Schema({
    // _id: {
    //     type: String,
    //     default: shortid.generate
    // },
    image: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        // required: true
    },
    detail: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('aboutus', aboutUsSchema);
