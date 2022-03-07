const StoreChats = require("../helpers/chat/storeChats");
const LiveUsers = require("../models/chatUsers");
  let socketApi = {};
module.exports = (app, authRequired, server) => {
  var serve = require('http').Server(app);
    const io = require("socket.io")(server,{
          cors: {
            origin: "*",
          }});
  
 socketApi.io = io;
    io.on("connection", (socket) => {
        console.log("socket is active to xonnect");
        socket.on("chats", async (message) => {
          console.log(message,"dd");
          await StoreChats({
            user_id: message.user_id,
            message: message.message,
            is_loggedin: message.is_loggedin,
            sender: "user",
            socket_id: socket.id,
            image: message.filename ? message.filename : "N/A",
          });
          io.sockets.emit("admin_chats");
          // io.emit("chats", payload.message);
        });
        socket.on("join", function (data) {
          console.log("USERID: ", data.userid);
          socket.join(data.userid); // We are using room of socket io
        });
      });
      socketApi.sendNotification = async function (message) {
        return new Promise(async (resolve, reject) => {
          try {
            // const row = await LiveUsers.findOne({user_id: message.user_id});
            const resp = await StoreChats({
              user_id: message.user_id,
              chat_user_id: message.chat_user_id,
              message: message.message,
              is_loggedin: "yes",
              sender: "admin",
              image: "N/A",
              socket_id: null,
            });
            // io.sockets.to(row.socket_id).emit('chats', message.message);
            io.sockets.in(message.session_id).emit("chats", message.message);
            resolve(resp);
          } catch (err) {
            reject(err);
          }
        });
      };
    }
    module.exports.socketApi = socketApi;