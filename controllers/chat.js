const Chat = require("../models/chat");

module.exports = (app, authRequired) => {
  app.post("/chat", authRequired, (req, res) => {
    Chat.findById(req.body.chatId, (err, chat) => {
      if (
        !chat ||
        (req.user.email !== chat.buyerEmail &&
          req.user.email !== chat.sellerEmail)
      ) {
        res.json(null);
      } else {
        const resChat = {
          _id: chat._id,
          isbn: chat.isbn,
          isCancelled: chat.isCancelled,
          buyerComplete: chat.buyerComplete,
          sellerComplete: chat.sellerComplete,
        };
        if (req.user.email === chat.buyerEmail) {
          resChat.sellerEmail = chat.sellerEmail;
          resChat.name = chat.sellerName;
          if (chat.buyerMessages) {
            resChat.messages = chat.buyerMessages;
          }
        } else {
          resChat.buyerEmail = chat.buyerEmail;
          resChat.name = chat.buyerName;
          if (chat.sellerMessages) {
            resChat.messages = chat.sellerMessages;
          }
        }
        res.json(resChat);
      }
    });
  });

  app.get("/chat-links", authRequired, async (req, res) => {
    const chatLinks = await Promise.all(
      req.user.chats.map(async (chatId) => {
        const chat = await Chat.findById(chatId);

        const chatLink = {
          _id: chat._id,
          isbn: chat.isbn,
          isCancelled: chat.isCancelled,
          buyerComplete: chat.buyerComplete,
          sellerComplete: chat.sellerComplete,
        };
        if (req.user.email === chat.buyerEmail) {
          chatLink.sellerEmail = chat.sellerEmail;
          chatLink.sellerName = chat.sellerName;
          if (chat.buyerMessages) {
            const lastMsgOutputIndex = chat.sellerMessages.lastIndexOf(
              '<div className="messagebox">'
            );
            const lastMsgOutput =
              chat.sellerMessages.substring(lastMsgOutputIndex);
            const lastMsg = lastMsgOutput.split(">")[2].split("<")[0];
            chatLink.lastMsg = lastMsg;
          }
        } else if (req.user.email === chat.sellerEmail) {
          chatLink.buyerEmail = chat.buyerEmail;
          chatLink.buyerName = chat.buyerName;
          if (chat.sellerMessages) {
            const lastMsgOutputIndex = chat.sellerMessages.lastIndexOf(
              '<div className="messagebox">'
            );
            const lastMsgOutput =
              chat.sellerMessages.substring(lastMsgOutputIndex);
            const lastMsg = lastMsgOutput.split(">")[2].split("<")[0];
            chatLink.lastMsg = lastMsg;
          }
        }
        return chatLink;
      })
    );

    res.json(chatLinks);
  });
};
