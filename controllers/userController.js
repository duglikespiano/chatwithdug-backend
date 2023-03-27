import * as userService from '../services/userService.js';

export const addUser = async (req, res) => {
	const { name, password, email } = req.body;
	try {
		await userService.addUser(name, password, email);
	} catch (error) {
		console.error(error);
	}
	res.status(200).json({ message: 'data have arrived!' });
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
	}
};
