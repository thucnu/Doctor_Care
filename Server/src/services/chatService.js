const { Sequelize } = require("../models");
const db = require("../models");

let createChat = (senderId, receiverId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await db.Chat_Models.findOne({
        where: { members: [senderId, receiverId] },
      });
      if (check) {
        return resolve({
          errCode: 1,
          message: "Chat already exist",
        });
      } else {
        const chat = db.Chat_Models.build({
          members: [senderId, receiverId],
        });
        await chat.save();
        resolve({
          errCode: 0,
          data: chat,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getChats = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {      
      const data = await db.Chat_Models.findAll({
        where: { members: { [Sequelize.Op.contains]: [userId] }}
      });
      resolve({
        errCode: 0,
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let findChat = (firstId, secondId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const chat = await db.Chat_Models.findOne({
        members: [firstId, secondId],
      });
      resolve({
        errCode: 0,
        data: chat,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createChat: createChat,
  getChats: getChats,
  findChat: findChat,
};
