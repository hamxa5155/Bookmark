const Blog = require("../models/blog");
module.exports = (app, upload, checkAdmin) => {
    app.post('/blog-create', upload.single("image"), checkAdmin, async (req, res) => {
        try {
            console.log("blog req body", req.body)
            let filename = "";
            if (req.file) {
                filename = req.file.filename;
            } else {
                filename = req.body.image;
            }
            const newBlog = new Blog({
                image: filename,
                title: req.body.title,
                detail: req.body.detail,
                created_by: req.adminObj._id,
            })
            const resp = await newBlog.save();
            res.status(201).json(resp);
        } catch (err) {
            res.status(400).json(err);
        }
    });
    app.get('/fetch-blog', async (req, res) => {
        const blog = await Blog.find().populate("created_by")
        res.json(blog);
    })
}