const axios = require('axios');
const Orders = require("../models/orders");
const Cart = require("../models/cart");
const Book = require("../models/books");
const Notification = require("../models/notifications");
module.exports = (app, authRequired) => {
    app.get('/fetch-orders', authRequired, async (req, res) => {
        const resp = await Orders.find({ created_by: req.user._id }).populate("book_ids");
        res.json(resp);
    });
    app.post('/create-order', authRequired, async (req, res) => {
        let books = JSON.parse(req.body.book_ids);
        const newOrder = new Orders({
            book_ids: books,
            created_by: req.user._id,
            updated_on: new Date()
        });
        const resp = await newOrder.save();
        await Cart.findOneAndDelete({created_by: req.user._id});
        res.json(resp);
        
        for(let i=0; i<books.length; i++){
           Book.findOneAndUpdate({_id: books[i]}, {isSold: true}, {new:true}, (err, docs)=>{
               console.log(err, docs);
           })
        }
        const bookDetail = await Book.findOne({_id: books[0]});
        const newNotification = new Notification({
            notification: `${req.user.firstName} placed an order in your listing`,
            created_by: bookDetail.created_by,
            updated_on: new Date()
        })
        newNotification.save();
    });
}