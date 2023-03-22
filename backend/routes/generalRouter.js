const express = require("express");
const { createStudentProfile } = require("../controllers/studentController")
const { login } = require("../controllers/loginController")
const { getPendingProfiles, approveProfile, declineProfile } = require("../controllers/adminController")
const checkAuth = require("../middleware/check-auth");
const { authPermission } = require("../middleware/check-permission");
const { validateLogin, validateStudentProfile } = require("../middleware/validation");

const router = express.Router();

router.post("/login", validateLogin, login)
router.post("/studentsignup", validateStudentProfile, createStudentProfile)

router.use(checkAuth);
router.get("/admin", authPermission("getPendingProfiles"), getPendingProfiles)
router.patch("/admin", authPermission("approveProfile"), approveProfile)
router.delete("/admin", authPermission("declineProfile"), declineProfile)

module.exports = router;