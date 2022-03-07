const LiveUsers = require("../../models/chatUsers");
const DeleteLiveUser = (params) => {
  return new Promise(async (resolve, reject) => {
    LiveUsers.deleteOne(
      { socket_id: params.socket_id, on_chat: false },
      (err) => {
        if (err) return reject();
        resolve();
      }
    );
  });
};
module.exports = DeleteLiveUser;
