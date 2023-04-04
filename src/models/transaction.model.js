const createTransaction = (client, body, id) => {
  return new Promise((resolve, reject) => {
    const { note, status_id, promo_id, payment_id, delivery_id } = body;
    const sql =
      "INSERT INTO transaction (user_id, note, status_id, promo_id, payment_id, delivery_id) values ($1, $2, $3, $4, $5, $6) RETURNING id";
    const values = [id, note, status_id, promo_id, payment_id, delivery_id];
    client.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const createDetailTransaction = (client, body, transactionId) => {
  return new Promise((resolve, reject) => {
    const { products } = body;
    let sql =
      "INSERT INTO transaction_product_sizes (transaction_id, product_id, size_id, qty, subtotal) VALUES ";
    let values = [];
    products.forEach((product, i) => {
      const { product_id, size_id, qty, subtotal } = product;
      if (values.length) sql += ", ";
      sql += `($${1 + 5 * i}, $${2 + 5 * i}, $${3 + 5 * i}, $${4 + 5 * i}, $${
        5 + 5 * i
      })`;
      values.push(transactionId, product_id, size_id, qty, subtotal);
    });
    client.query(sql, values, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const getTransaction = (client, transactionId) => {
  return new Promise((resolve, reject) => {
    const sql = `select u.email, u.address, p."product_name" as "product", s."size" as "size", pr.code as "promo", py."payment" as "payment_method", 
      st."status_name" as "transaction_status", tps.qty, tps.subtotal 
      from transaction_product_sizes tps
      join transaction t on t.id = tps.transaction_id 
      join products p on p.id = tps.product_id 
      join sizes s on s.id = tps.size_id
      join users u on u.id = t.user_id
      join payments py on py.id = t.payment_id 
      join promos pr on pr.id = t.promo_id 
      join status st on st.id = t.status_id where t.id = $1`;
    client.query(sql, [transactionId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = { createTransaction, createDetailTransaction, getTransaction };
