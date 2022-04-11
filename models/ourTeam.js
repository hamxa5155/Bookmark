const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const shortid = require('shortid');

/*our TeamSchema Schema */
const ourTeamSchema = new Schema({
    // _id: {
    //     type: String,
    //     default: shortid.generate
    // },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    designation: {
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

module.exports = mongoose.model('ourteam', ourTeamSchema);
