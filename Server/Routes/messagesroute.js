const express = require("express");
const {
  createmessege,
  getmesseges,
  deletemessege,
} = require("../Controllers/messegescontrollers");

const router = express.Router();

router.post("/new", createmessege); // http://localhost:5000/messages/new
router.post("/get", getmesseges); // http://localhost:5000/messages/get
router.post("/delete", deletemessege); // http://localhost:5000/messages/delete

module.exports = router;
