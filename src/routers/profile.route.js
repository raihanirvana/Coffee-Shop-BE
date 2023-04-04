const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const profileController = require("../controllers/profile.controller");
const profileRoute = Router();

profileRoute.post(
  "/",
  authMiddleware.checkToken,
  profileController.insertProfile
);
profileRoute.patch(
  "/updateProfile",
  authMiddleware.checkToken,
  profileController.updateProfileController
);

module.exports = profileRoute;
