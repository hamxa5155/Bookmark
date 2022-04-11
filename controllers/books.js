const uuid = require('uuid-1345');
const axios = require('axios');
const imageDispatcher = require('../aws/imageDispatcher');

//load models
const Book = require("../models/books");
module.exports = (app, upload, authRequired) => {
    app.post('/book-create', upload.single("image"), authRequired, async (req, res) => {
        try {
            let filename = "";
            if (req.file) {
                filename = req.file.filename;
            } else {
                filename = req.body.image;
            }
            const newBook = new Book({
                isbn: req.body.isbn,
                image: filename,
                location: req.body.location,
                title: req.body.title,
                subTitle: req.body.subTitle,
                author: req.body.author,
                notes: req.body.notes,
                publisher: req.body.publisher,
                price: req.body.price,
                created_by: req.user._id,
                updated_on: new Date()
            })
            const resp = await newBook.save();
            res.status(201).json(resp);
        } catch (err) {
            res.status(400).json(err);
        }
    });
    app.get('/fetch-own-listing', authRequired, async (req, res) => {
        const books = await Book.find({ created_by: req.user._id }).populate("created_by");
        res.json(books);
    })
    app.get('/fetch-marketplace', async (req, res) => {
        const books = await Book.find({ isSold: false }).populate("created_by");
        res.json(books);
    })
}