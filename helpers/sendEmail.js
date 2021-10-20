
const nodemailer = require('nodemailer');
require('dotenv').config()
const { EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "mail.adm.tools" ,
    port: 465,
    secure: true, 
    auth: {
      user: 'info@maryna.com.ua', 
      pass: EMAIL_PASSWORD 
  },
    tls:{
        rejectUnauthorized: false
    },
  }

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: 'info@maryna.com.ua',
    
  }
  await transporter.sendMail(email).then(() => {
    console.log('Email sent')
  }).catch((error) => {
    console.log(error.message)
  })
}

module.exports = sendEmail;
