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

function Users(id, email, password, phone_number) {
  this.id = id;
  this.email = email;
  this.password = password;
  this.phone_number = phone_number;
}

Users.findById = function (id, callback) {
  db.query("SELECT * FROM users WHERE id = $1", [id], function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      if (result.rowCount === 0) {
        callback(null, null);
      } else {
        const row = result.rows[0];
        const users = new Users(
          row.id,
          row.email,
          row.password,
          row.phone_number
        );
        callback(null, users);
      }
    }
  });
};

Users.prototype.save = function (callback) {
  db.query(
    "UPDATE users SET email = $1, password = $2, phone_number = $3 WHERE id = $4 RETURNING *",
    [this.email, this.password, this.phone_number, this.id],
    function (err, result) {
      if (err) {
        callback(err, null);
      } else {
        const updatedUsers = new Users(
          result.rows[0].id,
          result.rows[0].email,
          result.rows[0].password,
          result.rows[0].phone_number
        );
        callback(null, updatedUsers);
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
  Users,
  deleteUsers,
};
