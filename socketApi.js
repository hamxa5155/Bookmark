var socket_io = require('socket.io');
const StoreChats = require("./helpers/chat/storeChats");
const Chat = require("./models/chat");

var io = socket_io();
var socketApi = {};
socketApi.io = io;

io.on('connection', function(socket){
  console.log("New client connected");
  socket.on('join', function (data) {
    console.log('USERID: ',data.userid);
    socket.join(data.userid); // We are using room of socket io
  });
  socket.on('chats', async function (message) {
    console.log('Message from user:', message);
    await StoreChats({
      user_id: message.user_id,
      message: message.message,
      is_loggedin: message.is_loggedin,
      sender: "user",
      socket_id: socket.id,
      image: message.filename ? message.filename : "N/A",
    });
    io.sockets.emit('admin_chats');
  });
  socket.on("update-chat", (payload) => {
    const sentMsg = `<div className="messagebox"><div className="sentmessages">${payload.msg}</div></div>`;
    const receiveMsg = `<div className="messagebox"><div className="receivedmessages">${payload.msg}</div></div>`;

    let buyerNewMsg, sellerNewMsg;
    if (payload.isBuyer) {
      buyerNewMsg = sentMsg;
      sellerNewMsg = receiveMsg;
    } else {
      buyerNewMsg = receiveMsg;
      sellerNewMsg = sentMsg;
    }

    Chat.findById(payload.id, (err, chat) => {
      if (chat) {
        if (!chat.buyerMessages) {
          chat.buyerMessages = "";
        }
        if (!chat.sellerMessages) {
          chat.sellerMessages = "";
        }
        chat.buyerMessages += buyerNewMsg;
        chat.sellerMessages += sellerNewMsg;
        chat.save();
      }
    });

    io.sockets.emit(`chat-${payload.id}`, { buyerNewMsg, sellerNewMsg });
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
  socket.on('disconnect', async function() {
    console.log('User disconnected!');
    console.log(socket.id);
    // await DeleteLiveUser({socket_id: socket.id});
 });
});
module.exports = socketApi;