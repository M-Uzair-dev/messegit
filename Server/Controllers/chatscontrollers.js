const chatModel = require("../Models/chatsmodel");

module.exports.getchats = async (req, res) => {
  try {
    const userID = req.body.id;

    if (!userID) {
      throw new Error("User ID is required");
    }

    const chats = await chatModel.find({ members: { $in: [userID] } });

    if (chats && chats.length > 0) {
      return res.status(200).json({ success: true, chats });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "No chats found" });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports.createchat = async (req, res, next) => {
  const member1 = req.body.member1;
  const member2 = req.body.member2;

  if (!member1 || !member2) {
    return res.status(400).json({
      success: false,
      error: "Both members are required.",
    });
  }

  try {
    let existingChat = await chatModel.findOne({
      members: { $all: [member1, member2] },
      isGroup: false,
    });

    if (existingChat) {
      return res.status(200).json({
        success: true,
        data: existingChat._id,
      });
    }

    const membersArray = [member1, member2];
    const chat = new chatModel({ members: membersArray });
    await chat.save();

    return res.status(201).json({
      success: true,
      data: { chatId: chat._id },
    });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

module.exports.deletechat = (req, res) => {
  try {
    const chatID = req.body.chatID;
    if (!chatID) {
      res.json({ success: false, message: "Chat id is required" });
      return;
    }
    chatModel
      .findByIdAndDelete(chatID)
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

module.exports.creategroup = async (req, res) => {
  const members = req.body.members;
  if (!members) {
    return res
      .status(400)
      .json({ success: false, error: "members are required." });
  }
  if (!req.body.userID) {
    return res
      .status(400)
      .json({ success: false, error: "UserID is required" });
  }
  try {
    const chat = new chatModel({
      members: [...members, req.body.userID],
      isGroup: true,
      admin: req.body.userID,
    });
    await chat.save();

    return res.status(201).json({
      success: true,
      data: { chatId: chat._id },
    });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

module.exports.addMembers = (req, res) => {
  const id = req.body.chatID;
  const members = req.body.members;

  if (!id || !members) {
    return res.status(400).json({
      success: false,
      error: "Input fields are empty or not provided",
    });
  }

  chatModel
    .findByIdAndUpdate(id, { $push: { members: members } })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: `Member added successfully`,
      });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ success: false, error: "Chat could not be found!" });
    });
};
