const userModel = require("../Models/usermodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.validateUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized: Missing token" });
    }

    try {
      const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

      const user = await userModel.findById(decodedToken.id);

      if (!user) {
        return res
          .status(401)
          .json({ status: false, message: "Unauthorized: Invalid user" });
      }

      req.user = user;
      res.status(200).json({ status: true, user });
    } catch (jwtError) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized: Invalid token" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
