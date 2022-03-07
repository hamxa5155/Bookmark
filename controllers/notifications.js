const axios = require('axios');
const Notification = require("../models/notifications");
module.exports = (app, authRequired) => {
    app.get('/fetch-notifications', authRequired, async (req, res) => {
        const resp = await Notification.find({ created_by: req.user._id });
        res.json(resp);
    });
}