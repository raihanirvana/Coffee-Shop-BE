const db = require("../configs/postgre");

const userVerification = (body) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, pass FROM users WHERE email = $1";
    db.query(sql, [body.email], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getPassword = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT u.pass FROM users u WHERE id = $1";
    db.query(sql, [userId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const editPassword = (newPassword, userId) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET pass = $1 WHERE id = $2";
    db.query(sql, [newPassword, userId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const registerALL = (body) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users (email,pass,role,phone_number) VALUES ($1,$2,$3,$4)";
    db.query(
      sql,
      [body.email, body.pass, body.role, body.phone_number],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};
module.exports = { userVerification, getPassword, editPassword, registerALL };
