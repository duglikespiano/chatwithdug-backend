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
	const { name, password, email } = await userDao.signInUser(nameInput);
	return await bcrypt.compare(passwordInput, password).then((result) => {
		if (result === true) {
			return {
				token: jwt.sign({ name: name, email: email }, jwtSecretKey),
				name: name,
				email: email,
			};
		}
	});
};
