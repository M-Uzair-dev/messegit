const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  isGroup: {
    type: Boolean,
    default: false,
  },
  members: [{ type: String }],
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  admin: {
    type: String,
  },
  imageurl: {
    type: String,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
