const { Router } = require("express");

const { checkToken } = require("../middlewares/auth.middleware");
const transactionsController = require("../controllers/transaction.controller");

const transactionsRouter = Router();

// /transactions
transactionsRouter.post(
  "/:id",
  checkToken,
  transactionsController.createTransaction
);

module.exports = transactionsRouter;
