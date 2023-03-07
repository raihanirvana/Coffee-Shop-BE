const promoModel = require("../models/promo.model");

const getPromo = (req, res) => {
  promoModel.getPromo((err, result) => {
    if (err) {
      if (err.status === 300) {
        res.status(300).json({
          msg: "Custom error message for status code 300",
        });
        return;
      } else if (err.status === 400) {
        res.status(400).json({
          msg: "Custom error message for status code 400",
        });
        return;
      } else {
        res.status(500).json({
          msg: "Internal server error",
        });
        return;
      }
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
      if (err.status === 300) {
        res.status(300).json({
          msg: "Custom error message for status code 300",
        });
        return;
      } else if (err.status === 400) {
        res.status(400).json({
          msg: "Custom error message for status code 400",
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

const updatePromo = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  promoModel.updatePromo(id, body, (err, result) => {
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
      message: "promo updated successfully",
    });
  });
};

const deletePromo = (req, res) => {
  const { id } = req.params;
  promoModel.deletePromo(id, (err, result) => {
    if (err) {
      if (err.status === 400) {
        res.status(400).json({
          msg: "the server cannot or will not process the request due to something that is perceived to be a client error",
        });
        return;
      } else {
        res.status(500).json({
          error: "Internal server error",
        });
        return;
      }
    } else if (result === 0) {
      res.status(404).json({
        error: "Product not found",
      });
    } else {
      res.status(204).send();
    }
  });
};

module.exports = {
  getPromo,
  insertPromo,
  updatePromo,
  deletePromo,
};
