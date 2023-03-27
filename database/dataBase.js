import mysql from 'mysql2';
import { dbName, dbHost, dbUser, dbPassword } from '../env.js';

const pool = mysql.createPool({
	database: dbName,
	host: dbHost,
	user: dbUser,
	password: dbPassword,

	// database: 'chat',
	// host: '127.0.0.1',
	// user: 'root',
	// password: '',
});

export const myDataSource = pool.promise();
myDataSource.getConnection().then(() => console.log('database connected!'));
