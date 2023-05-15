const { response, request } = require("express");
const db = require("../models");

let addMessage = (chatId, senderId, text) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (text.length > 0) {
        const mess = await db.Message_Model.build({
          chatId: chatId,
          senderId: senderId,
          text: text,
        });
        await mess.save();
        resolve({
          errCode: 0,
          data: mess,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getMessage = (chatId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Message_Model.findAll({
        where: { chatId: chatId },
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
module.exports = {
  addMessage: addMessage,
  getMessage: getMessage,
};
