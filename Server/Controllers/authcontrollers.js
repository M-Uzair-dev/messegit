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
      throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ success: true });
  } catch (err) {
    res
      .status(401)
      .json({ success: false, errorMessage: "Invalid email or password" });
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
      imageurl: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${req.body.username}`,
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
    const userId = req.body.id;
    const updatedFields = req.body.updatedFields;
    const user = await userModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }
    Object.assign(user, updatedFields);
    await user.save();

    res.status(200).json({ success: true, user });
    console.log(user);
  } catch (err) {
    console.log(err);
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

module.exports.findUsers = async (req, res) => {
  try {
    const username = req.body.username;
    const usersname = req.body.usersname;

    const tempusers = await userModel.find({
      username: { $regex: username, $options: "i" },
    });

    if (tempusers.length === 0) {
      res.status(200).json({ NoUser: true });
      return;
    }

    const users = tempusers.filter((e) => e.username !== usersname);

    res.status(200).json({ users });
  } catch (err) {
    res.status(400).json({ success: false, errorMessage: err.message });
  }
};
