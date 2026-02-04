



const User = require("../models/User");
const Company = require("../models/Company");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Admin + Company
const registerAdmin = async (req, res) => {
  const { name, email, password, companyName } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const company = await Company.create({ name: companyName });

  const admin = await User.create({
    name,
    email,
    password: hash,
    role: "admin",
    companyId: company._id
  });

  company.createdBy = admin._id;
  await company.save();

  res.json({ message: "Admin & Company created" });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role, companyId: user.companyId },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
};

module.exports = {
  registerAdmin,
  login
};

