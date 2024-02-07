const userModel = require("../Models/usermodel");

module.exports.validateUser = async (req, res, next) => {
  try {
    const id = req.body.id;

    const user = await userModel.findById(id);

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized: Invalid user" });
    }

    req.user = user;
    res.status(200).json({ status: true, user });
    return res
      .status(401)
      .json({ status: false, message: "Unauthorized: Invalid token" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
