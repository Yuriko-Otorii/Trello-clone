const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file.....");
}

module.exports = {
  port: process.env.PORT,
  databaseURL: process.env.MONGODB_URI,
  databaseName: process.env.MONGODB_DBNAME,
  jwtSecret: process.env.JWT_SECRET,
  salt: Number(process.env.SALT),
  api: {
    prefix: '/api',
  },
  rootDir: process.cwd(),
};
