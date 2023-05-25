const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const memoryUpload = require("../middlewares/memoryUpload");

usersRouter.get(
  "/",
  authMiddleware.checkToken,
  usersController.getUsersHandler
);
usersRouter.post("/", usersController.insertUsers);
usersRouter.patch(
  "/updateUser/:id",
  authMiddleware.checkToken,
  memoryUpload.single("image"),
  usersController.updateUser
);
usersRouter.delete("/:id", usersController.deleteUsers);

module.exports = usersRouter;
