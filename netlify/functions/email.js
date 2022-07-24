require('dotenv').config();

var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.USR,
    pass: process.env.PASS
  }
});

exports.handler = async function (event, context) {
    const emailDetails = JSON.parse(event.body);
    var mailOptions = {
        from: emailDetails.email,
        to: process.env.TO,
        subject: emailDetails.subject,
        text: 'Email from ' + emailDetails.name + ':\n\n' + emailDetails.message
    };
    return transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error: ' + error }),
          };
      } else {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent: ' + info.response }),
          };
      }
    });
  }