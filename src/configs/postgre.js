const { Pool } = require("pg");

const { host, db, dbPort, user, pwd } = require("./environment");

const pool = new Pool({
  user,
  host,
  database: db,
  password: pwd,
  port: dbPort,
});

module.exports = pool;
