const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller");
const authRouter = Router();

authRouter.post("/", authController.login);
authRouter.post(
  "/private",
  authMiddleware.checkToken,
  authController.privateAcsess
);
authRouter.patch("/", authMiddleware.checkToken, authController.editPass);
authRouter.post("/register", authController.register);

module.exports = authRouter;
