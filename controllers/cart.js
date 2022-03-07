const axios = require('axios');
const Cart = require("../models/cart");
module.exports = (app, authRequired) => {
    app.get('/cart-items', authRequired, async (req, res) => {
        const resp = await Cart.find({ created_by: req.user._id }).populate("book_id");
        res.json(resp);
    });
    app.post('/add-cart', authRequired, async (req, res) => {
        const respItemExist = await Cart.find({ created_by: req.user._id, book_id: req.body.book_id }).populate("book_id");
        if(respItemExist.length){
            res.status(400).json({message: "Item already exist in cart"});
        }else{
            const newCartItem = new Cart({
                book_id: req.body.book_id,
                created_by: req.user._id,
                updated_on: new Date()
            });
            const resp = await newCartItem.save();
            res.json(resp);
        }
    });

    app.post('/remove-cart', authRequired, async (req, res) => {
        Cart.deleteOne({ _id: req.body.id }, (err) => {
            if (err) return res.status(400).json(err);
            res.status(200).json({ msg: "Cart item deleted" });
          });
    });
}