import NodeCache from 'node-cache';
import nodemailer from 'nodemailer';
import { gmailAddress, gmailName, gmailAppPassword } from '../env.js';
const myCache = new NodeCache();

export const requestValidateCode = (email) => {
	const generateRandomCode = (n) => {
		let str = '';
		for (let i = 0; i < n; i++) {
			str += Math.floor(Math.random() * 10);
		}
		return str;
	};

	const validateCode = generateRandomCode(6);

	myCache.del(email);
	myCache.set(email, validateCode, 180);

	const main = async (email, validateCode) => {
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: gmailAddress, // generated ethereal user
				pass: gmailAppPassword, // generated ethereal password
			},
		});

		// send mail with defined transport object
		await transporter.sendMail({
			to: email, // list of receivers
			from: {
				name: gmailName,
				address: gmailAddress,
			},
			subject: '[Chat with Dug] validation code for sign up', // Subject line
			html: `Hi,<br>
           your email validation code is <b>${validateCode}</b>.<br>
           Please input your validation code on sign up page.<br>
           This validation code expires in <b>3mins<b><br>
           Thanks!`, // html body
		});
	};

	main(email, validateCode).catch(console.error);

	return validateCode;
};

export const checkValidateCode = (email, validateCode) => {
	const value = myCache.get(email);
	if (validateCode === value) {
		return true;
	} else {
		return false;
	}
};
