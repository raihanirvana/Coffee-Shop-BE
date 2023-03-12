const db = require("../configs/postgre");

const getProduct = (params, callback) => {
  let query =
    "select  p.id,p.product_name ,p.price,c.category_name  from products p join categories c on c.id =p.category_id ";
  let queryParams = [];
  // search filter
  if (params.search) {
    const searchQuery = `%${params.search}%`;
    query += " WHERE product_name ILIKE $1";
    queryParams.push(searchQuery);
  }
  // sort filter
  if (params.sort) {
    const sortQuery = params.sort === "asc" ? "ASC" : "DESC";
    query += ` ORDER BY p.id ${sortQuery}`;
  } else {
    query += " ORDER BY p.id ASC";
  }
  // limit filter
  if (params.limit) {
    const limitQuery = parseInt(params.limit);
    query += ` LIMIT $${queryParams.length + 1}`;
    queryParams.push(limitQuery);
  }
  db.query(query, queryParams, callback);
};

const insertProduct = (body, callback) => {
  db.query(
    `insert into product (name,price,category_id) values ('${body.name}',${body.price},${body.category_id})`,
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
