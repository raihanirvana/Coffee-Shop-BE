const { Router } = require("express");
const historyRouter = Router();
const historyController = require("../controllers/history.controller");

historyRouter.get("/", historyController.getHistory);
historyRouter.post("/", historyController.insertHistory);
historyRouter.put("/:id", historyController.updateHistory);
historyRouter.delete("/:id", historyController.deleteHistory);

module.exports = historyRouter;
