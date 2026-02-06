// const express = require("express");
// const { getAdminStats } = require("../controllers/dashboardController");
// const protect = require("../middleware/authMiddleware");
// const allowRoles = require("../middleware/roleMiddleware");

// const router = express.Router();

// router.get("/admin-stats", protect, allowRoles("admin"), getAdminStats);

// module.exports = router;


const express = require("express");
const router = express.Router();

const { getAdminStats } = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// ROOT = /api/dashboard
router.get("/", protect, allowRoles("admin"), getAdminStats);

module.exports = router;
