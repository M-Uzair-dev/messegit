const usermodel = require("../Models/usermodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.validateUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res
        .status(401)
        .json({ status: false, message: "Unauthorized: Missing token" });
      return;
    }

    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await usermodel.findById(decodedToken.id);

    if (!user) {
      res
        .status(401)
        .json({ status: false, message: "Unauthorized: Invalid user" });
    } else {
      req.user = user; // Attach user to request for further use
      res.status(200).json({ status: true, user });
    }
  } catch (error) {
    console.error(error); // Log errors for debugging
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
