const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
const shortid = require('shortid');
const blogSchema = new Schema({
    // _id: {
    //     type: String,
    //     default: shortid.generate
    // },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'admin',
    },
    detail: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('blog', blogSchema);
