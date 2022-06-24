const express = require('express')
const router = express.Router()
const authMiddleware = require('../authMiddleware')
const { userData } = require('../controllrers/userController')

router.get('/userdata', authMiddleware, userData)

module.exports = router