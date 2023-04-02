const promoModel = require("../models/promo.model");

const getPromo = (req, res) => {
  const { query } = req;
  promoModel.getPromo(query, (err, result) => {
    if (err) {
      res.status(500).json({
        msg: "Internal server error",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  });
};

const insertPromo = (req, res) => {
  const { body } = req;
  promoModel.insertPromo(body, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        msg: "Internal server error",
      });
    }
    res.status(201).json({
      data: result,
    });
  });
};

const updatePromo = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  promoModel.updatePromo(id, body, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: `Product with id ${id} not found`,
      });
    }
    res.status(200).json({
      message: "promo updated successfully",
    });
  });
};

const deletePromo = (req, res) => {
  const { id } = req.params;
  promoModel.deletePromo(id, (err, result) => {
    if (err) {
      res.status(500).json({
        error: "Internal server error",
      });
      return;
    }
    if (result === 0) {
      res.status(404).json({
        error: "Product not found",
      });
    }
    res.status(204).send();
  });
};

module.exports = {
  getPromo,
  insertPromo,
  updatePromo,
  deletePromo,
};
