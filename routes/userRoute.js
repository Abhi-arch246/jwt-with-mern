const express = require('express')
const router = express.Router()
const authMiddleware = require('../authMiddleware')
const { userData } = require('../controllrers/userController')

router.get('/user-data', authMiddleware, userData)

module.exports = router