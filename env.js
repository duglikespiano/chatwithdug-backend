import dotenv from 'dotenv';
dotenv.config();

export const serverPort = process.env.SERVER_PORT;
export const jwtSecretKey = process.env.JWT_SECRETKEY;
export const bcryptSaltRounds = process.env.BCRYPT_SALT_ROUNDS;
export const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
export const dbName = process.env.DATABASE_NAME;
export const dbHost = process.env.DATABASE_HOST;
export const dbUser = process.env.DATABASE_USER;
export const dbPassword = process.env.DATABASE_PASSWORD;
