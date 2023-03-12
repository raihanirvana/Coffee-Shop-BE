const productModel = require("../models/product.model");

const getProduct = (req, res) => {
  const { query } = req;
  productModel.getProduct(query, (err, result) => {
    if (err) {
      res.status(500).json({
        msg: "internal server error",
      });
      return;
    }
    if (!result) {
      res.status(404).json({
        msg: "History not found",
      });
      return;
    }
    if (result.rows.length === 0) {
      res.status(400).json({
        msg: "No history data found",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  });
};

const insertProduct = (req, res) => {
  const { body } = req;
  productModel.insertProduct(body, (err, result) => {
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
  productModel.updateProduct(id, body, (err, result) => {
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

module.exports = {
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
};
