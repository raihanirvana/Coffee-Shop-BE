const productModel = require("../models/product.model");

const getProduct = async (req, res) => {
  try {
    const { query } = req;
    const { rows } = await productModel.getProduct(query);
    if (rows.length === 0) {
      res.status(404).json({
        msg: "Product not found",
      });
      return;
    }
    const meta = await productModel.getMetaProducts(query);
    res.status(200).json({
      data: rows,
      meta,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

const insertProduct = (req, res) => {
  const fileLink = `/images/${req.file.filename}`;
  const { body } = req;
  productModel.insertProduct(body, fileLink, (err, result) => {
    if (fileLink == undefined) {
      return res.status(400).json({
        msg: "tidak iso",
      });
    }
    if (err) {
      if (err.status === 400) {
        res.status(400).json({
          msg: "the server cannot or will not process the request due to something that is perceived to be a client error",
        });
        return;
      } else {
        res.status(500).json({
          msg: "Internal server error",
        });
        return;
      }
    } else {
      res.status(201).json({
        data: result,
      });
    }
  });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const fileLink = req.file ? `/images/${req.file.filename}` : null;
  const updateFields = {};
  if (body.product_name) updateFields.product_name = body.product_name;
  if (body.price) updateFields.price = body.price;
  if (body.category_id) updateFields.category_id = body.category_id;
  if (fileLink) updateFields.image = fileLink;
  productModel.updateProduct(id, updateFields, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
      return;
    }
    if (result.rowCount === 0) {
      res.status(404).json({
        message: `Product with id ${id} not found`,
      });
      return;
    }
    res.status(200).json({
      message: "Product updated successfully",
    });
  });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  productModel.deleteProduct(id, (err, result) => {
    if (err) {
      res.status(500).json({
        error: "Internal server error",
      });
    } else if (result === 0) {
      res.status(404).json({
        error: "Product not found",
      });
    } else if (result >= 300 && result < 400) {
      res.status(result).json({
        error: "Client error",
      });
    } else if (result >= 400) {
      res.status(result).json({
        error: "Server error",
      });
    } else {
      res.status(204).send();
    }
  });
};

// const patchImageProducts = async (req, res) => {
//   const fileLink = `/images/${req.file.filename}`;
//   try {
//     const result = await productModel.updateImageProducts(
//       fileLink,
//       req.params.productId
//     );
//     res.status(200).json({
//       data: result.rows,
//       msg: "update image success",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       msg: "internal server error",
//     });
//   }
// };

module.exports = {
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
};
