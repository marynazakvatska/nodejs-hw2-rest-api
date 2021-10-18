
const nodemailer = require('nodemailer');

const { EMAIL_PASSWORD } = process.env;
  
    const nodemailerConfig = {
    host: "mail.adm.tools" ,
    port: 465,
    secure: true, 
    auth: {
      user: 'maryna@maryna.com.ua', 
      pass: /* EMAIL_PASSWORD */ "&Ze5x^k8G#R4"
    },
  }

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: 'maryna@maryna.com.ua',
  }
  await transporter.sendEmail(email)
}

module.exports = sendEmail;
