const express = require('express')

const { login } = require('../controllers/loginController')
const { validateLogin } = require('../middleware/validation')

const router = express.Router()

router.post('login', validateLogin, login)

module.exports = router