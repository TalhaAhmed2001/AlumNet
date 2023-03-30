const express = require('express');

const checkAuth = require('../middleware/check-auth')
const { createStudentProfile, requestPromotion, getPromotingStudents } = require('../controllers/studentController')
const { validateStudentProfile } = require("../middleware/validation");

const router = express.Router()


router.post('/', validateStudentProfile, createStudentProfile)

router.use(checkAuth);

router.patch('/requestpromotion', authPermission("requestPromotion"), requestPromotion)
router.get("/promotingstudents", authPermission("getPromotingStudents"), getPromotingStudents)

module.exports = router