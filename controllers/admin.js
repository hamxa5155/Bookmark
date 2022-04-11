const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
module.exports = (app, upload) => {
    app.post("/adminsignup-create", upload.single("image"), async (req, res) => {
        const { firstName, lastName, password, email, intro } = req.body;
        let filename = "";
        if (req.file) {
            filename = req.file.filename;
        } else {
            filename = req.body.image;
        }
        try {
            let admin = await Admin.findOne({ email });
            console.log("admin signup", !admin === "null", admin);
            if (admin) {
                return res.status(403).json({
                    message: "Email already exists",
                });
            } else {
                bcrypt.hash(password, saltRounds, async (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Password encryption error",
                        });
                    } else {
                        const newAdmin = new Admin({
                            image: filename,
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
                            intro: intro,
                            password: hash,
                        });
                        let resp = await newAdmin.save();
                        const id = resp._id;
                        const token = jwt.sign(
                            newAdmin.toObject(),
                            "adminsecret",
                            { expiresIn: "5d" }
                        );
                        res.status(201).json({
                            message: "Admin Register Successfully",
                            user: resp,
                            token: token,
                            id: id,
                        });
                    }
                });
            }
        } catch (error) {
            console.log("error==", error);
            return res.status(500).json({
                message: "Internal Server Error",
                error
            });
        }
    });
    app.post("/admin-login", async (req, res) => {
        const { email, password } = req.body
        Admin.findOne({ email })
            .exec()
            .then(async (adminFound) => {
                if (adminFound) {
                    const id = adminFound._id
                    bcrypt.compare(password, adminFound.password, (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                message: 'password decryption error',
                            })
                        } else {
                            if (result === true) {
                                const loginToken = jwt.sign(
                                    adminFound.toObject(),
                                    "adminsecret",
                                    {
                                        expiresIn: '5d',
                                    },
                                )
                                res.status(200).json({
                                    message: 'Login Successful',
                                    token: loginToken,
                                    user: adminFound,
                                })
                            } else {
                                return res.status(403).json({
                                    message: 'Invalid password',
                                })
                            }
                        }
                    })
                } else {
                    return res.status(404).json({
                        message: 'Sorry ! No Username Found',
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: err,
                })
            })
    });
};
