import chatService from "../services/chatService";

let createChat = async (req, res) => {
  try {
    let result = await chatService.createChat(
      req.body.senderId,
      req.body.receiverId
    );
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getChats = async (req, res) => {
  try {
    let chat = await chatService.getChats(req.query.userId);
    return res.status(200).json(chat);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let findChat = async (req, res) => {
  try {
    let chat = await chatService.findChat(
      req.params.firstId,
      req.params.secondId
    );
    return res.status(200).json(chat);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

module.exports = {
  createChat: createChat,
  getChats: getChats,
  findChat: findChat,
};
