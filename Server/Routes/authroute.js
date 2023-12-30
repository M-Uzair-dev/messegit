const express = require("express");
const {
  checkEmail,
  login,
  signup,
  editUser,
  deleteUser,
} = require("../Controllers/authcontrollers");

const router = express.Router();

router.post("/", checkEmail); // http://localhost:5000/auth
router.post("/login", login); // http://localhost:5000/auth/login
router.post("/signup", signup); // http://localhost:5000/auth/signup
router.patch("/update/:id", editUser); // http://localhost:5000/auth/update/dfdklsfh278912767465
router.delete("/delete/:id", deleteUser); // http://localhost:5000/auth/delete/Sdfkqow76qwurjearo7

module.exports = router;
