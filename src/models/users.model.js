const db = require("../configs/postgre");

const getUsers = (callback) => {
  db.query(
    "select id,email, display_name, birth from users order by id asc",
    callback
  );
};

const insertUsers = (body, callback) => {
  db.query(
    `insert into users(email,password,phone_number) values ('${body.email}','${body.password}','${body.phone_number}')`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    }
  );
};

const updateUsers = (id, body, callback) => {
  db.query(
    `UPDATE users SET email = '${body.email}', password = '${body.password}', phone_number = '${body.phone_number}' WHERE id = ${id}`,
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
