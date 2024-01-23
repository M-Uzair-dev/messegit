const chatsmodel = require("../Models/chatsmodel");
const messegesModel = require("../Models/messegesmodel");
const usermodel = require("../Models/usermodel");

module.exports.getmesseges = async (req, res) => {
  try {
    const chatID = req.body.chatID;
    const userID = req.body.userID;
    if (!chatID || !userID) {
      throw new Error("IDs are required");
    }

    const messages = await messegesModel.find({ chatID });
    const user = await usermodel.findById(userID);
    const chat = await chatsmodel.findById(chatID);
    if (!user || !chat) {
      return res.status(500).json({ success: false, message: "User invalid" });
    }
    if (messages && messages.length > 0) {
      const updatedMessages = messages.map((message) => {
        if (!message.seenBy.includes(userID)) {
          message.seenBy.push(userID);
        }
        return message;
      });

      await Promise.all(updatedMessages.map((message) => message.save()));

      return res.status(200).json({ success: true, messages: updatedMessages });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "No messages found" });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports.getNewMessagesCount = async (req, res) => {
  try {
    const chatID = req.body.chatId;
    const userID = req.body.userId;
    const messages = await messegesModel.find({ chatID: chatID });
    let count = 0;
    for (let i = 0; i < messages.length; i++) {
      if (!messages[i].seenBy.includes(userID)) {
        count++;
      }
    }
    return res.status(200).json({ newMessageCount: count });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports.createmessege = async (req, res, next) => {
  const chatID = req.body.chatID;
  const userID = req.body.userID;
  const content = req.body.content;

  if (!chatID || !userID || !content) {
    return res.status(400).json({
      success: false,
      error: "fields are required.",
    });
  }

  try {
    const user = await usermodel.findById(userID);
    const chat = await chatsmodel.findById(chatID);
    if (!user || !chat) {
      return res.status(500).json({ success: false, message: "User invalid" });
    }
    const messege = new messegesModel({
      chatID,
      senderID: userID,
      content,
      seenBy: [userID],
    });
    await messege.save();

    return res.status(201).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

module.exports.deletemessege = (req, res) => {
  try {
    const messegeID = req.body.messegeID;
    if (!messegeID) {
      res.json({ success: false, message: "Message id is required" });
      return;
    }
    messegesModel
      .findByIdAndDelete(messegeID)
      .then(() => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.status(400).json({ sucess: false });
      });
  } catch (e) {
    res.status(400).json({ sucess: false, message: e.message });
  }
};
