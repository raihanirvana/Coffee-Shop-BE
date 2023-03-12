const db = require("../configs/postgre");

const getHistory = (params, callback) => {
  let query = "SELECT id, name, price, status, table_number FROM history";

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

const insertHistory = (body, callback) => {
  db.query(
    `insert into history(name,price,status,table_number) values ('${body.name}',${body.price},'${body.status}','${body.table_number}')`,
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
  db.query(
    `UPDATE history SET name = '${body.name}', price = ${body.price}, table_number = ${body.table_number}, status = '${body.status}' WHERE id = ${id}`,
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
