const { Router } = require("express");
const productDetailRouter = Router();
const productDetailController = require("../controllers/productdetail.controller");

productDetailRouter.get("/:id", productDetailController.getProductDetail);

module.exports = productDetailRouter;
