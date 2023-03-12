const db = require("../configs/postgre");

const getPromo = (query, callback) => {
  db.query(
    "select id,code,discount,product_id from promos order by id asc",
    callback
  );
};

const insertPromo = (body, callback) => {
  let sql =
    "INSERT INTO promos (code, discount, product_id) VALUES ($1, $2, $3)";
  db.query(sql, [body.code, body.discount, body.product_id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.rows);
    }
  });
};

const updatePromo = (id, body, callback) => {
  let sql =
    "UPDATE promos SET code = $1, discount = $2, product_id = $3 WHERE id = $4";
  db.query(
    sql,
    [body.code, body.discount, body.product_id, id],
    (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result.rows);
    }
  );
};

const deletePromo = (id, callback) => {
  db.query(`DELETE FROM promo WHERE id = $1`, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.rowCount);
    }
  });
};

module.exports = {
  getPromo,
  insertPromo,
  updatePromo,
  deletePromo,
};
