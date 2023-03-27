import { myDataSource } from '../database/dataBase.js';

export const addUser = async (req, res) => {};

export const checkUser = async (sort, value) => {
	const data = await myDataSource.query(`SELECT * FROM user WHERE ?? = ?`, [
		sort,
		value,
	]);
	return data[0];
};

export const signInUser = async (name) => {
	const [data] = await myDataSource.query(`SELECT * FROM user WHERE name = ?`, [
		name,
	]);
	return data[0];
};
