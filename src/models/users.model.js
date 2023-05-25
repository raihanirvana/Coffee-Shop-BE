const db = require("../configs/postgre");

const getUsers = (id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT email, phone_number, first_name, last_name, address, display_name, birthday, gender, image FROM users WHERE id = $1";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const insertUsers = (body) => {
  return new Promise((resolve, reject) => {
    let sql =
      "INSERT INTO users (email, pass, role_id, phone_number) VALUES ($1, $2, 1, $3)";
    db.query(sql, [body.email, body.pass, body.phone_number], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result.rows);
    });
  });
};

const getMetaUsers = (params) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT COUNT(*) AS total_data FROM users u";
    let queryParams = [];
    // search filter
    if (params.search) {
      const searchQuery = `%${params.search}%`;
      query += " WHERE email ILIKE $1";
      queryParams.push(searchQuery);
    }
    db.query(query, queryParams, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      const totalData = parseInt(result.rows[0].total_data);
      const page = parseInt(params.page) || 1;
      const limit = parseInt(params.limit) || 5;
      const totalPage = Math.ceil(totalData / limit);
      let next = "";
      let prev = "";
      if (page === 1) prev = null;
      if (page === totalPage) next = null;
      const meta = {
        totalData,
        next,
        prev,
        totalPage,
      };
      resolve(meta);
    });
  });
};

const updateUsers = (id, body, callback) => {
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
const deleteUsers = (id, callback) => {
  db.query(`DELETE FROM users WHERE id = $1`, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.rowCount);
    }
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

module.exports = {
  getUsers,
  insertUsers,
  updateUsers,
  deleteUsers,
  getMetaUsers,
  checkEmail,
  checkPhoneNumber,
};
