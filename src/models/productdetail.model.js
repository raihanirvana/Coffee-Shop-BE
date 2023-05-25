const db = require("../configs/postgre");

const getProductDetail = (id) => {
  return new Promise((resolve, reject) => {
    let query =
      "select p.id, p.product_name, p.price, p.category_id,p.image,p.description from products p join categories c on c.id = p.category_id WHERE p.id = $1";
    db.query(query, [id], (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result.rows[0]);
    });
  });
};

module.exports = {
  getProductDetail,
};
