const Faq = require("../models/faq");
module.exports = (app) => {
    app.post('/faq-create', async (req, res) => {
        try {
            console.log("hshdhghghghgh", req.body)
            const newFaq = new Faq({
                question: req.body.question,
                anwser: req.body.anwser,
            })
            const resp = await newFaq.save();
            res.status(201).json(resp);
        } catch (err) {
            res.status(400).json(err);
        }
    });
    app.get('/fetch-faq', async (req, res) => {
        const faq = await Faq.find()
        res.json(faq);
    })
}