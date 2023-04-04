const db = require("../configs/postgre");

const getProductDetail = (id) => {
  return new Promise((resolve, reject) => {
    let query =
      "select p.id, p.product_name, p.price, c.category_name,p.image,p.description from products p join categories c on c.id = p.category_id WHERE p.id = $1";
    db.query(query, [id], (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result.rows);
    });
  });
};

module.exports = {
  getProductDetail,
};
