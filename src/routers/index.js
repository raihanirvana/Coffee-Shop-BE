const { Router } = require("express");

const masterRouter = Router();
const welcomeRouter = require("./welcome.route");
const usersRouter = require("./user.route");
const productRouter = require("./product.route");
const historyRouter = require("./history.route");
const promoRouter = require("./promo.route");
const authRouter = require("./auth.route");
const commentsRouter = require("./comments.route");
const errorController = require("../controllers/error.controller");
const profileRouter = require("./profile.route");
const productDetailRouter = require("./productdetail.route");
const transactionRouter = require("./transaction.router");

masterRouter.use("/", welcomeRouter);
masterRouter.use("/transactions", transactionRouter);
masterRouter.use("/productdetail", productDetailRouter);
masterRouter.use("/users", usersRouter);
masterRouter.use("/product", productRouter);
masterRouter.use("/history", historyRouter);
masterRouter.use("/promo", promoRouter);
masterRouter.use("/auth", authRouter);
masterRouter.use("/comments", commentsRouter);
masterRouter.get("/error", errorController.getError);
masterRouter.post("/error", errorController.createError);
masterRouter.use("/profile", profileRouter);

module.exports = masterRouter;
