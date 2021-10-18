
const nodemailer = require('nodemailer');
const { EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "mail.adm.tools" ,
    port: 465,
    secure: true, 
    auth: {
      user: 'info@maryna.com.ua', 
      pass: EMAIL_PASSWORD 
    },
  }

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: 'info@maryna.com.ua',
  }
  await transporter.sendEmail(email)
}

module.exports = sendEmail;
