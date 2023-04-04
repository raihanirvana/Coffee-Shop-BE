const db = require("../configs/postgre");

const getUsers = (params) => {
  return new Promise((resolve, reject) => {
    let query =
      "SELECT id,email,phone_number,first_name,last_name,address,display_name,birthday,gender from users";
    let queryParams = [];
    // search filter
    if (params.userId) {
      const userIdQuery = parseInt(params.userId);
      query += " WHERE id = $1";
      queryParams.push(userIdQuery);
    }
    // sort filter
    if (params.sort) {
      const sortQuery = params.sort === "asc" ? "ASC" : "DESC";
      query += ` ORDER BY id ${sortQuery}`;
    } else {
      query += " ORDER BY id ASC";
    }
    // limit filter
    if (params.limit) {
      const limitQuery = parseInt(params.limit);
      query += ` LIMIT $${queryParams.length + 1}`;
      queryParams.push(limitQuery);
    }
    db.query(query, queryParams, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const insertUsers = (body, callback) => {
  let sql =
    "INSERT INTO users (email, pass, role_id, phone_number) VALUES ($1, $2, 1, $3)";
  db.query(sql, [body.email, body.pass, body.phone_number], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.rows);
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

updateUsers = (id, body, callback) => {
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

module.exports = {
  getUsers,
  insertUsers,
  updateUsers,
  deleteUsers,
  getMetaUsers,
};
