const mongoose = require("mongoose");

const messegeschema = new mongoose.Schema({
  chatID: {
    type: String,
    required: true,
  },
  senderID: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  seenBy: [{ type: String }],
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  username: { type: String },
});

module.exports = mongoose.model("messeges", messegeschema);
