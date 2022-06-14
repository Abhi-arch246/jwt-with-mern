const User = require('../models/userModel')

const registerUser = async (req, res) => {

    const { user, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(200).json({ msg: "User already regisetred with this email" })
    } else {
        try {
            const data = await User.create({
                user: user,
                email: email,
                password: password
            })

            return res.status(200).json(data)
        } catch (error) {
            res.status(400).json({ msg: error })
        }

    }

}




module.exports = {
    registerUser
}