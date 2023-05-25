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

transactionsRouter.get(
  "/",
  checkToken,
  transactionsController.getHistoryHandler
);
module.exports = transactionsRouter;
