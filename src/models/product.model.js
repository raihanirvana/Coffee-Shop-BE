const db = require("../configs/postgre");

const getProduct = (params) => {
  return new Promise((resolve, reject) => {
    let query =
      "SELECT p.id, p.product_name, p.price, c.category_name, p.image FROM products p JOIN categories c ON c.id = p.category_id";
    let queryParams = [];
    if (params.search) {
      const searchQuery = `%${params.search}%`;
      query += " WHERE p.product_name ILIKE $1";
      queryParams.push(searchQuery);
    }
    if (params.category) {
      if (queryParams.length === 0) {
        query += " WHERE";
      } else {
        query += " AND";
      }
      query += " c.id = $" + (queryParams.length + 1);
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
    if (params.page && params.limit) {
      const offset = (parseInt(params.page) - 1) * parseInt(params.limit);
      query += ` OFFSET $${queryParams.length + 1}`;
      queryParams.push(offset);
    }
    if (params.limit) {
      const limitQuery = parseInt(params.limit);
      query += ` LIMIT $${queryParams.length + 1}`;
      queryParams.push(limitQuery);
    }
    query += ";";
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
    let query =
      "SELECT COUNT(*) AS total_data FROM (SELECT p.id FROM products p JOIN categories c ON c.id = p.category_id";
    let queryParams = [];
    // search filter
    if (params.search) {
      const searchQuery = `%${params.search}%`;
      query += " WHERE p.product_name ILIKE $1";
      queryParams.push(searchQuery);
    }
    // category filter
    if (params.category) {
      if (queryParams.length === 0) {
        query += " WHERE";
      } else {
        query += " AND";
      }
      query += " c.id = $" + (queryParams.length + 1);
      queryParams.push(params.category);
    }
    query += ") AS products";
    db.query(query, queryParams, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      const totalData = parseInt(result.rows[0].total_data);
      const page = parseInt(params.page) || 1;
      const limit = parseInt(params.limit) || 10;
      const totalPage = Math.ceil(totalData / limit);
      let next = "";
      let prev = "";
      if (page > 1) {
        prev = `/product?page=${page - 1}&limit=${limit}`;
      }
      if (page < totalPage) {
        next = `/product?page=${page + 1}&limit=${limit}`;
      }
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

const insertProduct = (body, uploadResult, callback) => {
  const sql =
    "insert into products (product_name,price,category_id,image,description) values ($1,$2,$3,$4,$5)";
  db.query(
    sql,
    [
      body.product_name,
      body.price,
      body.category_id,
      uploadResult,
      body.description,
    ],
    (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.rows);
    }
  );
};

const updateProduct = (id, body) => {
  return new Promise((resolve, reject) => {
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

    db.query(sql, values)
      .then((result) => {
        console.log(sql);
        resolve(result.rows);
      })
      .catch((err) => {
        reject(err);
      });
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

const updateProfile = (id, body) => {
  return new Promise((resolve, reject) => {
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
    console.log(sql);
    db.query(sql, values)
      .then((result) => {
        console.log(sql);
        resolve(result.rows);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports = {
  getProduct,
  getMetaProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
  updateProfile,
};
