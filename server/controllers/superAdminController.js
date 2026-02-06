const User = require("../models/User");
const Company = require("../models/Company");
const bcrypt = require("bcryptjs");

/**
 * 🔐 CREATE SUPER ADMIN (ONE TIME API)
 * ⚠️ Call only once, then disable route
 */
const createSuperAdmin = async (req, res) => {
  try {
    const exists = await User.findOne({ role: "superadmin" });
    if (exists) {
      return res.status(400).json({ message: "SuperAdmin already exists" });
    }

    const hash = await bcrypt.hash("superadmin123", 10);

    const superadmin = await User.create({
      name: "Super Admin",
      email: "superadmin@creatorai.com",
      password: hash,
      role: "superadmin"
    });

    res.json({
      message: "🔥 SuperAdmin created",
      superadmin
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * 🔥 SUPER ADMIN creates Admin + Company
 */
const createAdminCompany = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

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

    res.json({
      message: "Admin & Company created successfully",
      admin,
      company
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * 👥 View all companies
 */
const getAllCompanies = async (req, res) => {
  const companies = await Company.find().populate("createdBy", "name email");
  res.json(companies);
};

/**
 * 👤 View all admins
 */
const getAllAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" }).populate("companyId");
  res.json(admins);
};

/**
 * ❌ Delete company + users
 */
const deleteCompany = async (req, res) => {
  const { companyId } = req.params;

  await User.deleteMany({ companyId });
  await Company.findByIdAndDelete(companyId);

  res.json({ message: "Company & users deleted" });
};

module.exports = {
  createSuperAdmin,
  createAdminCompany,
  getAllCompanies,
  getAllAdmins,
  deleteCompany
};
