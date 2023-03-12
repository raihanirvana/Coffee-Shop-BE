const db = require("../configs/postgre");

const getUsers = (callback) => {
  db.query(
    "select id,email, role, phone_number from users order by id asc",
    callback
  );
};

const insertUsers = (body, callback) => {
  let sql =
    "INSERT INTO users (email, pass, role, phone_number) VALUES ($1, $2, $3, $4)";
  db.query(
    sql,
    [body.email, body.pass, body.role, body.phone_number],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.rows);
    }
  );
};

const updateUsers = (id, body, callback) => {
  let sql =
    "UPDATE users SET email = $1, pass = $2,role = $3, phone_number = $4 WHERE id = $5";
  db.query(
    sql,
    [body.email, body.pass, body.role, body.phone_number, id],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    }
  );
};

const deleteUsers = (id, callback) => {
  db.query(`DELETE FROM users WHERE id = $1`, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.rowCount);
    }
  });
};

module.exports = {
  getUsers,
  insertUsers,
  updateUsers,
  deleteUsers,
};
