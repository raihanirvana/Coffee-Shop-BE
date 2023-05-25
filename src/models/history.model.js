const db = require("../configs/postgre");

const getHistory = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT h.*, p.product_name, p.price, p.image, s.status_name
    FROM history h
    JOIN products p ON h.product_id = p.id
    JOIN status s ON h.status_id = s.id
    WHERE h.user_id = $1;`;
    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const manageOrder = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT h.*, p.product_name, p.price, p.image, s.status_name
    FROM history h
    JOIN products p ON h.product_id = p.id
    JOIN status s ON h.status_id = s.id
    WHERE h.status_id = 1`;
    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const patchStatusById = (id, status_id) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE history SET status_id = $1 WHERE id = $2`;
    db.query(sql, [status_id, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
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
  manageOrder,
  patchStatusById,
};
