const db = require("../configs/postgre");

const inputProfile = (id, body) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO userdata (user_id, first_name, last_name, display_name, address) VALUES ($1, $2, $3, $4, $5)";
    db.query(
      sql,
      [id, body.first_name, body.last_name, body.display_name, body.address],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
};

module.exports = {
  inputProfile,
};
