const express = require("express"),
  router = express.Router(),
  multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

var upload = multer({
  storage: storage,
});
/* 
  @route Post:/upload-picture
  @access private
  @desc - Upload picture
*/
router.post("/upload-picture", upload.single("photo"), async (req, res) => {
  console.log(req.body);
  res.json({ filename: req.file.filename });
});
module.exports = router;
