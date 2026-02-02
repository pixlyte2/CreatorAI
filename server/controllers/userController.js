const User = require("../models/user");
const bcrypt = require("bcryptjs");

/**
 * ADMIN creates Content Manager / Viewer
 */
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!["content_manager", "viewer"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash,
    role,
    companyId: req.user.companyId // 🔥 isolation
  });

  res.json(user);
};

const getUsers = async (req, res) => {
  const users = await User.find({
    companyId: req.user.companyId
  });
  res.json(users);
};

const deleteUser = async (req, res) => {
  await User.findOneAndDelete({
    _id: req.params.id,
    companyId: req.user.companyId
  });
  res.json({ message: "User deleted" });
};

module.exports = {
  createUser,
  getUsers,
  deleteUser
};
