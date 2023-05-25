const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const memoryUpload = require("../middlewares/memoryUpload");
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
  memoryUpload.single("image"),
  profileController.cloudUpload,
  profileController.updateProfileController
);

profileRoute.patch(
  "/teast",
  authMiddleware.checkToken,
  memoryUpload.single("image"),
  profileController.cloudUpload
);

module.exports = profileRoute;
