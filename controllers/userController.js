import * as userService from '../services/userService.js';

export const addUser = async (req, res) => {
	const { name, password, email } = req.body;
	try {
		await userService.addUser(name, password, email);
		res.status(200).json({ message: 'data have arrived!' });
	} catch (error) {
		console.error(error);
		res.status(error.statusCode).json({ message: error.message });
	}
};

export const checkUser = async (req, res) => {
	const { sort, value } = req.query;
	const data = await userService.checkUser(sort, value);
	res.status(200).json({ data: data });
};

export const signInUser = async (req, res) => {
	try {
		const { name, password } = req.body;
		const data = await userService.signInUser(name, password);
		res.status(200).json({ data: data });
	} catch (error) {
		console.error(error);
		error.statusCode = 400;
		res.status(error.statusCode).json({ message: error.message });
	}
};

export const checkUserMatch = async (req, res) => {
	try {
		const { name, email } = req.query;
		const data = await userService.checkUserMatch(name, email);
		res.status(200).json({ data: data });
	} catch (error) {
		console.error(error);
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		await userService.resetPassword(name, email, password);
		res.status(200).json({ message: 'PASSWORD RESET' });
	} catch (error) {
		console.error(error);
	}
};
