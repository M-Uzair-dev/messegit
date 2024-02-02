const express = require("express");
const {
  createmessege,
  getmesseges,
  deletemessege,
  getNewMessagesCount,
  seen,
} = require("../Controllers/messegescontrollers");

const router = express.Router();

router.post("/new", createmessege); // http://localhost:5000/messages/new
router.post("/get", getmesseges); // http://localhost:5000/messages/get
router.post("/getcount", getNewMessagesCount); // http://localhost:5000/messages/getcount
router.post("/delete", deletemessege); // http://localhost:5000/messages/delete
router.post("/seen", seen); // http://localhost:5000/messages/seen

module.exports = router;
