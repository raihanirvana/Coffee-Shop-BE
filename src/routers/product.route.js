const { Router } = require("express");
const productRouter = Router();
const productController = require("../controllers/product.controller");

const { singleUpload } = require("../middlewares/diskUpload");
const { checkToken, adminRole } = require("../middlewares/auth.middleware");

productRouter.get("/", productController.getProduct);
productRouter.post(
  "/",
  checkToken,
  adminRole,
  singleUpload("image"),
  productController.insertProduct
);
productRouter.patch(
  "/:id",
  singleUpload("image"),
  productController.updateProduct
);
productRouter.delete("/:id", productController.deleteProduct);
// productRouter.patch(
//   "/:productId",
//   checkToken,
//   singleUpload("image"),
//   productController.patchImageProducts
// );
module.exports = productRouter;
