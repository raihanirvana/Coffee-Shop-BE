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
  const promoId = req.params.id;
  const { promo_name, coupon_code, expired } = req.body;

  promoModel.Promo.findById(promoId, (err, promo) => {
    if (err) {
      res.status(500).json({
        msg: "internal server error",
      });
    } else {
      if (promo === null) {
        res.status(404).json({
          msg: "Users not found",
        });
      } else {
        promo.promo_name = promo_name;
        promo.coupon_code = coupon_code;
        promo.expired = expired;
        promo.save((err, updatedPromo) => {
          if (err) {
            if (err.status === 300) {
              res.status(300).json({
                msg: "Custom error message for status code 300",
              });
              return;
            } else {
              res.status(500).json({
                msg: "Internal server error",
              });
              return;
            }
          } else {
            res.status(200).json({
              msg: "Promo updated successfully",
              data: updatedPromo,
            });
          }
        });
      }
    }
  });
};

const deletePromo = (req, res) => {
  const { id } = req.params;
  promoModel.deletePromo(id, (err, result) => {
    if (err) {
      if (err.status === 300) {
        res.status(300).json({
          error: "Custom error message for status code 300",
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
