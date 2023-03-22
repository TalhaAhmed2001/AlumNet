const express = require('express');

const checkAuth = require('../middleware/check-auth')
const { createStudentProfile, requestPromotion } = require('../controllers/studentController')
const { validateStudentProfile } = require("../middleware/validation");

const router = express.Router()


router.post('/signup', validateStudentProfile, createStudentProfile)

router.use(checkAuth);

router.patch('/requestpromotion', authPermission("requestPromotion"), requestPromotion)

module.exports = router