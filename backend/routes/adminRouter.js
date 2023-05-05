const express = require('express')

const { approveProfile, promoteStudent, declineProfile, getPendingProfiles } = require('../controllers/adminController')
const checkAuth = require('../middleware/check-auth')
const { authPermission } = require("../middleware/check-permission");

const router = express.Router()

router.use(checkAuth)

router.get("/pendingprofiles", authPermission("getPendingProfiles"), getPendingProfiles)
router.put("/promote/:id", authPermission("promoteStudent"), promoteStudent)
router.patch("/approve/:id", authPermission("approveProfile"), approveProfile)
router.delete("/decline/:id", authPermission("declineProfile"), declineProfile)

module.exports = router