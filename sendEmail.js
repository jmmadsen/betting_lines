var nodemailer = require('nodemailer');
const { password } = require('./password');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hammer.the.over.2020@gmail.com',
    pass: password
  }
});

var mailOptions = {
  from: 'hammer.the.over.2020@gmail.com',
  to: 'jmmadsen16@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});