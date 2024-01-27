const express = require("express");
const {
  createchat,
  getchats,
  deletechat,
  creategroup,
  addMembers,
  getDetails,
  exitGroup,
} = require("../Controllers/chatscontrollers");

const router = express.Router();

router.post("/new", createchat); // http://localhost:5000/chats/new
router.post("/get", getchats); // http://localhost:5000/chats/get
router.post("/delete", deletechat); // http://localhost:5000/chats/delete
router.post("/newgroup", creategroup); // http://localhost:5000/chats/newgroup
router.post("/add", addMembers); // http://localhost:5000/chats/add
router.post("/details", getDetails); // http://localhost:5000/chats/details

router.post("/exit", exitGroup); // http://localhost:5000/chats/exit

module.exports = router;
