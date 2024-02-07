const express = require("express");
const {
  checkEmail,
  login,
  signup,
  editUser,
  deleteUser,
  findUsers,
  editPrivacy,
  block,
  GetBlocked,
  unBlock,
  comparePass,
  validateUser,
} = require("../Controllers/authcontrollers");

const router = express.Router();

router.post("/check", checkEmail); // http://localhost:5000/auth/check
router.post("/login", login); // http://localhost:5000/auth/login
router.post("/signup", signup); // http://localhost:5000/auth/signup
router.post("/update", editUser); // http://localhost:5000/auth/update
router.post("/delete", deleteUser); // http://localhost:5000/auth/delete/Sdfkqow76qwurjearo7
router.post("/validate", validateUser); // http://localhost:5000/auth/validate
router.post("/privacy", editPrivacy); // http://localhost:5000/auth/privacy
router.post("/block", block); // http://localhost:5000/auth/block
router.post("/getBlocked", GetBlocked); // http://localhost:5000/auth/getBlocked
router.post("/unblock", unBlock); // http://localhost:5000/auth/unblock
router.post("/compare", comparePass); // http://localhost:5000/auth/compare

router.post("/find", findUsers); // http://localhost:5000/auth/find
module.exports = router;
