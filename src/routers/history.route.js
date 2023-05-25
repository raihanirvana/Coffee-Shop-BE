const { Router } = require("express");
const historyRouter = Router();
const historyController = require("../controllers/history.controller");
const { checkToken } = require("../middlewares/auth.middleware");

historyRouter.get("/", checkToken, historyController.getHistoryHandler);
historyRouter.get("/manage", historyController.getManageOrder);
historyRouter.post("/", historyController.insertHistory);
historyRouter.put("/:id", historyController.updateHistory);
historyRouter.delete("/:id", checkToken, historyController.deleteHistory);
historyRouter.patch("/:ids", historyController.patchStatus);

module.exports = historyRouter;
