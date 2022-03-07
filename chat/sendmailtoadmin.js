var express = require("express");
var router = express.Router();
const nodemailer = require('nodemailer');





router.post('/sendemail', async (req, res) => {
   console.log(req.body, "senemai body----")
	let message = req.body.message;
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		ignoreTLS: false,
		auth: {
			user: 'softthrivetest@gmail.com',
		pass: 'strong12345678',
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
  
	const mesage = {
		from: 'softthrivetest@gmail.com', // sender address
		to: "hassanahmedleo786@gmail.com",
		subject: 'Received Message', // Subject line
		// text: "Message: " + req.body.message, // plain text body
        html: ` <div><text>Message: ${req.body.message}</text><p><a href="http://localhost:3000/admin/support-chat">Click here to replay</a></p></div> `,
	};
	let info = await transporter.sendMail(mesage);

	console.log('Message sent: %s', info.messageId);
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	res.send('Email Sent');
});
module.exports = router;
