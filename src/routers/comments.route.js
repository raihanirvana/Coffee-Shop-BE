const { Router } = require("express");
const commentsController = require("../controllers/comments.controller");

const commentsRouter = Router();

commentsRouter.post("/error", commentsController.logError);

module.exports = commentsRouter;
