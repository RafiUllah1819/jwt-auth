const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt")
const Token = require("../models/tokenModel")

module.exports = async (user, mailType) =>{
try {
          // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: 587,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "diligenttechnologiespk@gmail.com", // generated ethereal user
      pass: "flcrwpiljqnctsqv", // generated ethereal password
    },
  });

  const encryptedToken = bcrypt.hashSync(user._id.toString(), 10).replaceAll("/", "")
  const token = new Token({userid: user._id, token: encryptedToken})
  await token.save()
  const emailContent= `<div><h1>Please click on the below link to verify your email address</h1><a href="http://localhost:3000/verifyemail/${encryptedToken}">${encryptedToken}</a> </div>`

  const mailOptions = {
    from : 'diligenttechnologiespk@gmail.com',
    to : user.email,
    subject : 'Verify Email',
    html : emailContent,
  }
  await transporter.sendMail(mailOptions)
} catch (error) {
    console.log(error)
}
}

// flcrwpiljqnctsqv