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
    type: string,
    required: true,
  },
  seenBy: [{ type: String }],
  createdAt: {
    type: Date,
    default: () => new Date.now(),
  },
});

module.exports = mongoose.model("messeges", userSchema);
