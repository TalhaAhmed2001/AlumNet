const express = require("express");

const checkAuth = require("../middleware/check-auth");
const { createAlumnusProfile, getAlumnusProfile, getAlumniProfiles, updateAlumnusProfile, getAlumniByName, getAlumnusJobs, addJob, updateJob, deleteJob } = require('../controllers/alumnusController');
const { authPermission } = require("../middleware/check-permission");
const { validateJobDesc, validateAlumnusProfile, validateUpdatedAlumnusProfile, validateUpdatedJobDesc } = require("../middleware/validation");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();


router.post("/", fileUpload.single("image"),validateAlumnusProfile, createAlumnusProfile)

router.use(checkAuth);

router.get("/", authPermission("getAlumniProfiles"), getAlumniProfiles)
router.get("/profile", authPermission("getAlumnusProfile"), getAlumnusProfile)
router.get("/profile/:pid", authPermission("getAlumnusProfile"), getAlumnusProfile)
router.get("/profile_by_name/:name", authPermission("getAlumniProfiles"), getAlumniByName)

router.put("/:pid", authPermission("updateAlumnusProfile"), validateUpdatedAlumnusProfile, updateAlumnusProfile)
router.get("/jobs", authPermission("addJob"), getAlumnusJobs)
router.get("/jobs/:pid", authPermission("getAlumnusProfile"), getAlumnusJobs)
router.post("/jobs", authPermission("addJob"), validateJobDesc, addJob)
router.patch("/jobs", authPermission("updateJob"), validateUpdatedJobDesc, updateJob)
router.delete("/jobs/:jid", authPermission("updateJob"), deleteJob)

module.exports = router;