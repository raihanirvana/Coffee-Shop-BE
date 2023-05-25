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
    transactionsModel.insertHistory(client, body, id);
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
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const getHistoryHandler = async (req, res) => {
  const { id } = req.authInfo;
  try {
    const result = await transactionsModel.getHistory(id);
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
    });
    console.log(error);
  }
};
module.exports = { createTransaction, getHistoryHandler };
