const { Router } = require("express");

const masterRouter = Router();
const welcomeRouter = require("./welcome.route");
const usersRouter = require("./user.route");
const productRouter = require("./product.route");
const historyRouter = require("./history.route");
const promoRouter = require("./promo.route");
const authRouter = require("./auth.route");

masterRouter.use("/", welcomeRouter);
masterRouter.use("/users", usersRouter);
masterRouter.use("/product", productRouter);
masterRouter.use("/history", historyRouter);
masterRouter.use("/promo", promoRouter);
masterRouter.use("/auth", authRouter);
module.exports = masterRouter;
