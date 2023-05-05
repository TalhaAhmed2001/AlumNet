const express = require('express');

const checkAuth = require('../middleware/check-auth')
const { createStudentProfile, requestPromotion, getPromotingStudents } = require('../controllers/studentController')
const { authPermission } = require("../middleware/check-permission");
const { validateStudentProfile } = require("../middleware/validation");

const router = express.Router()


router.post('/', validateStudentProfile, createStudentProfile)

router.use(checkAuth);

router.patch('/:sid', authPermission("requestPromotion"), requestPromotion)
router.get("/promotingstudents", authPermission("promoteStudent"), getPromotingStudents)

module.exports = router