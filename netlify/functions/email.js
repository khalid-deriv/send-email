require('dotenv').config();

var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
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
    try {
        await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log("error", error)
                return {
                    statusCode: 500,
                    body: JSON.stringify({
                      error: error
                    })
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify(info.response)
              }

        })
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
              error: e.message
            })
        }
    }
    return {
        statusCode: 200
      }
    
  }
