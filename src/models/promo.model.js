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

function Promo(id, promo_name, coupon_code, expired) {
  this.id = id;
  this.promo_name = promo_name;
  this.coupon_code = coupon_code;
  this.expired = expired;
}

Promo.findById = function (id, callback) {
  db.query("SELECT * FROM promo WHERE id = $1", [id], function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      if (result.rowCount === 0) {
        callback(null, null);
      } else {
        const row = result.rows[0];
        const promo = new Promo(
          row.id,
          row.promo_name,
          row.coupon_code,
          row.expired
        );
        callback(null, promo);
      }
    }
  });
};

Promo.prototype.save = function (callback) {
  db.query(
    "UPDATE promo SET promo_name = $1, coupon_code = $2, expired = $3 WHERE id = $4 RETURNING *",
    [this.promo_name, this.coupon_code, this.expired, this.id],
    function (err, result) {
      if (err) {
        callback(err, null);
      } else {
        const updatedPromo = new Promo(
          result.rows[0].id,
          result.rows[0].promo_name,
          result.rows[0].coupon_code,
          result.rows[0].expired
        );
        callback(null, updatedPromo);
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
  Promo,
  deletePromo,
};
