'use strict';
const nodemailer = require('nodemailer');

module.exports = function(recipient, title, body) {
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'snippets2017@gmail.com',
		pass: 'snippets1'
	}
});

// setup email data with unicode symbols
let mailOptions = {
	from: '"Snippets" <snippets2017@gmail.com>', 	// sender address
	to: recipient, 	// list of receivers
	subject: title, 	// subject line
	text: body, 	// text body
	html: body	// html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		return console.log(error);
	}
	console.log('Message %s sent: %s', info.messageId, info.response);
});

}