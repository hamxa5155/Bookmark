const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    isbn: String,
    productId: String,
    paymentId: String,
    price: Number,
    isCancelled: Boolean,
    buyerComplete: Boolean,
    sellerComplete: Boolean,
    sellerEmail: String,
    sellerName: String,
    sellerMessages: String,
    buyerEmail: String,
    buyerName: String,
    buyerMessages: String
});

module.exports = mongoose.model('chat', chatSchema);