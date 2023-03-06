const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/users.controller");

usersRouter.get("/", usersController.getUsers);
usersRouter.post("/", usersController.insertUsers);
usersRouter.put("/:id", usersController.updateUsers);
usersRouter.delete("/:id", usersController.deleteUsers);

module.exports = usersRouter;
