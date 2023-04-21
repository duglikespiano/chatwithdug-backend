import { myDataSource } from '../database/dataBase.js';

export const addUser = async (name, hashedPassword, email) => {
	await myDataSource.query(
		`INSERT INTO user (name, password, email)VALUES (?, ?, ?)`,
		[name, hashedPassword, email]
	);
};

export const checkUser = async (sort, value) => {
	return await myDataSource.query(
		`SELECT * FROM user WHERE ${sort} = '${value}'`
	);
};

export const signInUser = async (name) => {
	return await myDataSource.query(`SELECT * FROM user WHERE name = ?`, [name]);
};

export const checkUserMatch = async (name, email) => {
	return await myDataSource.query(
		`SELECT * FROM user WHERE name = ? AND email = ?`,
		[name, email]
	);
};

export const resetPassword = async (name, email, hashedPassword) => {
	await myDataSource.query(
		`UPDATE user SET password = ? WHERE name = ? AND email = ?`,
		[hashedPassword, name, email]
	);
};
