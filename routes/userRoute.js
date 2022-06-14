const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllrers/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)
// router.get('/me', meRoute)

module.exports = router