const { Router } = require("express");
const productRouter = Router();
const productController = require("../controllers/product.controller");

const { singleUpload } = require("../middlewares/diskUpload");
const { checkToken } = require("../middlewares/auth.middleware");

productRouter.get("/", productController.getProduct);
// productRouter.post("/", productController.insertProduct);
// productRouter.put("/:id", productController.updateProduct);
// productRouter.delete("/:id", productController.deleteProduct);
productRouter.patch(
  "/:productId",
  checkToken,
  singleUpload("image"),
  productController.patchImageProducts
);
module.exports = productRouter;
