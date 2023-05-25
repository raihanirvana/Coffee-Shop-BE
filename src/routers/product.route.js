const { Router } = require("express");
const productRouter = Router();
const productController = require("../controllers/product.controller");
const memoryUpload = require("../middlewares/memoryUpload");

const authMiddleware = require("../middlewares/auth.middleware");

productRouter.get("/", productController.getProduct);
productRouter.post(
  "/",
  memoryUpload.single("image"),
  productController.cloudUpload,
  productController.insertProduct
);
productRouter.patch(
  "/:id",
  memoryUpload.single("image"),
  productController.cloudUpload,
  productController.updateProduct
);

productRouter.patch(
  "/updateProfile",
  authMiddleware.checkToken,
  memoryUpload.single("image"),
  productController.cloudUpload,
  productController.updateProfileController
);
productRouter.delete("/:id", productController.deleteProduct);
// productRouter.patch(
//   "/:productId",
//   checkToken,
//   singleUpload("image"),
//   productController.patchImageProducts
// );
module.exports = productRouter;
