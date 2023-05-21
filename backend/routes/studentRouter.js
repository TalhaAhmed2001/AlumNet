const express = require('express');

const checkAuth = require('../middleware/check-auth')
const { createStudentProfile, requestPromotion, getPromotingStudents, updateStudentProfile, getStudentProfile, getPromotion } = require('../controllers/studentController')
const { authPermission } = require("../middleware/check-permission");
const { validateStudentProfile, validateUpdatedStudentProfile } = require("../middleware/validation");
const fileUpload = require("../middleware/file-upload");

const router = express.Router()


router.post('/', fileUpload.single("image"), validateStudentProfile, createStudentProfile)

router.use(checkAuth);

router.get('/', authPermission("requestPromotion"), getStudentProfile)
router.put('/:sid', authPermission("requestPromotion"), validateUpdatedStudentProfile, updateStudentProfile)
router.patch('/:sid', authPermission("requestPromotion"), requestPromotion)
router.get("/promotion", authPermission("requestPromotion"), getPromotion)
router.get("/promotingstudents", authPermission("promoteStudent"), getPromotingStudents)

module.exports = router