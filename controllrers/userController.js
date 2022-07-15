const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const userData = async (req, res) => {
    try {
        res.status(200).send({ success: true, data: req.body.user })
    } catch (error) {
        res.status(400).send(error)
    }
}

const updateUser = async (req, res) => {
    const { updateUser } = req.body
    const email = updateUser.email
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(updateUser.cupassword, user.password))) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(updateUser.password, salt)
        User.findByIdAndUpdate(user._id, {
            name: updateUser.name,
            email: updateUser.email,
            password: hashedPassword
        }, (err => {
            if (err) {
                return res.status(400).json({ message: 'Something went wrong' })
            } else {
                return res.send({ success: true, msg: 'User details updated successfully\nYou will be directed to login page' })
            }
        }))
    } else {
        return res.send({ success: false, msg: "Current password is invalid" })
    }



}



module.exports = {
    userData
    , updateUser
}