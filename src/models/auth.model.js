const db = require("../configs/postgre");

const userVerification = (body) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT id, email,pass,phone_number,role_id,first_name,last_name,address,display_name,birthday,gender,image FROM users WHERE email = $1";
    db.query(sql, [body.email], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};
const checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT email, phone_number FROM users WHERE email = $1";
    db.query(sqlQuery, [email], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const checkPhoneNumber = (phone_number) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT phone_number FROM users WHERE phone_number = $1";
    db.query(sqlQuery, [phone_number], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
// const storeToken = (userId, token) => {
//   return new Promise((resolve, reject) => {
//     const sql = "UPDATE users SET token = $1 WHERE id = $2";
//     db.query(sql, [token, userId], (err, result) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(result);
//     });
//   });
// };

// const deleteToken = (id) => {
//   return new Promise((resolve, reject) => {
//     const sql = "UPDATE users SET token = null WHERE id = $1";
//     db.query(sql, [id], (err, result) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(result);
//     });
//   });
// };

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

const getPassword = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT u.pass FROM users u WHERE id = $1";
    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const editPassword = (newPassword, id) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET pass = $1 WHERE id = $2";
    db.query(sql, [newPassword, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const register = (body) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users (email, pass, role_id, phone_number) VALUES ($1, $2, 1, $3)";
    db.query(sql, [body.email, body.pass, body.phone_number], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const getEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT email FROM users WHERE email = $1";
    db.query(sql, [email], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const addOTP = (otp, otp_expiration, email) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE users SET otp = $1, otp_expiration = $2 WHERE email = $3";
    db.query(sql, [otp, otp_expiration, email], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getOTP = (otp) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT otp, otp_expiration FROM users WHERE otp = $1";
    db.query(sql, [otp], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const changeForgotpass = (email, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET pass = $1 WHERE otp = $2";
    db.query(sql, [hashedPassword, email], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  userVerification,
  getPassword,
  editPassword,
  register,
  getEmail,
  // storeToken,
  // deleteToken,
  isTokenBlacklisted,
  addToBlacklist,
  addOTP,
  getOTP,
  changeForgotpass,
  checkEmail,
  checkPhoneNumber,
};
