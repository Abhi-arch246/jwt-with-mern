const express = require('express')
const router = express.Router()
const { registerUser, loginUser, verifyEmail } = require('../controllrers/authController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/verify-email', verifyEmail)
module.exports = router