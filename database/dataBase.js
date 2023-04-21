import mariadb from 'mariadb';
import { dbName, dbHost, dbUser, dbPassword } from '../env.js';

export const myDataSource = mariadb.createPool({
	database: dbName,
	host: dbHost,
	user: dbUser,
	password: dbPassword,
});

myDataSource.getConnection().then(() => console.log('database connected!'));
