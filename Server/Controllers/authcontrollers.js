const userModel = require("../Models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge });
  } catch (err) {
    throw err;
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ success: true });
  } catch (err) {
    if (err.message === "Invalid credentials") {
      res
        .status(401)
        .json({ success: false, errorMessage: "Invalid email or password" }); // Generalize error message
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        errorMessage: "Username already exists. Please choose a different one.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });

    res.status(201).json({ success: true });
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

    res.status(200).json({ success: true });
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
    res.status(400).json({ success: false, errorMessage: err.message });
  }
};
