import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../env.js';

export const findUserByToken = (token) => {
	try {
		const { name } = jwt.decode(token, jwtSecretKey);
		return name;
	} catch (error) {
		console.error('token이없어');
	}
};
