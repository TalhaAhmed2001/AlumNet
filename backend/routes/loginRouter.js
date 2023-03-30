const express = require('express')

const { login } = require('../controllers/loginController')
const { validateLogin } = require('../middleware/validation')

const router = express.Router()

router.post(validateLogin, login)

module.exports = router