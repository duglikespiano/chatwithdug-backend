import * as mailService from '../services/mailService.js';
import nodemailer from 'nodemailer';
import { gmailAppPassword } from '../env.js';

export const sendTestRequestMail = async (req, res) => {
	try {
		const { name, email } = req.body;
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'notificationfromdug@gmail.com', // generated ethereal user
				pass: gmailAppPassword, // generated ethereal password
			},
		});

		// send mail with defined transport object
		await transporter.sendMail({
			to: 'notificationfromdug@gmail.com', // list of receivers
			subject: `[Chat with Dug] user ${name} is waiting to chat with you`, // Subject line
			html: `Hi,<br>
               User ${name} is waiting to chat with you</b>.<br>
               Guest's email is ${email}.<br>
               You gotta hurry!<br>
               Go!`, // html body
		});
		res.status(200).json({ message: 'NOTIFICATION MAIL SENT' });
	} catch (error) {
		console.error(error);
		error.statusCode = 400;
		res.status(error.statusCode).json({ message: error.message });
	}
};
