const { Router } = require("express");

const welcomeController = require("../controllers/welcome.controller");
const memoryUpload = require("../middlewares/memoryUpload");
const { checkToken } = require("../middlewares/auth.middleware");

const welcomeRouter = Router();

// localhost/
welcomeRouter.get("/", welcomeController.welcomePage);

welcomeRouter.patch(
  "/",
  checkToken,
  memoryUpload.single("image"),
  welcomeController.cloudUpload,
  welcomeController.updateProfileController
);

module.exports = welcomeRouter;
