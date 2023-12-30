const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
  },
  email: {
    type: "string",
  },
  username: {
    type: "string",
  },
  password: {
    type: "string",
  },
  imageurl: {
    type: "string",
  },
  about: {
    type: "string",
  },
});

module.exports = mongoose.model("users", userSchema);
