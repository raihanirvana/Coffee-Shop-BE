const db = require("../configs/postgre");

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
  updateProfile,
};
