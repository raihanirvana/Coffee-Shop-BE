const db = require("../configs/postgre");

const getProduct = (params) => {
  return new Promise((resolve, reject) => {
    let query =
      "select p.id, p.product_name, p.price, c.category_name,p.image from products p join categories c on c.id = p.category_id";
    let queryParams = [];
    if (params.search) {
      const searchQuery = `%${params.search}%`;
      query += " WHERE product_name ILIKE $1";
      queryParams.push(searchQuery);
    }
    if (params.category) {
      query += " WHERE c.id = $1";
      queryParams.push(params.category);
    }
    if (params.sort) {
      switch (params.sort) {
        case "cheapest":
          query += " ORDER BY p.price ASC";
          break;
        case "priciest":
          query += " ORDER BY p.price DESC";
          break;
        case "newest":
          query += " ORDER BY p.id DESC";
          break;
        case "latest":
          query += " ORDER BY p.id ASC";
          break;
        default:
          query += " ORDER BY p.id ASC";
      }
    } else {
      query += " ORDER BY p.id ASC";
    }
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

const insertProduct = (body, fileLink, callback) => {
  const sql =
    "insert into products (product_name,price,category_id,image) values ($1,$2,$3,$4)";
  db.query(
    sql,
    [body.product_name, body.price, body.category_id, fileLink],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.rows);
    }
  );
};

const updateProduct = (id, body, callback) => {
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
  const sql = `UPDATE products SET ${updates.join(", ")} WHERE id = $${
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

const deleteProduct = (id, callback) => {
  db.query(`DELETE FROM products WHERE id = $1`, [id], (err, result) => {
    if (err) {
      callback(err, null);
    }
    callback(null, result.rowCount);
  });
};

module.exports = {
  getProduct,
  getMetaProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
};
