const express = require("express");

const checkAuth = require("../middleware/check-auth");
const { createAlumnusProfile, getAlumnusProfile, getAlumniProfiles, updateAlumnusProfile, getAlumniByName, addJob, updateJob, deleteJob } = require('../controllers/alumnusController');
const { authPermission } = require("../middleware/check-permission");
const { validateJobDesc, validateAlumnusProfile } = require("../middleware/validation");

const router = express.Router();


router.post("/signup", validateAlumnusProfile, createAlumnusProfile)

router.use(checkAuth);

router.get("/profiles", authPermission("getAlumniProfiles"), getAlumniProfiles)
router.get("/profiles/:pid", authPermission("getAlumnusProfile"), getAlumnusProfile)
router.get("/profile/name", authPermission("getAlumniProfiles"), getAlumniByName)
router.post("/jobs", authPermission("addJob"), validateJobDesc, addJob)
router.patch("/jobs", authPermission("updateJob"), updateJob)
router.delete("/jobs/", authPermission("updateJob"), deleteJob)

module.exports = router;