const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

usersRouter.get("/", usersController.getUsers);
usersRouter.post("/", usersController.insertUsers);
usersRouter.patch(
  "/updateUser/:id",
  authMiddleware.checkToken,
  usersController.updateUser
);
usersRouter.delete("/:id", usersController.deleteUsers);

module.exports = usersRouter;
