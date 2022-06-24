const nodemailer = require('nodemailer')


module.exports = async (data, mailtype) => {

    try {
        const mailConfig = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // upgrade later with STARTTLS
            auth: {
                user: "epicteachings@gmail.com",
                pass: "zbajbclbcdlnfwbh",
            },
        });

        const content = `<div><h1>Please verify your mail by clicking this link</h1></br></div>`

        const mailOptions = {
            from: "epicteachings@gmail.com",
            to: data.email,
            subject: 'Verify your mail for JWT App',
            html: content
        }

        await mailConfig.sendMail(mailOptions)
    } catch (error) {
        console.log(error);
    }


}