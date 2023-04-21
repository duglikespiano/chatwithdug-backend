import * as validateCodeService from '../services/validateService.js';

export const requestValidateCode = async (req, res) => {
	try {
		const { email } = req.query;
		const validateCode = validateCodeService.requestValidateCode(email);
		res.status(200).json({ message: `VALIDATE CODE : ${validateCode}` });
	} catch (error) {
		console.error(error);
	}
};

export const checkValidateCode = (req, res) => {
	try {
		const { email, validateCode } = req.body;
		const result = validateCodeService.checkValidateCode(email, validateCode);
		res.status(200).json({ result: result });
	} catch (error) {
		console.error(error);
	}
};
