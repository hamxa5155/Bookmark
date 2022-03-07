/* Load models */
const LiveUsers = require("../../models/chatUsers");
const StoreLiveUsers = (params) => {
  return new Promise(async (resolve, reject) => {
    const row = await LiveUsers.findOne({ user_id: params.user_id });
    console.log(row);
    if (row) {
      LiveUsers.findOneAndUpdate(
        { user_id: params.user_id },
        {
          socket_id: params.socket_id,
        },
        { new: true },
        (err, data) => {
          if (err) reject();
          else resolve(true);
        }
      );
    } else {
      const newLiveUser = new LiveUsers({
        user_id: params.user_id,
        socket_id: params.socket_id,
        updated_on: Date.now(),
      });
      newLiveUser
        .save()
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject();
        });
    }
  });
};
module.exports = StoreLiveUsers;
