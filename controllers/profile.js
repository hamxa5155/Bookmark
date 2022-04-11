const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = (app, authRequired) => {
    app.get('/user', authRequired, (req, res) => {
        res.json(req.user);
    });

    // Searching user based on email
    // app.post('/user-email', authRequired, (req, res) => {
    //     User.findOne({ email: req.body.email }, (err, res) => {
    //         if (user) {
    //             res.json(user);
    //         } else {
    //             res.json(null);
    //         }
    //     });
    // });

    app.post('/edit-profile', authRequired, async(req, res) => {
        User.findOne({ _id: req.user.id }, async(err, existingUser) => {
            req.user.firstName = req.body.firstName || "";
            req.user.lastName = req.body.lastName || "";
            req.user.university = req.body.university || "";
            req.user.graduation_year = req.body.graduation_year || "";
            req.user.major = req.body.major || "";
            req.user.school_email = req.body.school_email || "";
            req.user.personal_email = req.body.personal_email || "";
            req.user.courses = req.body.courses || "";
            req.user.topics = req.body.topics || "";
            req.user.services = req.body.services || "";
            req.user.billing_name = req.body.billing_name || "";
            req.user.billing_address = req.body.billing_address || "";
            await req.user.save();
            res.json({ isChangeSuccess: true });
        });
    });

    app.post('/change-email', authRequired, async(req, res) => {
        User.findOne({ email: req.body.newEmail }, async(err, existingUser) => {
            if (existingUser) {
                res.json({ isChangeSuccess: false });
            } else {
                req.user.email = req.body.newEmail;
                await req.user.save();
                res.json({ isChangeSuccess: true });
            }
        });
    });

    app.post('/change-password', authRequired, async(req, res) => {
        bcrypt.compare(req.body.newPassword, req.user.password, (err, result) => {
            if (result) {
                res.json({ isChangeSuccess: false });
            } else {
                bcrypt.genSalt((err, salt) => {
                    bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
                        req.user.password = hash;
                        req.user.save((err) => {
                            res.json({ isChangeSuccess: true });
                        });
                    });
                });
            }
        });
    });

    app.post('/change-phone', authRequired, async (req, res) => {
        if (req.user.phone === req.body.newPhone) {
            res.json({ isChangeSuccess: false });
        } else {
            req.user.phone = req.body.newPhone;
            await req.user.save();
            res.json({ isChangeSuccess: true });
        }
    });
}