const userModel = require("../Models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge });
  } catch (err) {
    console.error("Error creating JWT:", err);
    throw err; // Rethrow for proper error handling
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(401).json({ success: false, errorMessage: err.message });
  }
};

module.exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });

    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, errorMessage: err.message });
  }
};

module.exports.checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await userModel.findOne({ email });

    res.json({ exists: !!existingUser });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedFields = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    Object.assign(user, updatedFields);

    await user.save();

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, errorMessage: err.message });
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

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
