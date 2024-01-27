const chatModel = require("../Models/chatsmodel");
const usermodel = require("../Models/usermodel");

module.exports.getchats = async (req, res) => {
  try {
    const userID = req.body.id;

    if (!userID) {
      throw new Error("User ID is required");
    }

    const chats = await chatModel
      .find({ members: { $in: [userID] } })
      .sort({ updatedAt: -1 }); // Sort by updatedAt in descending order

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

  if (!member1 || !member2 || member1 === member2) {
    return res.status(400).json({
      success: false,
      error: "Both members are required.",
    });
  }

  try {
    let user = await usermodel.findById(member1);
    let user2 = await usermodel.findById(member2);
    if (!user || !user2) {
      res.status(400).json({
        success: false,
        error: "Member is not valid",
      });
    }
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
    let data = [
      {
        id: member1,
        name: user.name,
        imageurl: user.imageurl,
      },
      {
        id: member2,
        name: user2.name,
        imageurl: user2.imageurl,
      },
    ];

    const membersArray = [member1, member2];
    const chat = new chatModel({ members: membersArray, data });
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
  const userID = req.body.userID;
  const name = req.body.name;
  if (!members) {
    return res
      .status(400)
      .json({ success: false, error: "members are required." });
  }
  if (!userID) {
    return res
      .status(400)
      .json({ success: false, error: "UserID is required" });
  }
  if (!name) {
    return res
      .status(400)
      .json({ success: false, error: "UserID is required" });
  }
  try {
    const chat = new chatModel({
      members: [...members, userID],
      isGroup: true,
      admin: userID,
      name,
    });
    await chat.save();

    return res.status(201).json({
      success: true,
      chatId: chat._id,
    });
  } catch (err) {
    return res.status(500).send({ success: false, error: "Server Error" });
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
module.exports.getDetails = async (req, res) => {
  let chatID = req.body.chatID;
  let userID = req.body.userID;
  try {
    let chat = await chatModel.findById(chatID);
    if (!chat) {
      res.status(400).json({ success: false, message: "Invalid Chat ID" });
      return;
    }

    if (chat.isGroup) {
      let users = chat.members;
      const userDetails = await Promise.all(
        users.map(async (memberID) => {
          const user = await usermodel.findById(memberID);
          return {
            id: user._id,
            name: user.name,
            image: user.imageurl,
            username: user.username,
          };
        })
      );

      const details = {
        name: chat.name,
        image: chat.imageurl,
        admin: chat.admin,
        members: userDetails,
      };

      res.status(200).json({ success: true, group: true, details });
    } else {
      let otherUser = chat.members.filter((memberid) => memberid !== userID)[0];
      let user = await usermodel.findById(otherUser);
      res.status(200).json({ success: true, group: false, user });
    }
  } catch (e) {
    res.status(404).json({ success: false, error: "Internal Server error" });
  }
};

module.exports.exitGroup = async (req, res) => {
  try {
    const { chatID, userID } = req.body;

    const chat = await chatModel.findById(chatID);

    chat.members = chat.members.filter((memberId) => memberId !== userID);

    await chat.save();

    res.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
