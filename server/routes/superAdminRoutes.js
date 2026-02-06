const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const {
  createSuperAdmin,
  createAdminCompany,
  getAllCompanies,
  getAllAdmins,
  deleteCompany
} = require("../controllers/superAdminController");

/**
 * ⚠️ TEMP: RUN ONLY ONCE
 */
router.post("/create-superadmin", createSuperAdmin);

// 🔐 PROTECTED
router.post("/create-admin", protect, allowRoles("superadmin"), createAdminCompany);
router.get("/companies", protect, allowRoles("superadmin"), getAllCompanies);
router.get("/admins", protect, allowRoles("superadmin"), getAllAdmins);
router.delete("/company/:companyId", protect, allowRoles("superadmin"), deleteCompany);

module.exports = router;
