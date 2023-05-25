const db = require("../configs/postgre");

const inputProfile = (id, body) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO userdata (user_id, first_name, last_name, display_name, address,birthday) VALUES ($1, $2, $3, $4, $5,$6)";
    db.query(
      sql,
      [
        id,
        body.first_name,
        body.last_name,
        body.display_name,
        body.address,
        body.birthday,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
};

const updateProfile = (id, body, callback) => {
  let updates = [];
  let values = [];
  Object.keys(body).forEach((key, index) => {
    console.log(body[key]);
    if (body[key] !== undefined) {
      updates.push(`${key} = $${index + 1}`);
      values.push(body[key]);
    }
  });
  values.push(id);
  const sql = `UPDATE users SET ${updates.join(", ")} WHERE id = $${
    values.length
  }`;
  db.query(sql, values, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    console.log(sql);
    callback(null, result.rows);
  });
};

module.exports = {
  inputProfile,
  updateProfile,
};
