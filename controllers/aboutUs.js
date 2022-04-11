const aboutUs = require("../models/aboutUs");

module.exports = (app, upload) => {
    app.post(
        "/aboutus-create",
        upload.single("image"),
        // authRequired,
        async (req, res) => {
            try {
                let filename = "";
                if (req.file) {
                    filename = req.file.filename;
                } else {
                    filename = req.body.image;
                }
                const newAboutUs = new aboutUs({
                    image: filename,
                    heading: req.body.heading,
                    detail: req.body.detail,
                });
                const resp = await newAboutUs.save();
                res.status(201).json(resp);
            } catch (err) {
                res.status(500).json(err);
            }
        }
    );
    app.get("/fetch-aboutus", async (req, res) => {
        const aboutus = await aboutUs.find();
        res.json(aboutus);
    });
};
