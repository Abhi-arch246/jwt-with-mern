const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const registerUser = async (req, res) => {

    const { user, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(200).json({ msg: "User already regisetred with this email" })
    } else {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const data = await User.create({
                user: user,
                email: email,
                password: hashedPassword
            })

            return res.status(200).json(data)
        } catch (error) {
            res.status(400).json({ msg: error })
        }

    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        if (user && (await bcrypt.compare(password, user.password))) {
            return res.status(200).json({ msg: "Successful login" })
        }
        else {
            return res.status(200).json({ msg: "Invalid password" })
        }
    } else {
        return res.status(400).json({ msg: "Your email not registered" })
    }
}




module.exports = {
    registerUser,
    loginUser
}