const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {

    const { user, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(200).send({ success: false, msg: "User already registered with this email" })
    } else {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const data = await User.create({
                user: user,
                email: email,
                password: hashedPassword
            })

            return res.status(200).send({ success: true, msg: "Registered Successfully" })
        } catch (error) {
            res.status(400).send({ success: false, msg: error })
        }

    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        if (user && (await bcrypt.compare(password, user.password))) {
            const data = {
                _id: user._id,
                user: user.user,
                email: user.email
            }

            const token = jwt.sign(data, process.env.SECRET, { expiresIn: '30d' })

            return res.status(200).send({ success: true, msg: "Successful login", token: token })
        }
        else {
            return res.status(200).send({ success: false, msg: "Invalid password" })
        }
    } else {
        return res.status(200).send({ success: false, msg: "Your email not registered" })
    }
}




module.exports = {
    registerUser,
    loginUser
}