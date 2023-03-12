module.exports = {
  host: process.env.DB_HOST,
  db: process.env.DB_NAME,
  dbport: process.env.DB_PORT,
  user: process.env.DB_USER,
  pwd: process.env.DB_PWD,
  serverPort: process.env.SERVER_PORT,
  jwtSecret: process.env.SECRETKEY,
};
