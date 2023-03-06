const { Router } = require("express");
const promoRouter = Router();
const promoController = require("../controllers/promo.controller");

promoRouter.get("/", promoController.getPromo);
promoRouter.post("/", promoController.insertPromo);
promoRouter.put("/:id", promoController.updatePromo);
promoRouter.delete("/:id", promoController.deletePromo);

module.exports = promoRouter;
