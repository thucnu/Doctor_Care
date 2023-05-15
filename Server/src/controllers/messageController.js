import messageService from "../services/messageService";

let addMessage = async (req,res)=>{
    try{
        const mess = await messageService.addMessage(req.body.chatId, req.body.senderId, req.body.text)
        return res.status(200).json(mess)
    }catch(e){
        console.log(e);
        return res.status(400).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}
let getMessage = async (req,res)=>{
    try{
        const data = await messageService.getMessage(req.query.chatId)
        return res.status(200).json(data)
    }catch(e){
        console.log(e);
        return res.status(400).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}

module.exports = {
    addMessage: addMessage,
    getMessage: getMessage
}