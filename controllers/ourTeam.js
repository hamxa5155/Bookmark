const ourTeam = require("../models/ourTeam");

module.exports = (app, upload) => {
    app.post(
        "/ourteam-create",
        upload.single("image"),
        // authRequired,
        async (req, res) => {
            try {
                let filename = "";
                if (req.file) {
                    filename = req.file.filename;
                }
                // else {
                //     filename = req.body.image;
                // }
                const newOurTeam = new ourTeam({
                    image: filename,
                    name: req.body.name,
                    designation: req.body.designation,
                    detail: req.body.detail
                });
                const resp = await newOurTeam.save();
                res.status(201).json(resp);
            } catch (err) {
                res.status(500).json(err);
            }
        }
    );
    app.get("/fetch-ourteam", async (req, res) => {
        const ourteam = await ourTeam.find();
        res.json(ourteam);
    });
};
