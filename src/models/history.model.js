const db = require("../configs/postgre");

const getHistory = (params, callback) => {
  let query =
    "SELECT p.product_name AS product, s.status_name AS status FROM history h JOIN products p ON p.id = h.product_id JOIN status s ON s.id = h.status_id";
  let queryParams = [];
  // search filter
  if (params.search) {
    const searchQuery = `%${params.search}%`;
    query += " WHERE p.product_name ILIKE $1 OR s.status_name ILIKE $1";
    queryParams.push(searchQuery);
  }
  // sort filter
  if (params.sort) {
    const sortQuery = params.sort === "asc" ? "ASC" : "DESC";
    query += ` ORDER BY h.id ${sortQuery}`;
  } else {
    query += " ORDER BY h.id ASC";
  }
  // limit filter
  if (params.limit) {
    const limitQuery = parseInt(params.limit);
    query += ` LIMIT $${queryParams.length + 1}`;
    queryParams.push(limitQuery);
  }
  db.query(query, queryParams, callback);
};

const insertHistory = (body, callback) => {
  const sql =
    "INSERT INTO history (product_id, status_id, table_name) VALUES ($1, $2, $3)";
  db.query(
    sql,
    [body.product_id, body.status_id, body.table_name],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    }
  );
};

const updateHistory = (id, body, callback) => {
  const sql = `UPDATE history SET product_id=$1, status_id=$2, table_name=$3 WHERE id=$4`;
  db.query(
    sql,
    [body.product_id, body.status_id, body.table_name, id],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    }
  );
};

const deleteHistory = (id, callback) => {
  db.query(`DELETE FROM history WHERE id = $1`, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.rowCount);
    }
  });
};

module.exports = {
  getHistory,
  insertHistory,
  updateHistory,
  deleteHistory,
};
