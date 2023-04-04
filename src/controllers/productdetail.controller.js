const productdetailModel = require("../models/productdetail.model");

const getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await productdetailModel.getProductDetail(id);
    if (rows.length === 0) {
      res.status(404).json({
        msg: "Product not found",
      });
      return;
    }
    res.status(200).json({
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};
module.exports = {
  getProductDetail,
};
