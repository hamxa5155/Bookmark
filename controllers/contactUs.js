const contactUs = require("../models/contactUs");
const nodemailer = require("nodemailer");

module.exports = (app, upload) => {
    app.post(
        "/contactus-create",
        // authRequired,
        async (req, res) => {
            try {

                if (!req.body.email) {
                    return res.status(500).json("Please enter  email");
                }
                const newContactUS = new contactUs({
                    name: req.body.name,
                    email: req.body.email,
                    subject: req.body.subject,
                    message: req.body.message,
                });

                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    secure: "false",
                    host: "smtp.gmail.com",
                    auth: {
                        user: "moversconnectionsalert@gmail.com",
                        pass: "WSF002021",
                    },
                });
                var mailOptions = {
                    from: "moversconnectionsalert@gmail.com",
                    to: "qayyuma686@gmail.com",
                    subject: req.body.subject,
                    html: req.body.message

                };


                transporter.sendMail(mailOptions, async function (error, info) {
                    if (error) {
                        console.log("8:48 errrrr", error);
                        res.status(500).json({
                            message: "Error sending email",
                        });
                    } else {
                        console.log(
                            "Email sent: =>toooooooooooooooooooooooooooooooooooooooooooo", req.body.email
                        );
                        const resp = await newContactUS.save();
                        res.status(201).json(resp);
                    }
                });
            } catch (err) {
                res.status(500).json(err);
            }
        }
    );
    app.get("/fetch-contactus", async (req, res) => {
        const contactus = await contactUs.find();
        res.json(contactus);
    });
};
