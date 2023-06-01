import mariadb from 'mariadb';
import { dbName, dbHost, dbUser, dbPassword, dbPort } from '../env.js';

export const myDataSource = mariadb.createPool({
	host: dbHost,
	port: dbPort,
	user: dbUser,
	password: dbPassword,
	database: dbName,
});

myDataSource.getConnection().then(() => console.log('database connected!'));
