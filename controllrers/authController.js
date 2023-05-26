const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailSender = require("../config/mailSender");

const registerUser = async (req, res) => {
  const { user, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(200)
      .send({ success: false, msg: "User already registered with this email" });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const data = await User.create({
        user: user,
        email: email,
        password: hashedPassword,
      });
      await mailSender(data, "verify-email");

      return res
        .status(200)
        .send({ success: true, msg: "Registered Successfully" });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.isVerified) {
        const data = {
          _id: user._id,
          user: user.user,
          email: user.email,
        };

        const token = jwt.sign(data, process.env.SECRET, { expiresIn: "30d" });

        return res
          .status(200)
          .send({ success: true, msg: "Successful login", token: token });
      } else {
        return res
          .status(200)
          .send({
            success: false,
            msg: "Email not verified, Please check you inbox",
          });
      }
    } else {
      return res.status(200).send({ success: false, msg: "Invalid password" });
    }
  } else {
    return res
      .status(200)
      .send({ success: false, msg: "Your email not registered" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const tokenDetail = await Token.findOne({ token: req.body.token });
    // console.log(tokenDetail);
    if (tokenDetail) {
      await User.findOneAndUpdate({
        _id: tokenDetail.userid,
        isVerified: true,
      });
      await Token.findOneAndDelete({ token: req.body.token });
      res.send({ success: true, msg: "Email verified Successfully" });
    } else {
      res.send({ success: false, msg: "Invalid Token" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
};
