const express = require("express");

const checkAuth = require("../middleware/check-auth");
const { createAlumnusProfile, getAlumnusProfile, getAlumniProfiles, updateAlumnusProfile, getAlumniByName, getAlumnusJobs, addJob, updateJob, deleteJob } = require('../controllers/alumnusController');
const { authPermission } = require("../middleware/check-permission");
const { validateJobDesc, validateAlumnusProfile, validateUpdatedAlumnusProfile } = require("../middleware/validation");

const router = express.Router();


router.post("/", validateAlumnusProfile, createAlumnusProfile)

router.use(checkAuth);

router.get("/", authPermission("getAlumniProfiles"), getAlumniProfiles)
router.get("/:pid", authPermission("getAlumnusProfile"), getAlumnusProfile)
//router.get("/:name", authPermission("getAlumniProfiles"), getAlumniByName)

router.put("/:pid", authPermission("updateAlumnusProfile"), validateUpdatedAlumnusProfile, updateAlumnusProfile)
router.get("/jobs/:pid", authPermission("addJob"), getAlumnusJobs)
router.post("/jobs", authPermission("addJob"), validateJobDesc, addJob)
router.patch("/jobs", authPermission("updateJob"), updateJob)
router.delete("/jobs", authPermission("updateJob"), deleteJob)

module.exports = router;