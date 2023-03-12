const db = require("../configs/postgre");

const userVerification = (body) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, email FROM users WHERE email = $1 AND pass = $2";
    db.query(sql, [body.email, body.pass], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = userVerification;
