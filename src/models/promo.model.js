const db = require("../configs/postgre");

const getPromo = (callback) => {
  db.query(
    "select id,promo_name,coupon_code,expired from promo order by id asc",
    callback
  );
};

const insertPromo = (body, callback) => {
  db.query(
    `insert into promo(promo_name,coupon_code,expired) values ('${body.promo_name}','${body.coupon_code}','${body.expired}')`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    }
  );
};

const updatePromo = (id, body, callback) => {
  db.query(
    `UPDATE promo SET promo_name = '${body.promo_name}', coupon_code = '${body.coupon_code}', expired = '${body.expired}' WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
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
