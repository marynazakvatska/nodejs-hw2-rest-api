const {NotFound, BadRequest} = require("http-errors")
const { User } = require("../../models")
const { sendEmail } = require('../../helpers')


const resendEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            throw new BadRequest('Missing required field email')
        }
        const user = await User.findOne({ email })
        console.log(user)
        if (!user) {
            throw new NotFound('User not found')
        }
        if (user.verify) {
            throw new BadRequest("Verification has already been passed ")
        }
        const data = {
        to: user.email,
        subject: "Подтверждение верификации",
        html: `
        <a href="http://localhost:3000/api/users/verify/${user.verifyToken}"
        target="_blank">Подтвердить почту</a>
        ` }

        await sendEmail(data)
        res.status(200).json({
            status: 'success',
            code: 200,
            message:" Verification email sent"
        })
       
    } catch (error) {
        /* console.log(error.message) */
       
   }
    
}

module.exports = resendEmail