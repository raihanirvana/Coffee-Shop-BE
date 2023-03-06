const { Router } = require("express");
const productRouter = Router();
const productController = require("../controllers/product.controller");

productRouter.get("/", productController.getProduct);
productRouter.post("/", productController.insertProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

module.exports = productRouter;
