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
        console.log(err);
        res.status(500).json({
          msg: "iki ngapa cok",
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
    }
    res.status(204).json({
      msg: "Delete Product Succsess",
    });
  });
};

module.exports = {
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
};
