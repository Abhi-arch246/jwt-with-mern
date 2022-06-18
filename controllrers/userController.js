const User = require('../models/userModel')

const userData = async (req, res) => {
    try {
        res.status(200).send({ success: true, data: req.body.user })
    } catch (error) {
        res.status(400).send(error)
    }
}



module.exports = {
    userData
}