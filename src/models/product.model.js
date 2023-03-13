const db = require("../configs/postgre");

const getProduct = (params) => {
  return new Promise((resolve, reject) => {
    let query =
      "select p.id, p.product_name, p.price, c.category_name from products p join categories c on c.id = p.category_id";
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
    db.query(query, queryParams, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const getMetaProducts = (params) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT COUNT(*) AS total_data FROM products p";
    let queryParams = [];
    // search filter
    if (params.search) {
      const searchQuery = `%${params.search}%`;
      query += " WHERE p.product_name ILIKE $1";
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

// const insertProduct = (body, callback) => {
//   db.query(
//     `insert into product (name,price,category_id) values ('${body.name}',${body.price},${body.category_id})`,
//     (err, result) => {
//       if (err) {
//         callback(err, null);
//       } else {
//         callback(null, result.rows);
//       }
//     }
//   );
// };
// const updateProduct = (id, body, callback) => {
//   db.query(
//     `UPDATE product SET name = '${body.name}', price = ${body.price} WHERE id = ${id}`,
//     (err, result) => {
//       if (err) {
//         callback(err, null);
//       } else {
//         callback(null, result.rows);
//       }
//     }
//   );
// };

// const deleteProduct = (id, callback) => {
//   db.query(`DELETE FROM product WHERE id = $1`, [id], (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result.rowCount);
//     }
//   });
// };

const updateImageProducts = (fileLink, productId) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE products SET image = $1 WHERE id = $2 RETURNING *";
    db.query(sql, [fileLink, productId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getProduct,
  getMetaProducts,
  updateImageProducts,
};
