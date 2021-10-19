const { User } = require("../../models")
const {generate } = require("shortid")
const { Conflict } = require("http-errors")
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar')
const {sendEmail} = require('../../helpers')




const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
     if (user) {
         throw new Conflict("Email in use")
         
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    

    const verifyToken = generate();
    const newUser = {
        email,
        password: hashPassword,
        verifyToken,
        avatarUrl: gravatar.url(email)
    };
    await User.create(newUser);
    /* await newUser.save() */


/*     const data = {
        to: email,
        subject: "Подтверждение верификации",
        html: `
        <a href="http://localhost:3000/api/users/verify/${verifyToken}"
        target="_blank">Подтвердить почту</a>
        ` 
}
*/

   /*  await sendEmail(data) */
res.status(201).json({
    status: "success",
    code: 201,
    message: "Success register",
    data: {
        verifyToken
    },
    newUser
})
}

module.exports = signup;
