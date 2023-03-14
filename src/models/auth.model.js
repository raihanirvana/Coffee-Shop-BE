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

const storeToken = (userId, token) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET token = $1 WHERE id = $2";
    db.query(sql, [token, userId], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const deleteToken = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET token = null WHERE id = $1";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const addToBlacklist = (token) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO blacklist_token (token) VALUES ($1)";
    db.query(sql, [token], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const isTokenBlacklisted = (token) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT token FROM blacklist_token WHERE token = $1";
    db.query(sql, [token], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.rows.length > 0);
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

const getEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT email FROM users WHERE email = $1 LIMIT 1";
    db.query(sql, [email], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  userVerification,
  getPassword,
  editPassword,
  registerALL,
  getEmail,
  storeToken,
  deleteToken,
  isTokenBlacklisted,
  addToBlacklist,
};
