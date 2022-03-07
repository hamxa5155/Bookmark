const User = require('../models/user');
const TempUser = require('../models/tempUser');
const bcrypt = require('bcryptjs');
const randomize = require('randomatic');
const emailDispatcher = require('../aws/emailDispatcher');

module.exports = (app) => {
    app.post('/signup', async (req, res) => {
        if (req.session.newUserId) {
            await TempUser.findByIdAndDelete(req.session.newUserId);
            delete req.session.newUserId;
        }
        await User.findOne({ email: req.body.email }, async (err, user) => {
            // Only if email isn't associated with an existing user will a new user be created
            if (user) {
                res.json({ isEmailAvailable: false });
            } else {
                const passwordHash = await new Promise((resolve, reject) => {
                    bcrypt.genSalt(function(err, salt) {
                        bcrypt.hash(req.body.password, salt, function (err, hash) {
                            resolve(hash);
                        });
                    });
                });

                const code = randomize('A0', 5);

                const newUser = new TempUser({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: passwordHash,
                    email: req.body.email,
                    phone: req.body.phone,
                    dob: req.body.dob,
                    start: req.body.start,

                    code
                });

                 //emailDispatcher(newUser.email, 'SIGNUP', code);
                console.log("::CODE::", code);
                req.session.newUserId = newUser.id;

                newUser.save((err) => {
                    setTimeout(async () => {
                        await TempUser.findByIdAndDelete(req.session.newUserId);
                    }, 30 * 60 * 1000); // Signup expires in 30 minutes
                });

                res.json({ isEmailAvailable: true });
            }
        });
    });

    app.get('/signup-status', (req, res) => {
        if (req.session.newUserId) {
            TempUser.findById(req.session.newUserId, (err, tempUser) => {
                if (tempUser) {
                    res.json({ isInfoFilled: true });
                } else {
                    delete req.session.newUserId;
                    res.json({ signupError: 'Signup session has timed out' });
                }
            });
        } else {
            res.json({ isInfoFilled: false });
        }        
    });

    app.post('/signup-confirm', (req, res) => {
        if (req.session.newUserId) {
            TempUser.findById(req.session.newUserId, (err, tempUser) => {
                if (tempUser && tempUser.code === req.body.code) {
                    const newUser = new User({
                        firstName: tempUser.firstName,
                        lastName: tempUser.lastName,
                        email: tempUser.email,
                        dob: tempUser.dob,
                        start: tempUser.start,
                        phone: tempUser.phone,
                        password: tempUser.password
                    });

                    newUser.save(async (err) => {
                        await TempUser.findByIdAndDelete(req.session.newUserId);
                        delete req.session.newUserId;
                    });

                    res.json({ isSignupSuccessful: true });
                } else if (tempUser) {
                    res.json({ signupError: 'Incorrect signup code' });
                } else {
                    res.json({ signupError: 'Signup session has timed out' });
                }
            });
        } else {
            res.json({ signupError: 'Signup session has timed out' });
        }
    });
}