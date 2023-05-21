const express = require('express')

const { approveProfile, promoteStudent, declineProfile, getPendingProfiles, deleteAlumnusProfile, deleteStudentProfile, getApprovedProfiles } = require('../controllers/adminController')
const checkAuth = require('../middleware/check-auth')
const { authPermission } = require("../middleware/check-permission");
const { deleteAllStories } = require('../controllers/storiesController');
const { deleteAllAdvices } = require('../controllers/adviceController');

const router = express.Router()

router.use(checkAuth)

router.get("/pendingprofiles", authPermission("getPendingProfiles"), getPendingProfiles)
router.get("/approvedprofiles", authPermission("getPendingProfiles"), getApprovedProfiles)
router.put("/promote/:id", authPermission("promoteStudent"), promoteStudent)
router.patch("/approve/:id", authPermission("approveProfile"), approveProfile)
router.delete("/decline/:id", authPermission("declineProfile"), declineProfile)
router.delete("/delete/alumnus/:id",authPermission("declineProfile"), deleteAlumnusProfile)
router.delete("/delete/student/:id",authPermission("declineProfile"), deleteStudentProfile)
router.delete("/delete/stories/:erp", authPermission("declineProfile"), deleteAllStories)
router.delete("/delete/advices/:erp", authPermission("declineProfile"), deleteAllAdvices)

module.exports = router