const userModel = require("../Models/usermodel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  try {
    return jwt.sign({ id }, "Messegit, Message anytime", { expiresIn: maxAge });
  } catch (err) {
    console.error("Error creating JWT:", err);
    throw err; // Rethrow for proper error handling
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !user.comparePassword(password)) {
      throw new Error("Invalid credentials");
    }

    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(401).json({ success: false, errorMessage: err.message });
  }
};

module.exports.signup = async (req, res, next) => {
  try {
    const user = await userModel.create(req.body);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ success: true, user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ success: false, errorMessage: err.message });
  }
};

module.exports.checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await userModel.findOne({ email });
    res.json({ exists: !!existingUser });
  } catch (err) {
    console.error("Email check error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedFields = req.body;

    // Find the user by userId
    const user = await userModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Update user fields based on the provided changes
    Object.assign(user, updatedFields);

    // Save the updated user
    await user.save();

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Edit user error:", err);
    res.status(400).json({ success: false, errorMessage: err.message });
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find the user by userId and delete it
    const result = await userModel.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      throw new Error("User not found");
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(400).json({ success: false, errorMessage: err.message });
  }
};
