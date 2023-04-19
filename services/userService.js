import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userDao from '../models/userDao.js';
import { jwtSecretKey, bcryptSaltRounds } from '../env.js';

export const addUser = async (name, password, email) => {
	await bcrypt
		.hash(password, parseInt(bcryptSaltRounds))
		.then((hashedPassword) => userDao.addUser(name, hashedPassword, email));
};

export const checkUser = async (sort, value) => {
	return await userDao.checkUser(sort, value);
};

export const signInUser = async (nameInput, passwordInput) => {
	const [data] = await userDao.signInUser(nameInput);
	if (data !== undefined) {
		const { name, password, email } = data;
		return await bcrypt.compare(passwordInput, password).then((result) => {
			if (result === true) {
				return {
					token: jwt.sign({ name: name, email: email }, jwtSecretKey),
					name: name,
					email: email,
				};
			}
		});
	} else {
		throw new Error('NO USER DATA IN DB');
	}
};

export const checkUserMatch = async (name, email) => {
	return await userDao.checkUserMatch(name, email);
};

export const resetPassword = async (name, email, password) => {
	await bcrypt
		.hash(password, parseInt(bcryptSaltRounds))
		.then((hashedPassword) =>
			userDao.resetPassword(name, email, hashedPassword)
		);
};
