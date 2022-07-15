const express = require('express')
const router = express.Router()
const authMiddleware = require('../authMiddleware')
const { userData, updateUser } = require('../controllrers/userController')

router.get('/userdata', authMiddleware, userData)
router.post('/update', updateUser)

module.exports = router