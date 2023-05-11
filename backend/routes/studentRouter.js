const express = require('express');

const checkAuth = require('../middleware/check-auth')
const { createStudentProfile, requestPromotion, getPromotingStudents, updateStudentProfile, getStudentProfile } = require('../controllers/studentController')
const { authPermission } = require("../middleware/check-permission");
const { validateStudentProfile, validateUpdatedStudentProfile } = require("../middleware/validation");

const router = express.Router()


router.post('/', validateStudentProfile, createStudentProfile)

router.use(checkAuth);

router.get('/', authPermission("requestPromotion"), getStudentProfile)
router.put('/:sid', authPermission("requestPromotion"), validateUpdatedStudentProfile, updateStudentProfile)
router.patch('/:sid', authPermission("requestPromotion"), requestPromotion)
router.get("/promotingstudents", authPermission("promoteStudent"), getPromotingStudents)

module.exports = router