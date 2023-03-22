const express = require('express')

const { approveProfile, declineProfile, getPendingProfiles } = require('../controllers/adminController')
const checkAuth = require('../middleware/check-auth')
const { authPermission } = require("../middleware/check-permission");

const router = express.Router()

router.use(checkAuth)

router.get("/admin", authPermission("getPendingProfiles"), getPendingProfiles)
router.patch("/admin", authPermission("approveProfile"), approveProfile)
router.delete("/admin", authPermission("declineProfile"), declineProfile)

module.exports = router