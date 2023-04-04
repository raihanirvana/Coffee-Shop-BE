const db = require("../configs/postgre");

const transactionsModel = require("../models/transaction.model");
const createTransaction = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const result = await transactionsModel.createTransaction(client, body, id);
    const transactionId = result.rows[0].id;
    await transactionsModel.createDetailTransaction(
      client,
      body,
      transactionId
    );
    await client.query("COMMIT");
    const transactionWithDetail = await transactionsModel.getTransaction(
      client,
      transactionId
    );
    client.release();
    res.status(200).json({
      data: transactionWithDetail.rows,
      msg: "OK",
    });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    client.release();
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = { createTransaction };
