const express = require("express");
const {
  checkEmail,
  login,
  signup,
  editUser,
  deleteUser,
  findUsers,
  editPrivacy,
} = require("../Controllers/authcontrollers");
const { validateUser } = require("../Middleware/validateUser");

const router = express.Router();

router.post("/check", checkEmail); // http://localhost:5000/auth/check
router.post("/login", login); // http://localhost:5000/auth/login
router.post("/signup", signup); // http://localhost:5000/auth/signup
router.post("/update", editUser); // http://localhost:5000/auth/update
router.delete("/delete/:id", deleteUser); // http://localhost:5000/auth/delete/Sdfkqow76qwurjearo7
router.post("/validate", validateUser); // http://localhost:5000/auth/validate
router.post("/privacy", editPrivacy); // http://localhost:5000/auth/privacy

router.post("/find", findUsers); // http://localhost:5000/auth/find
module.exports = router;
