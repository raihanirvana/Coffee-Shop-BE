const db = require("../configs/postgre");

const getProduct = (params, callback) => {
  let query = "SELECT id, name, price, category_id FROM product";

  // search filter
  if (params.search) {
    const searchQuery = `%${params.search}%`;
    query += " WHERE name ILIKE $1";
    db.query(query, [searchQuery], callback);
  } else {
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
      query += ` LIMIT ${limitQuery}`;
    }
    db.query(query, [], callback);
  }
};

const insertProduct = (body, callback) => {
  db.query(
    `insert into product(name,price) values ('${body.name}',${body.price})`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    }
  );
};

const updateProduct = (id, body, callback) => {
  db.query(
    `UPDATE product SET name = '${body.name}', price = ${body.price} WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    }
  );
};

const deleteProduct = (id, callback) => {
  db.query(`DELETE FROM product WHERE id = $1`, [id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.rowCount);
    }
  });
};
module.exports = {
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
};
