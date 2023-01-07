const nodemailer = require('nodemailer');
function sendEmail(){
  let transporter = nodemailer.createTransport({
   service:'gmail', // true for 465, false for other ports
    auth: {
      user: 'wasifarain057@gmail.com', // generated ethereal user
      pass: 'xqzsytfwzhnuqfvb' // generated ethereal password
    }
  });
  
  // send mail with defined transport object
  transporter.sendMail({
    from: '"test" <wasifarain057@gmail.com>', // sender address
    to: '<wasifarain057@gmail.com>', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
   // html:`<b>${verificationCode}</b> ` // html body
  }, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}

  module.exports={
    sendEmail
  }