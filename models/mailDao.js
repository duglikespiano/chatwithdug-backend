import { myDataSource } from '../database/dataBase.js';

export const sendTestRequestMail = async (userName) => {
	const [data] = await myDataSource.query(`SELECT * FROM user WHERE name = ?`, [
		userName,
	]);
	return data[0];
};
