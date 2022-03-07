const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const path = require("path");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 8080;
app.use(
  cors({
    origin: "*",
  })
);
app.use("/uploads", express.static(__dirname + "/uploads"));

if (process.env.NODE_ENV === "production") {
  app.use(compression());
  app.use(helmet());
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  // app.use(
  //   cors({
  //     origin: "http://54.211.16.191",
  //     // origin: "*",
  //     credentials: true,
  //   })
  // );
  console.log("Running in production!!");
} else {
  // app.use(
  //   cors({
  //     origin: "http://localhost:3000",
  //     // origin: '*',
  //     credentials: true,
  //   })
  // );
}
// const server = app.listen(port, () => {
//     console.log(`Listening to port ${port}`)
// });

const uri =
  "mongodb+srv://uddipan:uddipan123@clusteru-stdcj.mongodb.net/bookmarkd?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongo connected");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// [TODO]: Adjust for production code
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    unset: "destroy",
    cookie: { maxAge: 6 * 60 * 60 * 1000 }, // Cookie only remains active for 6 hours
  })
);

require("./controllers/login")(app);
require("./controllers/signup")(app);
require("./controllers/logout")(app);
require("./controllers/inventory")(app);

const authRequired = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).end();
  }
};
//Uploads files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let extension = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});
const upload = multer({
  storage: storage,
});
//support chat
const sendMessage = require("./chat/sendMessage"),
  fetchLiveUsers = require("./chat/fetchLiveUsers"),
  fetchChats = require("./chat/fetchChats"),
  fetchUserChats = require("./chat/fetchUserChats"),
  sendMailtoAdmin = require("./chat/sendmailtoadmin");
(uploadPicture = require("./chat/uploadPicture")),
  (MarkChatSeen = require("./chat/markAsSeen"));

//support chat
app.use("/chat", sendMessage);
app.use("/chat", fetchLiveUsers);
app.use("/chat", fetchChats);
app.use("/chat", fetchUserChats);
app.use("/chat", uploadPicture);
app.use("/chat", MarkChatSeen);
app.use("/chat", sendMailtoAdmin);

require("./controllers/profile")(app, authRequired);
require("./controllers/cart")(app, authRequired);
require("./controllers/books")(app, upload, authRequired);
require("./controllers/payment-process")(app, authRequired);
require("./controllers/seller-signup")(app, authRequired);
require("./controllers/chat")(app, authRequired);
require("./controllers/orders")(app, authRequired);
require("./controllers/notifications")(app, authRequired);
require("./controllers/support")(app, authRequired);

///multer
app.use("/uploads", express.static(__dirname + "/uploads"));
if (process.env.NODE_ENV === "production") {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}
module.exports = app;
