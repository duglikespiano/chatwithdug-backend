import nodemailer from 'nodemailer';
import { gmailAppPassword } from '../env.js';
import * as mailService from '../services/mailService.js';

export const sendNotificationMail = async (req, res) => {
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
			subject: `[Chat with Dug] user ${name} wants to chat with you`, // Subject line
			html: `Hi,<br>
               User ${name} wants to chat with you</b>.<br>
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

export const sendRequestValidateCodeMail = async (req, res) => {
	try {
		const { email } = req.query;
		const validateCode = mailService.requestValidateCode(email);
		res.status(200).json({ message: `VALIDATE CODE : ${validateCode}` });
	} catch (error) {
		console.error(error);
	}
};

export const checkValidateCode = (req, res) => {
	try {
		const { email, validateCode } = req.body;
		const result = mailService.checkValidateCode(email, validateCode);
		res.status(200).json({ result: result });
	} catch (error) {
		console.error(error);
	}
};
